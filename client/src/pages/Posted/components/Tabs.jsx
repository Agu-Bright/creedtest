import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Tabs.css";
import { motion } from "framer-motion";
import { fetchData } from "../../../api/fetchData";
import { JobPostContext } from "../../../contexts/JobPostContext";

const Tabs = ({
	setLoading = () => {},
	setPostedInterviews = () => {},
	showModal = () => {},
	setPostedProjects = () => {},
	setInterviewApplicants = () => {},
	setTotalProject = () => {},
	state,
}) => {
	const { dummyPost } = useContext(JobPostContext);

	const location = useLocation();
	const renderCount = useRef(0);
	const AnimatedNavlink = motion(NavLink);
	const [projectLength, setProjectLength] = useState(0);
	const [interviewLength, setInterviewLength] = useState(0);
	const isActive = (path) => {
		return location.pathname.includes(path);
	};

	useEffect(() => {
		renderCount.current += 1;
	}, [location]);

	const fetchPosts = () => {
		(async () => {
			try {
				const response = await fetchData("/projects/get-posted-projects");
				setPostedProjects(response?.projects.reverse());
				setProjectLength(response?.projects?.length);
				setTotalProject(response?.totalProject);

				// interview
				const res = await fetchData("/interviews/get-posted-interviews");
				setPostedInterviews(res?.interviews.reverse());
				setInterviewLength(res?.interviews?.length);
				setInterviewApplicants(res?.NoOfApplicants);
				setLoading(false);
			} catch (error) {
				showModal(`${error}`, false);
				setLoading(false);
			}
		})();
	};

	useEffect(() => {
		fetchPosts();
	}, [state, dummyPost]);

	return (
		<div
			style={{ margin: 0 }}
			className="bg-[#FFFEDD] flex item-center space-x-4 p-2 lg:flex-col lg:space-x-0 lg:bg-[#5A5A5A] lg:py-8 lg:rounded-tr-2xl lg:rounded-br-2xl lg:pl-0"
		>
			<AnimatedNavlink
				key={"/posted/projects"}
				animate={
					window.innerWidth <= 1023
						? isActive("/posted/projects")
							? { x: renderCount.current < 1 ? ["100%", "0%"] : 0 }
							: { x: renderCount.current < 1 ? ["0%", "110%"] : "110%" }
						: {}
				}
				transition={{
					type: "just",
					duration: renderCount.current < 1 ? 0.6 : 0,
				}}
				to={"/posted/projects"}
				className={({ isActive }) =>
					isActive
						? `text-sm flex items-center bg-[#A89870] text-white p-2 pr-4 lg:pr-3 space-x-12 rounded-md relative flex-1 justify-between before:content-[''] before:w-2 before:h-[40%] before:bg-[#DAA520] before:absolute lg:bg-[#807149] lg:rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl h-[55px] box-border ${
								renderCount.current < 1 && "active-tab-navlink"
						  }`
						: "p-1 bg-[#455A64] text-white rounded-md flex items-center space-x-12 text-sm font-semibold pl-4 pr-1 flex-1 justify-between lg:bg-transparent h-[55px] box-border"
				}
			>
				{({ isActive }) => (
					<>
						<span
							className={
								isActive
									? "w-[30px] pl-4 font-semibold lg:text-lg"
									: "w-[30px] pl-0"
							}
						>
							Projects
						</span>
						<span
							className={
								!isActive
									? "text-[#D2ECBE] text-lg font-black flex-1 font-interbold text-right pr-3"
									: "rounded-full min-h-[32px] min-w-[32px] border-white border-[1px] border-solid font-black text-[16px] text-right justify-center items-center flex px-2 box-border"
							}
						>
							{projectLength}
						</span>
					</>
				)}
			</AnimatedNavlink>
			<AnimatedNavlink
				key={"/posted/interviews"}
				animate={
					window.innerWidth <= 1023
						? isActive("/posted/interviews")
							? { x: renderCount.current < 1 ? ["0%", "-107%"] : "-107%" }
							: { x: ["-100%", "0%"] }
						: {}
				}
				transition={{
					type: "just",
					duration: renderCount.current < 1 ? 0.6 : 0,
				}}
				to={"/posted/interviews"}
				className={({ isActive }) =>
					isActive
						? `text-sm flex items-center bg-[#A89870] text-white p-2 pr-4 lg:pr-3 space-x-12 rounded-md relative flex-1 justify-between before:content-[''] before:w-2 before:h-[40%] before:bg-[#DAA520] before:absolute lg:bg-[#807149] lg:rounded-none lg:rounded-tr-2xl lg:rounded-br-2xl h-[55px] box-border ${
								renderCount.current < 1 && "active-tab-navlink"
						  }`
						: "p-1 bg-[#455A64] text-white rounded-md flex items-center space-x-12 text-sm font-semibold pl-4 pr-1 flex-1 justify-between lg:bg-transparent h-[55px] box-border"
				}
			>
				{/* <span className='w-[30px]'>Interviews</span> */}
				{({ isActive }) => (
					<>
						<span
							className={
								isActive
									? "w-[30px] pl-4 font-semibold lg:text-lg"
									: "w-[30px] pl-0"
							}
						>
							Interviews
						</span>
						<span
							className={
								!isActive
									? "text-[#D2ECBE] text-lg font-black flex-1 font-interbold text-right pr-3"
									: "rounded-full min-h-[32px] min-w-[32px] border-white border-[1px] border-solid font-black text-[16px] text-right justify-center items-center flex px-2 box-border"
							}
						>
							{interviewLength}
						</span>
					</>
				)}
			</AnimatedNavlink>
		</div>
	);
};

export default Tabs;
