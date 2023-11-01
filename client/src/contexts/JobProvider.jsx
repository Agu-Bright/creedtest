import React, { useState, useEffect, useContext, createContext } from "react";
import { fetchData } from "../api/fetchData";
import { chatState } from "./ChatProvider";
const JobContext = createContext();

const JobProvider = ({ children }) => {
  const { socket } = chatState();
  const [projects, setProjects] = useState();
  const [interviews, setInterviews] = useState();
  const [totalProject, setTotalProject] = useState(0);
  const [totalInterview, setTotalInterview] = useState(0);
  const [assignedProjects, setAssignedProjects] = useState();
  const [assignedInterviews, setAssignedInterviews] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    socket &&
      socket.on("project length", ({ projectLength }) => {
        setTotalProject(projectLength);
      });
    socket &&
      socket.on("award project length", ({ length }) => {
        setAssignedProjects(length);
      });
    socket &&
      socket.on("interview Length", ({ interviewLength }) => {
        setTotalInterview(interviewLength);
      });
    socket &&
      socket.on("assignedInterview Length", ({ assignedInterviewLength }) => {
        setTotalInterview(assignedInterviewLength);
      });
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData("/projects/get-posted-projects");
        setProjects(response?.projects.reverse());
        setTotalProject(response?.totalProject);
        const res = await fetchData("/interviews/get-posted-interviews");
        setInterviews(res?.interviews.reverse());
        setTotalInterview(res?.interviews?.length);
        const Res = await fetchData("/projects/get-assigned-projects");
        setAssignedProjects(Res.assignedPosts.length);
        const res1 = await fetchData("/interviews/get-assigned-interviews");
        setAssignedInterviews(res1.myAssignedInterviews.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const updateNumbers = () => {
    setUpdate((prev) => !prev);
  };

  return (
    <JobContext.Provider
      value={{
        projects,
        setProjects,
        interviews,
        setInterviews,
        totalProject,
        totalInterview,
        assignedProjects,
        setAssignedProjects,
        setTotalInterview,
        assignedInterviews,
        setAssignedInterviews,
        updateNumbers,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const jobState = () => {
  return useContext(JobContext);
};

export default JobProvider;
