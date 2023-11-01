import { useEffect, useState } from "react";
import "./Interviews.css";
import ResultBar from "../../components/dashboard/ResultBar";
import MobileFilterBar from "../../components/dashboard/MobileFilterBar";
import interviewImage from "../../assets/Dashboard/interview.png";
import activeHiringIcon from "../../assets/Dashboard/active-hiring.png";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { Pagination } from "@mui/material";
import { fetchData } from "../../api/fetchData";
import JobBoardJob from "./components/JobBoardJob";
import Loader from "../../components/MikesComponents/Loader";

const InterviewCard = ({ name, title, location, interview, showAuthModal }) => {
	return (
		<div className="px-6 py-8 block flex-col bg-white p-10">
			<div className="flex gap-4">
				<div>
					<img
						src={interviewImage}
						className="aspect-square object-cover h-14 w-14 rounded-full"
						alt=""
					/>
				</div>
				<div className="">
					<h2 className="capitalize text-xl">{title}</h2>
					<h3>{interview?.jobOccupation}</h3>
					<div className="flex flex-wrap gap-x-2  text-zinc-500 font-medium">
						<p className="text-xs">{location},</p>
						<p className="text-xs">2 hours ago, </p>
						<p className="text-xs">
							{interview?.Applications?.length} Applicants
						</p>
					</div>
					{/* <div className="status">
				<img src={activeHiringIcon} alt="" />
				<p>Actively hiring workers</p>
			</div> */}
				</div>
			</div>
			<div className="py-4">
				<h4 className="text-sm font-medium text-zinc-600">Pay:</h4>
				<p className="flex flex-wrap gap-4">{interview?.budget}</p>
			</div>
			<div className="pb-4">
				<h4 className="text-sm font-medium text-zinc-600">Requirements:</h4>
				<ul className=" flex flex-wrap gap-4">
					{interview?.jobRequirements?.map((req) => (
						<li>~ {req}</li>
					))}
				</ul>
			</div>
			<button
				onClick={showAuthModal}
				className="bg-primary-500 py-2 px-10 text-white rounded w-full"
			>
				Apply Now
			</button>
		</div>
	);
};

const InterviewGroup = ({
	title,
	description,
	data,
	showAuthModal,
	loading,
}) => {
	return (
		<>
			<div id="mike" className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
				{data?.map((interview) => (
					<InterviewCard
						key={interview._id}
						id={interview._id}
						title={interview.title}
						location={interview.location}
						interview={interview}
						showAuthModal={showAuthModal}
					/>
				))}
			</div>
			<Loader loading={loading} />
		</>
	);
};

const Interviews = ({ showFilter, showAuthModal, searchValue, filter, location }) => {
	const [interviews, setInterviews] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isAtBottom, setIsAtBottom] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.body;
			const bottomThreshold = scrollHeight - clientHeight - 1;
			setIsAtBottom(scrollTop >= bottomThreshold - 10);
		};
		const handleScrollMobile = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			const bottomThreshold = scrollHeight - clientHeight - 1;
			setIsAtBottom(scrollTop >= bottomThreshold - 10);
		};

		document.body.addEventListener("scroll", handleScroll);
		window.addEventListener("scroll", handleScrollMobile);

		return () => {
			document.body.removeEventListener("scroll", handleScroll);
			window.removeEventListener("scroll", handleScrollMobile);
		};
	}, []);

	useEffect(() => {
		if (isAtBottom) {
			setLoading(true);
			fetchData(
				`/interviews/getInterviews/?page=${page + 1}${filter}${
					searchValue ? "&search=" + searchValue : ""
				}${location ? "&location=" + `${location.lga}, ${location.state}` : ""}`
			).then((data) => {
				setPage(page + 1);
				setInterviews([...interviews, ...data.interviews.reverse()]);
				setLoading(false);
			});
		}
	}, [isAtBottom]);
	useEffect(() => {
		setPage(1);
		setLoading(true);
		fetchData(
			`/interviews/getInterviews/?page=${page}${filter}${
				searchValue ? "&search=" + searchValue : ""
			}${location ? "&location=" + `${location.lga}, ${location.state}` : ""}`
		).then((data) => {
			setLoading(false);
			setInterviews(data.interviews.reverse());
		});
	}, [searchValue, filter, location]);
	return (
		<div className="browse__interviews">
			<div className="browse__interviews__container">
				{/* Mobile filter bar */}
				<MobileFilterBar showFilter={showFilter} />

				{/* Result bar */}
				<ResultBar />

				{/* projects list */}
				<div className="interview__list__container">
					<InterviewGroup
						showAuthModal={showAuthModal}
						loading={loading}
						// title="Recommended for you"
						// description="Based on your profile and search history"
						data={interviews}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						{/* <Pagination count={10} /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Interviews;
