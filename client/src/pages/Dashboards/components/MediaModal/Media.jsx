import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import saryPostImage from "../../../../assets/Dashboard/Content_img.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Media = ({ files }) => {
	const [swipe, setSwipe] = useState(null);

	return (
		<div className="flex-1 w-full box-border max-h-[87vh]">
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
				slidesPerView={1}
				speed={1}
				// touchRatio={0.1}
				// resistance={false}
				// resistanceRatio={0}
				// shortSwipes={false}
			>
				{files?.map((file, i) => (
					<SwiperSlide
						className="h-full w-full items-center flex justify-center box-border"
						key={`${file.url}-${i}`}
					>
						{file.type === "image" ? (
							<div className="h-full w-full box-border overflow-hidden items-center flex lg:max-h-[490px] select-none">
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
	);
};

export default Media;
