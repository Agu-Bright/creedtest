import React, { useEffect, useState, Fragment, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
	XMarkIcon,
	Bars3Icon,
	BanknotesIcon,
	MapPinIcon,
	UserGroupIcon,
	CalendarIcon,
	StarIcon,
	ChatBubbleBottomCenterTextIcon,
	ArrowTopRightOnSquareIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import cardImage from "../../../assets/Dashboard/sary.png";
import interliningIcon from "../../../assets/Dashboard/interlining-icon.png";
import enterpriseIcon from "../../../assets/Dashboard/enterprise-icon.png";
import { img6 } from "../../../assets/mike";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import Countdown from "./countDown";
import UpdateModal from "./UpdateModal";
import { Avatar } from "@mui/material";
import { UserDataContext } from "../../../contexts/UserDataContext";
import Loader from "../../../components/MikesComponents/Loader";

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

const Card = ({
	dummy,
	page,
	project,
	interview,
	deleteInterview,
	deleteProject,
	updateInterview,
	updateProject,
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const { userData } = useContext(UserDataContext);

	const user = JSON.parse(userData).user;

	const [showMenu, setShowMenu] = useState(false);
	const [viewApplicantLink, setViewApplicantLink] = useState(
		"/dashboard/browse/proposals"
	);
	const [isOpen, setIsOpen] = useState(false);
	const [swipe2, setSwipe2] = useState();
	//modal setup
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// End

	const numImages = 7;

	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	useEffect(() => {
		const path = location.pathname;
		if (path.includes("/posted/projects")) {
			setViewApplicantLink("/dashboard/browse/proposals");
		} else {
			setViewApplicantLink("/applicants");
		}
	}, [location]);

	interview && console.log(project);

	return (
		<div
			className={`bg-[#FFF9DA] p-4 relative ${
				dummy ? "opacity-70 animate-pulse" : ""
			}`}
		>
			{dummy && (
				<div className="absolute top-0 w-full left-0">
					<Loader loading={true} />
				</div>
			)}
			{location.pathname.includes("/posted/interviews") && !dummy && (
				<div
					style={{
						border: "1px solid #daa520",
						borderTopWidth: 0,
						borderTop: "none",
					}}
					className="flex bg-white h-10 mx-auto justify-center w-fit text-primary-500 rounded-[20px] px-4 rounded-t-none -top-4 relative"
				>
					<div className="flex items-center gap-x-1 justify-center mt-1">
						<ClockIcon className="h-6 animate-pulse" />
						<Countdown expireDate={interview.date} id={interview._id} />
					</div>
				</div>
			)}
			<div className="flex justify-between items-center">
				<div className="flex space-x-2 items-center">
					{project && (
						<Avatar
							sx={{ width: 75, height: 75 }}
							src={!dummy ? project?.createdBy?.photo?.url : user?.photo?.url}
							style={{ borderRadius: "50% !important" }}
							alt="avatar"
						/>
					)}
					{interview && (
						<Avatar
							sx={{ width: 75, height: 75 }}
							src={!dummy ? interview?.createdBy?.photo?.url : user?.photo?.url}
							style={{ borderRadius: "50% !important" }}
							alt="avatar"
						/>
					)}
					<div className="flex flex-col">
						<h3 className="text-sm m-0 whitespace-nowrap text-ellipsis max-w-[90%] sm:text-base">
							{!dummy
								? `${project ? project?.createdBy.name : ""}${
										interview ? interview?.createdBy?.name : ""
								  }`
								: user?.name}
						</h3>
						<div className="flex items-end">
							<img
								src={enterpriseIcon}
								alt=""
								className="h-5 object-contain sm:h-6"
							/>
							<span className="text-xs m-0 font-intermedium">
								{!dummy
									? `${project ? project?.createdBy?.role : ""}${
											interview ? interview?.createdBy?.role : ""
									  }`
									: user?.role}
							</span>
						</div>
						{page === "projects" && (
							<p className="text-xs m-0 sm:text-sm">
								{project &&
									numberWithCommas(
										!dummy
											? project?.createdBy.followers.length
											: user?.followers?.length
									)}

								{(!dummy
									? project?.createdBy.followers.length
									: user?.followers?.length) > 1
									? " followers"
									: " follower"}
							</p>
						)}
						{page === "interviews" && (
							<p className="text-xs m-0 sm:text-sm">
								{interview &&
									numberWithCommas(
										!dummy
											? interview?.createdBy.followers.length
											: user?.followers?.length
									)}

								{(!dummy
									? interview?.createdBy.followers.length
									: user?.followers?.length) > 1
									? " followers"
									: " follower"}
							</p>
						)}
					</div>
				</div>
				<div className="relative">
					{showMenu ? (
						<XMarkIcon
							className="h-6 cursor-pointer sm:h-8"
							onClick={() => setShowMenu(false)}
						/>
					) : (
						<Bars3Icon
							className="h-6 cursor-pointer sm:h-8"
							onClick={() => setShowMenu(true)}
						/>
					)}

					{showMenu && (
						<div className="bg-white py-3 absolute right-0 w-28">
							{project && (
								<button
									onClick={() =>
										!dummy &&
										navigate(
											`/dashboard/browse/projects/${project._id}/proposals`
										)
									}
									className="bg-white border-none font-inter px-3 block py-1"
								>
									Hire Worker
								</button>
							)}
							{interview && (
								<button className="bg-white border-none font-inter px-3 block py-1">
									Hire Worker
								</button>
							)}

							<button
								onClick={() => handleOpen()}
								className="bg-white border-none font-inter px-3 block py-1"
							>
								Edit
							</button>
							{interview && (
								<>
									{/* <button
                    onClick={() => deleteInterview(interview._id)}
                    className="bg-white border-none font-inter px-3 py-1 block"
                  >
                    Delete
                  </button> */}
									<button
										className="bg-white border-none font-inter px-3 py-1 block"
										onClick={() => {
											Swal.fire({
												icon: "warning",
												title: "Delete Project",
												text: "Project will be deleted permanently",
												showConfirmButton: true,
												confirmButtonColor: "rgb(218 165 32)",
												confirmButtonText: "Delete",
												showCancelButton: true,
											}).then(async (res) => {
												if (res.isConfirmed) {
													const status = await deleteInterview(interview._id);
													status &&
														Swal.fire({
															icon: "success",
															title: "Interview Deleted",
															text: "The Interview has been deleted",
															timer: 1500,
															confirmButtonColor: "rgb(218 165 32)",
														});
												}
											});
										}}
									>
										Delete
									</button>
								</>
							)}
							{project && (
								<>
									{/* <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-white border-none font-inter px-3 py-1 block"
                  >
                    Delete
                  </button> */}
									<button
										className="bg-white border-none font-inter px-3 py-1 block"
										onClick={() => {
											Swal.fire({
												icon: "warning",
												title: "Delete Project",
												text: "Project will be deleted permanently",
												showConfirmButton: true,
												confirmButtonColor: "rgb(218 165 32)",
												confirmButtonText: "Delete",
												showCancelButton: true,
											}).then(async (res) => {
												if (res.isConfirmed) {
													const status = await deleteProject(project._id);
													status &&
														Swal.fire({
															icon: "success",
															title: "Project Deleted",
															text: "The Project has been deleted",
															timer: 1500,
															confirmButtonColor: "rgb(218 165 32)",
														});
												}
											});
										}}
									>
										Delete
									</button>
								</>
							)}
						</div>
					)}
				</div>
			</div>
			<h4 className="text-sm font-intermedium m-0 sm:text-base lg:mt-4">
				{project?.title}
				{interview?.title}
			</h4>
			<div className="flex items-center flex-wrap gap-x-3 mt-2">
				<div className="flex items-center gap-x-2">
					<BanknotesIcon className="h-5 lg:h-6" />
					{page === "projects" && (
						<span className="text-xs lg:text-sm">N {project?.budget}</span>
					)}
					{page === "interviews" && (
						<span className="text-xs lg:text-sm">N {interview?.budget}</span>
					)}
				</div>
				<div className="flex items-center gap-x-2">
					<MapPinIcon className="h-5 lg:h-6" />
					{page === "projects" && (
						<span className="text-xs lg:text-sm">{project?.jobLocation}</span>
					)}
					{page === "interviews" && (
						<span className="text-xs lg:text-sm">{interview?.location}</span>
					)}
				</div>
				<div className="flex items-center gap-x-2">
					<UserGroupIcon className="h-5 lg:h-6" />
					{project && (
						<span className="text-xs lg:text-sm">
							{" "}
							{project?.proposals?.length} Participants
						</span>
					)}
					{interview && (
						<span className="text-xs lg:text-sm">
							{" "}
							{interview?.Applications?.length} Participants
						</span>
					)}
				</div>
				<div className="flex items-center gap-x-2">
					<CalendarIcon className="h-5 lg:h-6" />
					{interview && (
						<span className="text-xs lg:text-sm">
							Deadline:{" "}
							{!dummy
								? convertToHumanReadableDate(interview?.date)
								: "Uploading..."}
						</span>
					)}
					{project && (
						<span className="text-xs lg:text-sm">
							Deadline:{" "}
							{!dummy
								? convertToHumanReadableDate(project?.expirationDate)
								: "Uploading..."}
						</span>
					)}
				</div>
			</div>
			<p className="text-[0.80rem] font-inter m-0 mt-1 line-clamp-4 block sm:text-sm lg:my-4 lg:text-base">
				{project?.description || interview?.companyDescription}
			</p>
			{page !== "interviews" && (
				<div className="flex items-center gap-x-4 my-3">
					<div className="flex items-center gap-x-1">
						<span>
							<StarIcon className="h-5" />
							<StarIcon className="h-5" />
							<StarIcon className="h-5" />
							<StarIcon className="h-5" />
							<StarIcon className="h-5" />
						</span>
						<span>0.0</span>
					</div>
					<div className="flex items-center gap-x-1">
						<ChatBubbleBottomCenterTextIcon className="h-5" />
						<span>0.0</span>
					</div>
				</div>
			)}
			{page === "interviews" && (
				<div className="my-3 mb-6 lg:mb-8">
					<div>
						<h5 className="text-sm m-0 sm:text-base">Job Responsibilities:</h5>
						<ul className="m-0 mt-2 pl-6 gap-y-1 flex flex-col">
							{interview?.jobResponsibilities.map((item) => (
								<li className="text-[0.80rem] sm:text-sm lg:text-base">
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className="mt-2 lg:mt-3">
						<h5 className="text-sm m-0 sm:text-base">Job Requirements:</h5>
						<ul className="m-0 mt-2 pl-6 gap-y-1 flex flex-col">
							{interview?.jobRequirements.map((item) => (
								<li className="text-[0.80rem] sm:text-sm lg:text-base">
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			)}

			<div className="flex gap-3 lg:mt-3 lg:gap-4">
				{page === "interviews" &&
					interview?.photos &&
					interview?.photos?.map((item, i) => (
						<div
							key={i}
							onClick={openModal}
							className="w-[32%] rounded overflow-hidden relative cursor-pointer"
						>
							<img
								src={item?.url}
								alt={item?.public_id}
								className="w-full h-full object-contain rounded"
							/>
							{numImages - 3 > 0 && i === 2 && (
								<div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center text-white font-intermedium text-2xl sm:text-4xl sm:font-inter">
									+{numImages - 3}
								</div>
							)}
						</div>
					))}
				{page === "projects" &&
					project?.photos &&
					project?.photos?.map((item, i) => (
						<div
							key={i}
							onClick={openModal}
							className="w-[32%] rounded overflow-hidden relative cursor-pointer"
						>
							<img
								src={item.url}
								alt={item?.public_id}
								className="w-full h-full object-contain rounded"
							/>
							{project?.photos?.length - 3 > 0 && i === 2 && (
								<div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center text-white font-intermedium text-2xl sm:text-4xl sm:font-inter">
									+{project?.photos?.length - 3}
								</div>
							)}
						</div>
					))}
			</div>

			<div className="flex items-center gap-x-3 mt-5 sm:gap-x-4 lg:mt-7">
				{project && !dummy && (
					<Link
						to={`/dashboard/browse/projects/${project._id}/proposals`}
						className="bg-primary-500 px-4 py-2 flex items-center gap-2 text-xs text-white rounded sm:py-3 sm:text-sm lg:text-base"
					>
						View Applicants
						<ArrowTopRightOnSquareIcon className="h-4 lg:h-5" />
					</Link>
				)}
				{interview && !dummy && (
					<Link
						to={`/applicants/${interview._id}`}
						className="bg-primary-500 px-4 py-2 flex items-center gap-2 text-xs text-white rounded sm:py-3 sm:text-sm lg:text-base"
					>
						View Applicants
						<ArrowTopRightOnSquareIcon className="h-4 lg:h-5" />
					</Link>
				)}

				{project && !dummy && (
					<Link
						to={`/dashboard/browse/projects/${project._id}`}
						className="bg-white px-4 py-2 flex items-center gap-2 text-xs text-primary-500 rounded border-[1px] border-primary-500 border-solid sm:py-3 sm:text-sm lg:text-base"
					>
						See Full Details
						<img
							src={interliningIcon}
							alt=""
							className="h-4 object-contain lg:h-5"
						/>
					</Link>
				)}
				{interview && !dummy && (
					<Link
						to={`/dashboard/browse/interviews/${interview._id}`}
						className="bg-white px-4 py-2 flex items-center gap-2 text-xs text-primary-500 rounded border-[1px] border-primary-500 border-solid sm:py-3 sm:text-sm lg:text-base"
					>
						See Full Details
						<img
							src={interliningIcon}
							alt=""
							className="h-4 object-contain lg:h-5"
						/>
					</Link>
				)}
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div id="mike" className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full  items-center justify-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={
										"bg-white p-6 overflow-hidden rounded-2xl w-max h-max relative"
									}
								>
									<div
										onClick={() => swipe2.slidePrev()}
										className="absolute cursor-pointer top-1/2 left-8 z-30 p-2 rounded-full bg-zinc-500/50 text-white"
									>
										<ChevronLeftIcon className="h-6" />
									</div>
									<div
										onClick={() => swipe2.slideNext()}
										className="absolute cursor-pointer top-1/2 right-8 z-30 p-2 rounded-full bg-zinc-500/50 text-white"
									>
										<ChevronRightIcon className="h-6" />
									</div>
									<Swiper
										onSwiper={(swiper) => setSwipe2(swiper)}
										className=" max-w-2xl"
										spaceBetween={40}
									>
										{project?.photos?.map((item) => (
											<SwiperSlide style={{ width: "max-content" }}>
												<img
													as="img"
													src={item?.url}
													style={{ maxHeight: "70vh" }}
													className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all"
												/>
											</SwiperSlide>
										))}
										{interview?.photos?.map((item) => (
											<SwiperSlide style={{ width: "max-content" }}>
												<img
													as="img"
													src={item?.url}
													style={{ maxHeight: "70vh" }}
													className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all"
												/>
											</SwiperSlide>
										))}
									</Swiper>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{open && (
				<UpdateModal
					open={open}
					handleClose={handleClose}
					handleOpen={handleOpen}
					project={project}
					interview={interview}
					updateInterview={updateInterview}
					updateProject={updateProject}
				/>
			)}
		</div>
	);
};

export default Card;
