import React, { useContext, useState } from "react";
import Card from "./Card";
import NoProject from "../../MyJobs/components/NoProject";
import { motion } from "framer-motion";
import { JobPostContext } from "../../../contexts/JobPostContext";

const CardsList = ({
	page,
	projects,
	loading,
	loadingInterviews,
	interviews,
	deleteInterview,
	deleteProject,
	updateInterview,
	updateProject,
}) => {
	const { dummyPost } = useContext(JobPostContext);

	if (loading || loadingInterviews) {
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
				{dummyPost && (
					<Card
						page={page}
						project={page === "projects" && dummyPost}
						interview={page === "interviews" && dummyPost}
						dummy={true}
					/>
				)}
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

	if (projects && !projects.length && !loading) {
		{
			dummyPost && (
				<Card
					page={page}
					project={projects && dummyPost}
					interview={interviews && dummyPost}
					dummy={true}
				/>
			);
		}
		return dummyPost ? (
			<Card
				page={page}
				project={projects && dummyPost}
				interview={interviews && dummyPost}
				dummy={true}
			/>
		) : (
			<NoProject
				content="you have no Posted Project"
				action="Post Project"
				link="/Postjob_creedlancers"
				proj={true}
			/>
		);
	}
	if (interviews && !interviews.length && !loading) {
		return (
			<NoProject
				content="you have no Posted Interviews"
				action="Post Interview"
				link="/create/interview/details"
				proj={true}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-2 pt-2 px-2 pb-[70px] mt-0 lg:pt-0 lg:px-0 lg:gap-y-3">
			{dummyPost && (
				<Card
					page={page}
					project={projects && dummyPost}
					interview={interviews && dummyPost}
					dummy={true}
				/>
			)}
			{projects &&
				projects.map((project) => (
					<Card
						key={project._id}
						page={page}
						project={project}
						deleteProject={deleteProject}
						updateProject={updateProject}
					/>
				))}

			{interviews &&
				interviews.map((interview) => (
					<Card
						key={interview._id}
						page={page}
						interview={interview}
						deleteInterview={deleteInterview}
						updateInterview={updateInterview}
					/>
				))}
			{/* <Card page={page} />
      <Card page={page} />
      <Card page={page} /> */}
		</div>
	);
};

export default CardsList;
