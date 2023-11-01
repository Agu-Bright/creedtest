import React, { useState, useEffect, useRef, useContext } from "react";
import "./ProjectDetails.css";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import LocationIcon from "../../../assets/Dashboard/location.svg";
import MessageIcon from "@mui/icons-material/Message";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import projectImage from "../../../assets/Dashboard/project-detail-image.png";
import { AnimatePresence, motion } from "framer-motion";
import { ReactPhotoCollage } from "react-photo-collage";
import { AdminNavContext } from "../../../provider/AdminNav";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchData } from "../../../api/fetchData";
import { UserDataContext } from "../../../contexts/UserDataContext";

const ProjectDetails = ({
	setFixTab,
	id,
	expirationDate,
	description,
	skills,
	budget,
	photos,
	createdBy,
	assigned,
}) => {
	const { state, dispatch } = useContext(AdminNavContext);
	const navigate = useNavigate();
	const [showReportProject, setShowReportProject] = useState(false);
	const numberOfPhotos =
		window.innerWidth < 375
			? [2]
			: window.innerWidth < 580
			? [2, 2]
			: window.innerWidth < 768
			? [3, 2]
			: [3];

	useEffect(() => {
		if (showReportProject) {
			document.querySelector("html").classList.add("modal__open");
		} else {
			document.querySelector("html").classList.remove("modal__open");
		}
	}, [showReportProject]);
	function convertToHumanReadableDate(dateString) {
		const date = new Date(dateString);
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZone: "UTC",
		};
		return date.toLocaleString("en-US", options);
	}
	const [remainingTime, setRemainingTime] = useState("");
	const [days, setDays] = useState("");
	useEffect(() => {
		const intervalId = setInterval(() => {
			const currentTime = dayjs();
			const diff = dayjs(expirationDate).diff(currentTime);

			if (diff <= 0) {
				clearInterval(intervalId);
				setRemainingTime("Expired");
				//delete Interview
				deleteData(`/projects/${id}/deleteInterview`);
				setDays(null);
			} else {
				const duration = dayjs.duration(diff);
				const days = duration.days();
				const hours = duration.hours();
				const minutes = duration.minutes();
				const seconds = duration.seconds();
				setDays(days);
				setRemainingTime(
					` ${hours} hours, ${minutes} minutes, ${seconds} seconds`
				);
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [expirationDate]);
	const handleReportProject = (e) => {
		e.preventDefault();
		setShowReportProject(false);
	};

	const handleDrag = (e, info) => {
		if (info.offset.y > 100) {
			setShowReportProject(false);
			setFixTab(false);
		}
	};

	const localPhotos = photos.map((photo) => ({ source: photo.url }));
	const setting = {
		width: "100%",
		height: ["250px", "170px"],
		layout: numberOfPhotos,
		photos:localPhotos,
		showNumOfRemainingPhotos: true,
	};

	const stopScroll = (e) => {
		document.querySelector("html").classList.toggle("modal__open");
	};

	useEffect(() => {
		console.log(localPhotos);
		dispatch({
			type: "HIDE_ALL",
		});

		return () => {
			dispatch({
				type: "SHOW_ALL",
			});
		};
	}, []);

	dayjs.extend(relativeTime);
	const { userData } = useContext(UserDataContext);
	const [userId, setUserId] = useState(null);
	useEffect(() => {
		setUserId(JSON.parse(userData).user._id);
	}, [userData]);

	const handleNavigate = (assigned) => {
		if (!assigned) {
			navigate("/bid/" + id);
		} else {
			return;
		}
	};
	return (
		<div className="project__details">
			{/* Report project component */}
			<AnimatePresence>
				{showReportProject ? (
					<motion.div className="report__project">
						<div
							className="dismiss__overlay"
							onClick={() => setShowReportProject(false)}
						></div>
						<motion.div
							className="report__container"
							initial={{ y: "100%" }}
							animate={{ y: "0%" }}
							exit={{ y: "100%" }}
							transition={{ type: "none" }}
							drag="y"
							dragConstraints={{ top: 0, bottom: 100 }}
							dragElastic={{
								// top: 0,
								bottom: 0.5,
							}}
							dragSnapToOrigin
							onDragEnd={handleDrag}
						>
							<div className="drag__handle"></div>
							<form className="content" onSubmit={handleReportProject}>
								<h3>Report Project</h3>
								<h3>What’s going on?</h3>

								{/* reasons */}
								<label>
									<input type="radio" name="reason" id="" />
									<p>Contains contact information</p>
								</label>
								<label>
									<input type="radio" name="reason" id="" />
									<p>Advertising another website</p>
								</label>
								<label>
									<input type="radio" name="reason" id="" />
									<p>Fake project posted</p>
								</label>
								<label>
									<input type="radio" name="reason" id="" />
									<p>Obscenities or harassing behavior</p>
								</label>

								<div className="buttons">
									<button onClick={() => setShowReportProject(false)}>
										Cancel
									</button>
									<button type="submit">Submit</button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>

			{/* Project info */}
			<div className="project__info">
				<div className="top">
					<h2>Project Details</h2>
					<div className="right">
						<h3>{budget}</h3>
						<p className="capitalize" style={{ display: "block" }}>
							<div className="flex gap-1">
								<WatchLaterIcon fontSize="24px" />
								Bidding ends in {days} days, {remainingTime},
							</div>
							deadline:
							{convertToHumanReadableDate(expirationDate)}
						</p>
						<p>
							Project ID: {id}
							<Link
								onClick={(e) => {
									e.preventDefault();
									setFixTab(true);
									setShowReportProject(true);
								}}
							>
								Report project
							</Link>
						</p>
					</div>
				</div>
				<div className="details">
					<h4>Description</h4>
					<p
						className="description"
						dangerouslySetInnerHTML={{ __html: description }}
					></p>
					<div className="skill__set">
						<h5>Skills Required</h5>
						<p>
							{skills.map((skill) => (
								<span>{skill}</span>
							))}
						</p>
					</div>
					{photos.length > 0 && (
						<div className="project__gallery" onClick={stopScroll}>
							<ReactPhotoCollage {...setting}/>
						</div>
					)}
					{createdBy != userId ? (
						<button
							style={{ background: assigned ? "rgb(164, 163, 159)" : "" }}
							onClick={() => handleNavigate(assigned)}
						>
							{assigned ? "Application Closed" : "Apply"}
						</button>
					) : (
						<button
							style={{ background: assigned ? "rgb(164, 163, 159)" : "" }}
							onClick={() =>
								navigate(
									assigned
										? "/assigned/projects"
										: `/dashboard/browse/projects/${id}/proposals`
								)
							}
						>
							{assigned ? "Project Assigned" : "View Applicants"}
						</button>
					)}
				</div>
			</div>

			{/* Client Info */}
			<div className="client__info">
				<h2>About the client</h2>
				<p>
					<img src={LocationIcon} alt="" />
					River
				</p>
				<div className="rating__box">
					<div className="rating">
						<StarIcon />
						<StarIcon />
						<StarIcon />
						<StarIcon />
						<StarIcon />
						<p>0.0</p>
					</div>
					<p className="review">
						<MessageIcon />
						0.0
					</p>
				</div>
				<p>
					<WatchLaterIcon />
					Member since Mar 3, 2022
				</p>

				{/* client verifications */}
				<h3>Client Verification</h3>
				<p>
					<MailIcon />
					Email verified
				</p>
				<p>
					<AccountCircleIcon />
					Profile completed
				</p>
				<p>
					<PhoneIcon />
					Phone verified
				</p>
			</div>

			{/* apply footer */}
			<ApplyFooter className="bg-white fixed -bottom-2 px-6 w-screen h-[60px] flex items-center justify-center z-50">
				{createdBy != userId ? (
					<>
						{assigned ? (
							<div
								style={{
									marginBottom: 0,
									backgroundColor: "rgb(164, 163, 159)",
								}}
								className="h-[60%] text-sm rounded-full text-white w-[95%] text-center flex items-center justify-center"
							>
								Application closed
							</div>
						) : (
							<Link
								style={{ marginBottom: 0 }}
								to={"/bid/" + id}
								className="bg-primary-500 h-[60%] text-sm rounded-full text-white w-[95%] text-center flex items-center justify-center"
							>
								Apply
							</Link>
						)}
					</>
				) : (
					<>
						{assigned ? (
							<Link
								to={`/assigned/projects`}
								style={{
									marginBottom: 0,
									backgroundColor: "rgb(164, 163, 159)",
								}}
								className="h-[60%] text-sm rounded-full text-white w-[95%] text-center flex items-center justify-center"
							>
								Project Assigned
							</Link>
						) : (
							<Link
								style={{ marginBottom: 0 }}
								to={`/dashboard/browse/projects/${id}/proposals`}
								className="bg-primary-500 h-[60%] text-sm rounded-full text-white w-[95%] text-center flex items-center justify-center"
							>
								View Applicants
							</Link>
						)}
					</>
				)}
			</ApplyFooter>
		</div>
	);
};

export default ProjectDetails;

const ApplyFooter = styled.div`
	@media (min-width: 1024px) {
		display: none;
	}
`;
