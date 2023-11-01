import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import NoProject from "../../MyJobs/components/NoProject";

const CardsList = ({
  page,
  assignedInterviews,
  assignedProjects,
  loadingI,
  deleteProject,
  updateProject,
  deleteInterview,
  updateInterview,
}) => {
  if (loadingI) {
    return (
      <div
        id="mike"
        style={{
          width: "inherit",
          zIndex: 10000,
          overflow: "hidden",
        }}
        className="relative lg:mb-1 lg:py-2"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: "repeat", duration: 1 }}
          style={{ width: "100%" }}
          className="h-1 bg-primary-500"
        ></motion.div>
      </div>
    );
  }

  if (assignedProjects && !assignedProjects.length && !loadingI) {
    return (
      <NoProject
        content="you have no addigned Projects yet"
        action="Assign Project"
        link="/posted/projects"
        proj={true}
      />
    );
  }

  if (assignedInterviews && !assignedInterviews.length && !loadingI) {
    return (
      <NoProject
        content="you have no assigned Interviews"
        action="assign Interview"
        link="/posted/interviews"
        proj={true}
      />
    );
  }
  return (
    <div className="flex flex-col gap-2 px-2 pb-[70px] mt-0 lg:px-0 lg:gap-y-3">
      {assignedInterviews &&
        assignedInterviews.map((interview) => (
          <>
            <Card
              key={interview._id}
              page={page}
              interview={interview}
              deleteInterview={deleteInterview}
              updateInterview={updateInterview}
            />
          </>
        ))}
      {assignedProjects &&
        assignedProjects.map((project) => (
          <>
            <Card
              key={project._id}
              page={page}
              project={project}
              deleteProject={deleteProject}
              updateProject={updateProject}
            />
          </>
        ))}
    </div>
  );
};

export default CardsList;
