import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import MediaModal from "../MediaModal";
// import saryPostImage from "../../../assets/Dashboard/Content_img.png";
import "swiper/css";

const PostGrid = ({
	files,
	description,
	modal,
	showComment,
	post,
	setFiles=()=>{},
	commentVisible = false,
}) => {
	const [swipe, setSwipe] = useState(null);
	const [previewFiles, setPreviewFiles] = useState(false);

	// const files = [
	// 	{
	// 		url: saryPostImage,
	// 		type: 'image'
	// 	},
	// 	{
	// 		url: saryPostImage,
	// 		type: 'image'
	// 	},
	// 	{
	// 		url: saryPostImage,
	// 		type: 'image'
	// 	},
	// 	{
	// 		url: saryPostImage,
	// 		type: 'image'
	// 	},
	// ]

	const checkType = (files, className = "") => {
		return files.map((file, i) => {
			if (file.type === "image") {
				return <img src={file.url} alt="" className={className} key={i} />;
			} else {
				return (
					<video
						src={file.url}
						className={className}
						controls
						key={i}
					>
						Sorry, your browser doesn't support embedded videos.
					</video>
				);
			}
		});
	};

	// useEffect(() => {
	//   if(commentVisible){
	//     setPreviewFiles(false)
	//   }
	// })

	const checkModalType = (file) => {
		if (file.type === "image") {
			return (
				<img
					as="img"
					src={file.url}
					className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all mx-auto"
				/>
			);
		} else {
			return (
				<video
					as="vid"
					src={file.url}
					controls
					style={{ maxHeight: "70vh" }}
					className="w-max object-contain rounded transform text-left align-middle shadow-xl transition-all mx-auto"
				>
					Sorry, your browser doesn't support embedded videos.
				</video>
			);
		}
	};

	function renderOne(files) {
		return <OneContainer
			onClick={() =>{
				modal && (files.length > 1 || files[0].type === "image") && handleShowModal()
				stopScroll()
			}}
		>
			{!modal && <p onClick={() => {
				let oldFiles = [...files];
				oldFiles.splice(0, 1);
				setFiles(oldFiles);
			}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
				<XMarkIcon className="h-6" />
			</p>}
			{checkType(files)}
		</OneContainer>;
	}

	function renderTwo(files) {
		return <TwoContainer
			onClick={() =>{
				modal && (files.length > 1 || files[0].type === "image") && handleShowModal()
				stopScroll()
			}}
		>
			<div className="column">
				{!modal && <p onClick={() => {
				let oldFiles = [...files];
				oldFiles.splice(0, 1);
				setFiles(oldFiles);
			}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
					<XMarkIcon className="h-6" />
				</p>}
				{checkType([files[0]])}
			</div>
			<div className="column">
				{!modal && <p onClick={() => {
				let oldFiles = [...files];
				oldFiles.splice(1, 1);
				setFiles(oldFiles);
			}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
					<XMarkIcon className="h-6" />
				</p>}
				{checkType([files[1]])}
			</div>
		</TwoContainer>;
	}

	function renderThree(files) {
		return (
			<ThreeContainer
				onClick={() =>{
					modal && (files.length > 1 || files[0].type === "image") && handleShowModal()
					stopScroll()
				}}
			>
				<div className="first-column relative">
					{!modal && <p onClick={() => {
				let oldFiles = [...files];
				oldFiles.splice(0, 1);
				setFiles(oldFiles);
			}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
						<XMarkIcon className="h-6" />
					</p>}
					{checkType([files[0]])}
				</div>
				<div className="second-column">
					<div className="box-border h-full w-full overflow-hidden relative">
						{!modal && <p onClick={() => {
				let oldFiles = [...files];
				oldFiles.splice(1, 1);
				setFiles(oldFiles);
			}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
							<XMarkIcon className="h-6" />
						</p>}
						{checkType([files[1]])}
					</div>
					<div className="box-border h-full w-full overflow-hidden relative">
						{!modal && <p onClick={() => {
				let oldFiles = [...files];
				oldFiles.splice(2, 1);
				setFiles(oldFiles);
			}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
							<XMarkIcon className="h-6" />
						</p>}
						{checkType([files[2]])}
					</div>
				</div>
			</ThreeContainer>
		);
	}

	function renderFour(files) {
		return (
			<FourContainer>
				{checkType([files[0]])}
				<div>
					<div>
						{files?.length > 1 && (
							<>
								<div
									onClick={() => swipe.slidePrev()}
									className="hidden fixed cursor-pointer top-1/2 left-[25%] z-30 h-12 w-12 justify-center items-center lg:flex rounded-full bg-zinc-500/50 text-white active:bg-primary-500"
								>
									<ChevronLeftIcon className="w-8" />
								</div>

								<div
									onClick={() => swipe.slideNext()}
									className="hidden fixed cursor-pointer top-1/2 right-[25%] z-30 w-12 h-12 lg:flex items-center justify-center rounded-full bg-zinc-500/50 text-white active:bg-primary-500"
								>
									<ChevronRightIcon className="w-8" />
								</div>
							</>
						)}
					</div>
					<Swiper
						spaceBetween={0}
						onSwiper={(swiper) => {
							setSwipe(swiper);
						}}
						className="h-full w-full box-border"
					>
						{files?.map((file, i) => (
							<SwiperSlide
								className="h-full w-full items-center flex justify-center box-border"
								key={`${file.url}-${i}`}
							>
								{file.type === "image" ? (
									<div className="h-full w-full box-border overflow-hidden items-center flex  select-none">
										<img
											src={file.url}
											className="w-full object-contain box-border lg:max-h-full"
										/>
									</div>
								) : (
									<div className="h-full w-full box-border overflow-hidden items-center flex lg:max-h-[490px] select-none">
										<video
											src={file.url}
											className="w-full object-contain box-border lg:max-h-full"
											controls
											key={i}
										>
											Sorry, your browser doesn't support embedded videos.
										</video>
									</div>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</FourContainer>
		);
	}

	function renderSlider(files) {
		return (
			<div className="h-full w-full box-border">
				<div className="w-full box-border h-full relative">
					{/* arrows */}
					<div>
						{files?.length > 1 && (
							<>
								<div
									onClick={() => swipe.slidePrev()}
									className="hidden absolute cursor-pointer top-[45%] left-0 z-30 h-8 w-8 justify-center items-center lg:flex rounded-full text-white/80 active:bg-primary-500"
								>
									<ArrowLeftCircleIcon className="w-8" />
								</div>

								<div
									onClick={() => swipe.slideNext()}
									className="hidden absolute cursor-pointer top-[45%] right-0 z-30 w-8 h-8 lg:flex items-center justify-center rounded-full text-white/80 active:bg-primary-500"
								>
									<ArrowRightCircleIcon className="w-8" />
								</div>
							</>
						)}
					</div>

					{/* swiper */}
					<Swiper
						slidesPerView={1}
						spaceBetween={0}
						modules={[Pagination]}
						pagination={{ clickable: true }}
						onSwiper={(swiper) => {
							setSwipe(swiper);
						}}
					>
						{files?.map((file, i) => (
							<SwiperSlide
								key={`${file.url}-${i}`}
								onClick={stopScroll}
							>
								{file.type === "image" ? (
									<div className="h-full w-full box-border overflow-hidden items-center flex select-none relative" onClick={() =>
										modal &&
										(files.length > 1 || files[0].type === "image") &&
										handleShowModal()
									}>
										{!modal && <p onClick={() => {
											let oldFiles = [...files];
											oldFiles.splice(i, 1);
											setFiles(oldFiles);
										}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
											<XMarkIcon className="h-6" />
										</p>}
										<img
											src={file.url}
											className="w-full object-cover box-border h-full lg:max-h-full"
										/>
									</div>
								) : (
									<div className="h-[35vh] w-full box-border overflow-hidden items-center flex lg:h-[400px] select-none relative" onClick={() =>
										modal &&
										(files.length > 1 || files[0].type === "image") &&
										handleShowModal()
									}>
										{!modal && <p onClick={() => {
											let oldFiles = [...files];
											oldFiles.splice(i, 1);
											setFiles(oldFiles);
										}} className="absolute top-2 right-2 bg-white/80 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
											<XMarkIcon className="h-6" />
										</p>}
										<video
											src={file.url}
											className="w-full object-contain box-border lg:max-h-full"
											controls
											key={i}
										>
											Sorry, your browser doesn't support embedded videos.
										</video>
									</div>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		);
	}

	function renderFive(files) {
		return (
			<FiveContainer>
				<div className="top">
					<div className="box-border h-full w-full overflow-hidden">
						{checkType([files[0]])}
					</div>
					<div className="box-border h-full w-full overflow-hidden">
						{checkType([files[1]])}
					</div>
				</div>
				<div className="down">
					<div className="box-border h-full w-full overflow-hidden">
						{checkType([files[2]])}
					</div>
					<div className="box-border h-full w-full overflow-hidden">
						{checkType([files[3]])}
					</div>
					{files.length === 5 && (
						<div className="box-border h-full w-full overflow-hidden">
							{checkType([files[4]])}
						</div>
					)}
					{files.length > 5 && (
						<div className="last__item" data-content={`+${files.length - 5}`}>
							{checkType([files[4]])}
						</div>
					)}
				</div>
			</FiveContainer>
		);
	}

	const handleShowModal = () => {
		showComment(false);
		setPreviewFiles(true);
	};

	const stopScroll = () => {
		document.querySelector("html").classList.toggle("modal__open");
		// setTimeout(() => {
		//   document.querySelector('.fullscreen').classList.toggle('sub__modal__open');
		// }, 10)
	};

	return (
		<React.Fragment>
			<Container
			>
				{files?.length === 1 && renderOne(files)}
				{files?.length === 2 && renderTwo(files)}
				{files?.length === 3 && renderThree(files)}
				{files?.length >= 4 && renderSlider(files)}
				{/* {files?.length >= 5 && renderFive(files)} */}
			</Container>

			{/* Modal */}
			{previewFiles && (
				<MediaModal
					description={description}
					files={files}
					showComment={() => {
						setPreviewFiles(false);
						showComment(true);
					}}
					handleBack={() => {setPreviewFiles(false); stopScroll()}}
					post={post}
				/>
			)}
		</React.Fragment>
	);
};

export default PostGrid;

const Container = styled.div`
	width: 100%;
	box-sizing: border-box;

	.swiper-pagination-bullet-active {
		background-color: white; /* Change to your desired color */
	}

	@media screen and (min-width: 1024px) {
		/* padding: 0.5rem 0.5rem .25rem; */
		/* border-radius: 8px; */
		/* border: 1px solid lightgray; */
	}
`;

const OneContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	position: relative;

	img,
	video {
		width: 100%;
		object-fit: cover;
		cursor: pointer;
		/* border-radius: 8px; */

		@media screen and (max-width: 1023px) {
			border-radius: 0px;
		}
	}
`;

const TwoContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.5px;
	padding-bottom: 0.2rem;
	grid-template-rows: 35vh;

	img,
	video {
		pointer-events: none;
	}

	@media screen and (max-width: 1023px) {
		border-radius: 0px;
	}

	@media screen and (min-width: 1024px) {
		grid-template-rows: 400px;
	}

	.column {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		img,
		video {
			width: 100%;
			object-fit: cover;
			height: 100%;
			cursor: pointer;

			@media screen and (max-width: 1023px) {
				border-radius: 0px;
			}
		}
	}
`;

const ThreeContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1.5px;
	padding-bottom: 0.2rem;
	grid-template-rows: 35vh;

	img,
	video {
		pointer-events: none;
	}

	@media screen and (min-width: 1024px) {
		grid-template-rows: 400px;
	}

	> .first-column {
		width: 100%;
		height: 100%;

		@media screen and (max-width: 1023px) {
			border-radius: 0px;
		}

		> img,
		> video {
			width: 100%;
			height: 100%;
			cursor: pointer;
			object-fit: cover;

			@media screen and (max-width: 1023px) {
				border-radius: 0px;
			}
		}
	}

	> .second-column {
		width: 100%;
		display: grid;
		grid-template-columns: 1;
		grid-template-rows: 1fr 1fr;
		gap: 1.5px;
		box-sizing: border-box;
		/* overflow: hidden; */
		height: 100%;

		img,
		video {
			width: 100%;
			object-fit: cover;
			/* border-radius: 8px; */
			height: 100%;
			box-sizing: border-box;
			cursor: pointer;

			@media screen and (max-width: 1023px) {
				border-radius: 0px;
			}
		}
	}
`;

const FourContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 35vh;
	gap: 1.5px;
	padding-bottom: 0.2rem;

	img,
	video {
		pointer-events: none;
	}

	@media screen and (min-width: 1024px) {
		grid-template-rows: 400px;
	}

	> img,
	> video {
		width: 100%;
		object-fit: cover;
		/* border-radius: 8px; */
		height: 100%;
		cursor: pointer;

		@media screen and (max-width: 1023px) {
			border-radius: 0px;
		}
	}

	> div {
		width: 100%;
		display: grid;
		grid-template-rows: 1fr 1fr 1fr;
		gap: 1.5px;
		height: 100%;

		img,
		video {
			width: 100%;
			object-fit: cover;
			/* border-radius: 8px; */
			height: 100%;
			cursor: pointer;

			@media screen and (max-width: 1023px) {
				border-radius: 0px;
			}
		}
	}
`;

const FiveContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: grid;
	grid-template-rows: 20vh 15vh;
	gap: 1.5px;
	padding-bottom: 0.2rem;

	img,
	video {
		pointer-events: none;
	}

	@media screen and (min-width: 1024px) {
		grid-template-rows: 230px 170px;
	}

	div.top {
		display: grid;
		grid-template-columns: 1fr 1fr;
		/* grid-template-rows: 1fr; */
		gap: 1.5px;
		box-sizing: border-box;
		height: 100%;

		> img,
		> video {
			width: 100%;
			object-fit: cover;
			/* border-radius: 8px; */
			height: 100%;
			box-sizing: border-box;
			cursor: pointer;

			@media screen and (max-width: 1023px) {
				border-radius: 0px;
			}
		}
	}

	div.down {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		/* grid-template-rows: 1fr; */
		gap: 1.5px;
		box-sizing: border-box;
		height: 100%;

		> div > img,
		> div > video {
			width: 100%;
			object-fit: cover;
			/* border-radius: 8px; */
			height: 100%;
			box-sizing: border-box;
			cursor: pointer;

			@media screen and (max-width: 1023px) {
				border-radius: 0px;
			}
		}

		.last__item {
			height: 100%;
			width: 100%;
			/* border-radius: 8px; */
			box-sizing: border-box;
			position: relative;
			max-width: 100%;

			@media screen and (max-width: 1023px) {
				border-radius: 0px;
			}

			> img,
			> video {
				box-sizing: border-box;
				height: 100%;
				width: 100%;
				object-fit: cover;
				position: relative;
				/* border-radius: 8px; */

				@media screen and (max-width: 1023px) {
					border-radius: 0px;
				}

				@media screen and (min-width: 1024px) {
					height: 167px;
				}
			}

			&::after {
				content: attr(data-content);
				position: absolute;
				height: 100%;
				width: 100%;
				box-sizing: border-box;
				background-color: #00000093;
				inset: 0;
				/* border-radius: 8px; */
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 2rem;
				cursor: pointer;

				@media screen and (max-width: 1023px) {
					border-radius: 0px;
				}

				@media screen and (min-width: 1024px) {
					height: 170px;
				}
			}
		}
	}
`;
