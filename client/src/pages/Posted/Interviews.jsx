import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import backgroundImage from "../../assets/Dashboard/dashboard-circle-background-dark.png";
import Tabs from "./components/Tabs";
import TotalSummary from "./components/TotalSummary";
import LinkButton from "./components/LinkButton";
import CardsList from "./components/CardsList";
import "./style.css";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import { fetchData } from "../../api/fetchData";
import { ModalContext } from "../../contexts/ModalContext";
import { deleteData } from "../../api/deleteData";
import { jobState } from "../../contexts/JobProvider";
const Interviews = () => {
  const { showModal } = useContext(ModalContext);
  const { updateNumbers } = jobState();
  // const { loading, setLoading } = useContext(LoaderContext);
  const [loading, setLoading] = useState(true);
  const [fixTab, setFixTab] = useState(false);
  const [postedInterviews, setPostedInterviews] = useState([]);
  const [state, setState] = useState(false);
  const [interviewApplicants, setInterviewApplicants] = useState(0);
  //get posted Interviews

  const updateInterview = (id, body) => {
    postedInterviews.map((interview) => {
      if (interview._id === id) {
        (interview.companyDescription = body.companyDescription),
          (interview.requiredSkills = body.requiredSkills);
      }
    });
  };

  const deleteInterview = async (id) => {
    await deleteData(`/interviews/${id}/deleteInterview`);
    // showModal("deleted", true);
    setPostedInterviews((prev) => prev.filter((items) => items._id !== id));
    setState((prev) => !prev);
    updateNumbers();
    return true;
  };

  return (
    <>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <Container className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-fixed bg-[#ddd] lg:bg-[rgba(0,0,0,0.45)]" />
      <div className="h-full pt-[60px] pb-[50px] sm:pb-0 relative assigne__content__container lg:flex lg:w-[95%] lg:max-w-[1500px] lg:gap-x-6 lg:px-4 lg:pt-4 lg:mx-auto">
        <div className="flex-[0.25]">
          <Tabs
            setPostedInterviews={setPostedInterviews}
            setLoading={setLoading}
            showModal={showModal}
            setInterviewApplicants={setInterviewApplicants}
          />

          <Link
            className="bg-white w-full text-primary-500 text-center pt-3 pb-3 rounded hidden items-center gap-2 justify-center m-0 mt-8 lg:flex"
            to="/assigned/projects"
          >
            Assigned Projects
            <ArrowTopRightOnSquareIcon className="h-4" />
          </Link>
          <Link
            className="bg-white w-full text-primary-500 text-center pt-3 pb-3 rounded hidden items-center gap-2 justify-center m-0 mt-2 lg:flex"
            to="/assigned/interviews"
          >
            Assigned Interviews
            <ArrowTopRightOnSquareIcon className="h-4" />
          </Link>
        </div>

        <div className="flex-[0.75]">
          <TotalSummary
            title="Interviews Summary"
            summary={{
              "No. of Interviews": "19",
              "No. of Jobs": "83",
              "No. of visitors the last 30days": "7,940",
            }}
            state={state}
            interviewApplicants={interviewApplicants}
          />
          {/* <LinkButton name="Assigned Projects" to="/assigned/projects" /> */}
          <CardsList
            page="interviews"
            loadingInterviews={loading}
            interviews={postedInterviews}
            deleteInterview={deleteInterview}
            updateInterview={updateInterview}
          />
        </div>
      </div>
    </>
  );
};

export default Interviews;

const Container = styled.div`
  z-index: -2;

  @media screen and (min-width: 1024px) {
    background-image: url(${backgroundImage});
  }
`;
