import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import saryPostImage from "../../../assets/Dashboard/sary-post-image.png";

const PostGrid = ({ files, modal }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [swipe2, setSwipe2] = useState();

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
		return <OneContainer>{checkType(files)}</OneContainer>;
	}

	function renderTwo(files) {
		return <TwoContainer>{checkType(files)}</TwoContainer>;
	}

	function renderThree(files) {
		return (
			<ThreeContainer>
				{checkType([files[0]])}
				<div>{checkType(files.slice(1))}</div>
			</ThreeContainer>
		);
	}

	function renderFour(files) {
		return (
			<FourContainer>
				{checkType([files[0]])}
				<div>{checkType(files.slice(1))}</div>
			</FourContainer>
		);
	}

	function renderFive(files) {
		return (
			<FiveContainer>
				<div className="top">{checkType(files.slice(0, 2))}</div>
				<div className="down">
					{files.length === 5
						? checkType(files.slice(2))
						: checkType(files.slice(2, 4))}
					{files.length > 5 && (
						<div className="last__item" data-content={`+${files.length - 5}`}>
							{checkType([files[4]])}
						</div>
					)}
				</div>
			</FiveContainer>
		);
	}

	return (
		<React.Fragment>
			<Container
				onClick={() =>
					modal &&
					(files.length > 1 || files[0].type === "image") &&
					setIsOpen(true)
				}
			>
				{files?.length === 1 && renderOne(files)}
				{files?.length === 2 && renderTwo(files)}
				{files?.length === 3 && renderThree(files)}
				{files?.length === 4 && renderFour(files)}
				{files?.length >= 5 && renderFive(files)}
			</Container>

			{/* Modal */}
			<Transition
				appear
				show={isOpen}
				as={React.Fragment}
				style={{ zIndex: 1901 }}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsOpen(false)}
				>
					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-30" />
					</Transition.Child>

					<div id="mike" className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full  items-center justify-center">
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={
										"p-6 overflow-hidden rounded-2xl w-max h-max relative"
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
										className="max-w-2xl"
										spaceBetween={40}
									>
										{files?.map((file, i) => (
											<SwiperSlide style={{ width: "max-content" }} key={i}>
												{checkModalType(file)}
											</SwiperSlide>
										))}
									</Swiper>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</React.Fragment>
	);
};

export default PostGrid;

const Container = styled.div`
	width: 100%;
	box-sizing: border-box;

	@media screen and (min-width: 1024px) {
		/* padding: 0.5rem 0.5rem .25rem; */
		/* border-radius: 8px; */
		/* border: 1px solid lightgray; */
	}
`;

const OneContainer = styled.div`
	width: 100%;
	box-sizing: border-box;

	img,
	video {
		width: 100%;
		object-fit: contain;
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
