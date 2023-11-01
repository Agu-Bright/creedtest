import React, { useState, useEffect } from "react";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import backgroundImage from "../../assets/Dashboard/dashboard-circle-background-dark.png";
import Tabs from "./components/Tabs";
import "./style.css";
import { Link } from "react-router-dom";
import Card from "./components/Card";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import LinkButton from "./components/LinkButton";
import { fetchData } from "../../api/fetchData";
import { deleteData } from "../../api/deleteData";
import CardsList from "./components/CardsList";
import { jobState } from "../../contexts/JobProvider";

const AssignedInterview = () => {
  const [fixTab, setFixTab] = useState(false);
  const [assignedInterviews, setAssignedInterviews] = useState();
  const [loadingI, setLoadingI] = useState(false);
  const [state, setState] = useState(false);
  const { updateNumbers } = jobState();
  const fetchAssignedInterviews = async () => {
    setLoadingI(true);
    const res = await fetchData("/interviews/get-assigned-interviews");
    setAssignedInterviews(res.myAssignedInterviews);
    setLoadingI(false);
  };

  useEffect(() => {
    fetchAssignedInterviews();
  }, []);

  const updateInterview = (id, body) => {
    assignedInterviews.map((interview) => {
      if (interview._id === id) {
        (interview.companyDescription = body.companyDescription),
          (interview.requiredSkills = body.requiredSkills);
      }
    });
  };

  const deleteInterview = async (id) => {
    await deleteData(`/interviews/${id}/deleteInterview`);
    // showModal("deleted", true);
    setAssignedInterviews((prev) => prev.filter((items) => items._id !== id));
    setState((prev) => !prev);
    updateNumbers();
    return true;
  };

  return (
    <>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <Container className="fixed inset-0 w-screen h-screen bg-cover bg-no-repeat bg-[#ddd] lg:bg-[#e5e6e7]" />
      <div className="h-full pt-[60px] pb-[50px] sm:pb-0 relative assigne__content__container lg:flex lg:w-[95%] lg:max-w-[1500px] lg:gap-x-6 lg:px-4 lg:pt-4 lg:mx-auto">
        <div className="flex-[0.25]">
          <Tabs
            active={{ title: "Projects", total: 83, to: "/posted/projects" }}
            secondary={{
              title: "Interview",
              total: 19,
              to: "/posted/interviews",
            }}
            state={state}
          />
          <Link
            className="bg-white w-full text-primary-500 text-center pt-3 pb-3 rounded hidden items-center gap-2 justify-center m-0 mt-8 lg:flex"
            to="/posted/projects"
          >
            Projects
            <ArrowTopRightOnSquareIcon className="h-4" />
          </Link>
          <Link
            className="bg-white w-full text-primary-500 text-center pt-3 pb-3 rounded hidden items-center gap-2 justify-center m-0 mt-2 lg:flex"
            to="/posted/interviews"
          >
            Interviews
            <ArrowTopRightOnSquareIcon className="h-4" />
          </Link>
        </div>
        <div className="flex-[0.75] lg:pb-12">
          <div className="pb-4 px-4 lg:px-0 lg:py-3 lg:pb-7 lg:flex lg:items-center lg:justify-between">
            <div>
              <h1 className="text-lg text-[#205184] font-intermedium m-0 mt-3 sm:text-2xl sm:mt-8 lg:text-4xl lg:font-light lg:mb-2 lg:mt-1">
                Assigned Interviews
              </h1>
              <p className="m-0 text-sm">
                See workers linked to a posted Interview
              </p>
              {/* <span className="text-[#205184] block text-sm mt-2">
                {"> Software Developer / Backend Developer"}
              </span> */}
            </div>
            {/* <div className="bg-white p-2 rounded text-primary-500 flex justify-center lg:justify-start gap-2 items-center mt-4 lg:mt-0">
              <ClockIcon className="h-10 animate-pulse" />
              <div className="flex-col text-xs">
                <div className="font-semibold lg:text-sm">7 Days,</div>
                <div className='lg:text-sm'>3 Hours, 5 Minutes left </div>
              </div>
            </div> */}
          </div>
          <LinkButton name="Assigned Interviews" to="/assigned/interviews" />
          <CardsList
            page="interview-details"
            assignedInterviews={assignedInterviews}
            loadingI={loadingI}
            deleteInterview={deleteInterview}
            updateInterview={updateInterview}
          />
        </div>
      </div>
    </>
  );
};

export default AssignedInterview;

const Container = styled.div`
  z-index: -2;

  @media screen and (min-width: 1024px) {
    background-image: url(${backgroundImage});
  }
`;
