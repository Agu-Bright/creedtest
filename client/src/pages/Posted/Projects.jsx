import React, { useState, useEffect, useContext } from "react";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import backgroundImage from "../../assets/Dashboard/dashboard-circle-background-dark.png";
import Tabs from "./components/Tabs";
import TotalSummary from "./components/TotalSummary";
import LinkButton from "./components/LinkButton";
import CardsList from "./components/CardsList";
import "./style.css";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/fetchData";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import { ModalContext } from "../../contexts/ModalContext";
import { deleteData } from "../../api/deleteData";
import { jobState } from "../../contexts/JobProvider";
import "./project.css";
const Projects = () => {
  const { showModal } = useContext(ModalContext);
  const [fixTab, setFixTab] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postedProjects, setPostedProjects] = useState([]);
  const [state, setState] = useState(false);
  const [totalProject, setTotalProject] = useState(0);
  const { updateNumbers } = jobState();
  const deleteProject = async (id) => {
    await deleteData(`/projects/${id}/delete-project`);
    // showModal("deleted", true);
    setPostedProjects((prev) => prev.filter((items) => items._id !== id));
    setState((prev) => !prev);
    updateNumbers();
    return true;
  };

  const updateProject = (id, body) => {
    postedProjects.map((project) => {
      if (project._id === id) {
        (project.description = body.description),
          (project.skills = body.skills);
      }
    });
  };

  return (
    <>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <Container className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-fixed bg-[#ddd] lg:bg-[rgba(0,0,0,0.45)]" />
      <div className="h-full pt-[60px] pb-[50px] sm:pb-0 relative assigne__content__container lg:flex lg:w-[95%] lg:max-w-[1500px] lg:gap-x-6 lg:px-4 lg:pt-4 lg:mx-auto">
        <div className="flex-[0.25]">
          <Tabs
            setPostedProjects={setPostedProjects}
            setLoading={setLoading}
            showModal={showModal}
            setTotalProject={setTotalProject}
            state={state}
          />
          <Link
            className="bg-white w-full text-primary-500 text-center pt-3 pb-3 rounded hidden items-center gap-2 justify-center m-0 mt-8 lg:flex proj-display"
            to="/assigned/projects"
          >
            Assigned Projects
            <ArrowTopRightOnSquareIcon className="h-4" />
          </Link>
          <Link
            className="bg-white w-full text-primary-500 text-center pt-3 pb-3 rounded hidden items-center gap-2 justify-center m-0 mt-2 lg:flex proj-display"
            to="/assigned/interviews"
          >
            Assigned Interviews
            <ArrowTopRightOnSquareIcon className="h-4" />
          </Link>
        </div>
        <div className="flex-[0.75]">
          <TotalSummary
            title="Projects Summary"
            summary={{
              "No. of Interviews": "19",
              "No. of Jobs": "83",
              "No. of visitors the last 30days": "7,940",
            }}
            totalProject={totalProject}
            state={state}
          />
          {/* <LinkButton name="Assigned Interviews" to="/assigned/interviews" /> */}
          <CardsList
            projects={postedProjects}
            loading={loading}
            page="projects"
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;

const Container = styled.div`
  z-index: -2;

  @media screen and (min-width: 1024px) {
    background-image: url(${backgroundImage});
  }
`;
