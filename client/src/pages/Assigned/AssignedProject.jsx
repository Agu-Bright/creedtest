import React, { useState, useEffect } from "react";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import backgroundImage from "../../assets/Dashboard/dashboard-circle-background-dark.png";
import Tabs from "./components/Tabs";
import CardsList from "./components/CardsList";
import "./style.css";
import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";
import LinkButton from "./components/LinkButton";
import { fetchData } from "../../api/fetchData";
import { deleteData } from "../../api/deleteData";
import { jobState } from "../../contexts/JobProvider";

const AssignedProject = () => {
  const [fixTab, setFixTab] = useState(false);
  const [assignedProjects, setAssignedProjects] = useState(null);
  const [loadingP, setLoadinP] = useState(false);
  const [state, setState] = useState(false);
  const { updateNumbers } = jobState();
  const fetchAssignedProjects = async () => {
    setLoadinP(true);
    const res = await fetchData("/projects/get-assigned-projects");
    setAssignedProjects(res.assignedPosts);
    setLoadinP(false);
  };
  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const deleteProject = async (id) => {
    await deleteData(`/projects/${id}/delete-project`);
    // showModal("deleted", true);
    setAssignedProjects((prev) => prev.filter((items) => items._id !== id));
    setState((prev) => !prev);
    updateNumbers();
    return true;
  };

  const updateProject = (id, body) => {
    assignedProjects.map((project) => {
      if (project._id === id) {
        (project.description = body.description),
          (project.skills = body.skills);
      }
    });
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
        <div className="flex-[0.75]">
          <div className="pb-4 px-4 lg:px-0 lg:py-3 lg:pb-7">
            <h1 className="text-lg text-[#205184] font-intermedium m-0 mt-3 sm:text-2xl sm:mt-8 lg:text-4xl lg:font-light lg:mb-2 lg:mt-1">
              Assigned Projects
              {/* <span>{'> Software Developer / Backend Developer'}</span> */}
            </h1>
            <p className="m-0 text-sm">
              See workers linked to a posted project
            </p>
          </div>
          <LinkButton name="Assigned Interviews" to="/assigned/interviews" />
          <CardsList
            page="project-details"
            assignedProjects={assignedProjects}
            loadingI={loadingP}
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        </div>
      </div>
    </>
  );
};

export default AssignedProject;

const Container = styled.div`
  z-index: -2;

  @media screen and (min-width: 1024px) {
    background-image: url(${backgroundImage});
  }
`;
