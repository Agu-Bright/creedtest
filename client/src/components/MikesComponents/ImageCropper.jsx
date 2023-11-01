import { Fragment, useContext, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { ImageContext } from "../../contexts/ImageContext";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import "swiper/css";

const ImageCropper = () => {
	const [swipe, setSwipe] = useState(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	const {
		images,
		setImages,
		croppedImages,
		setCroppedImages,
		isOpen,
		setIsOpen,
		setCropDone,
	} = useContext(ImageContext);

	const handleCropComplete = async (i, croppedAreaPixels) => {
		try {
			const croppedImageURL = await getCroppedImage(
				croppedAreaPixels,
				images[i].src
			);
			let localCroppedImages = croppedImages;
			localCroppedImages[i] = croppedImageURL;
			croppedImageURL && setCroppedImages([...localCroppedImages]);
			// console.log(croppedImageURL);
		} catch (error) {
			console.error("Error generating cropped image:", error);
		}
	};

	const createImage = (url) =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener("load", () => resolve(image));
			image.addEventListener("error", (error) => reject(error));
			image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
			image.src = url;
		});

	const getCroppedImage = async (croppedAreaPixels, image) => {
		const img = await createImage(image);
		const canvas = document.createElement("canvas");
		const flip = { horizontal: false, vertical: false };

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return null;
		}

		// set canvas size to match the bounding box
		canvas.width = img.width;
		canvas.height = img.height;

		// translate canvas context to a central location to allow rotating and flipping around the center
		ctx.translate(img.width / 2, img.height / 2);
		ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
		ctx.translate(-img.width / 2, -img.height / 2);
		ctx.drawImage(img, 0, 0);

		const croppedCanvas = document.createElement("canvas");

		const croppedCtx = croppedCanvas.getContext("2d");

		if (!croppedCtx) {
			return null;
		}

		// Set the size of the cropped canvas
		croppedCanvas.width = croppedAreaPixels.width;
		croppedCanvas.height = croppedAreaPixels.height;

		// Draw the cropped image onto the new canvas
		croppedCtx.drawImage(
			canvas,
			croppedAreaPixels.x,
			croppedAreaPixels.y,
			croppedAreaPixels.width,
			croppedAreaPixels.height,
			0,
			0,
			croppedAreaPixels.width,
			croppedAreaPixels.height
		);
		const croppedImageURL = croppedCanvas.toDataURL("image/jpeg");
		return croppedImageURL;
	};

	// const [blob, setBlob] = useState<string | undefined>();

	// useEffect(() => {
	// 	fetch(croppedImage)
	// 		.then((response) => response.blob())
	// 		.then((image) => image && setBlob(URL.createObjectURL(image)));
	// }, [croppedImage]);

	return (
		images.length > 0 && (
			<Transition appear show={isOpen} as={Fragment}>
				<div style={{ zIndex: 2000 }}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25 " />
					</Transition.Child>
					<div id="mike" className="fixed h-full inset-0 overflow-y-auto">
						<div className="flex h-full min-h-full items-center justify-center text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="w-full h-[100%] md:h-[70vh] max-w-2xl transform overflow-hidden md:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col relative">
									<div className="flex justify-between pb-2">
										<h1 className={"text-xl "}>Crop Images</h1>
										<button
											className="text-primary-500 sm:hidden"
											onClick={() => {
												setCropDone(true);
												setIsOpen(false);
											}}
										>
											Done
										</button>
									</div>
									<Swiper
										onSwiper={(swiper) => setSwipe(swiper)}
										className="relative h-full w-full"
										allowTouchMove={false}
									>
										{images.map(({ crop, zoom, src, aspect }, i) => (
											<SwiperSlide>
												<Cropper
													aspect={aspect}
													crop={crop}
													zoom={zoom}
													image={src}
													onCropChange={(location) => {
														let localImages = images;
														localImages[i].crop = { ...location };
														setImages([...localImages]);
													}}
													onZoomChange={(zoom) => {
														let localImages = images;
														localImages[i].zoom = zoom;
														setImages([...localImages]);
													}}
													onCropComplete={(_, croppedAreaPixels) =>
														handleCropComplete(i, croppedAreaPixels)
													}
												/>
											</SwiperSlide>
										))}
										{images.length > 1 && (
											<>
												<button
													onClick={() => {
														swipe.slidePrev();
													}}
													style={{ zIndex: 200000 }}
													className="absolute p-2 rounded-full top-[48%] left-2 bg-zinc-300/50 text-white outline-none"
												>
													<ChevronLeftIcon className="h-6" />
												</button>
												<button
													onClick={() => swipe.slideNext()}
													style={{ zIndex: 200000 }}
													className="absolute p-2 rounded-full top-[48%] right-2 bg-zinc-300/50 text-white outline-none"
												>
													<ChevronRightIcon className="h-6" />
												</button>
											</>
										)}
									</Swiper>
									<div className="h-12">
										<div className="flex gap-4 pt-2 overflow-x-auto">
											{croppedImages.length > 0 &&
												swipe &&
												croppedImages.map((image, i) => (
													<img
														src={image}
														className={`h-10 cursor-pointer shadow`}
														onClick={() => {
															swipe.slideTo(i);
														}}
														alt=""
													/>
												))}
										</div>
									</div>

									{swipe && (
										<div className="flex justify-center items-center gap-10 mt-4">
											<button
												onClick={() => {
													let localImages = images;
													localImages[swipe.activeIndex].aspect = 3 / 4;
													setImages([...localImages]);
												}}
												className={`h-10 aspect-[3/4] shadow rounded  ${
													images[swipe.activeIndex]?.aspect == 3 / 4
														? "bg-primary-500"
														: "bg-zinc-300"
												}`}
											></button>
											<button
												onClick={() => {
													let localImages = images;
													localImages[swipe.activeIndex].aspect = 1;
													setImages([...localImages]);
												}}
												className={`h-10 aspect-square shadow rounded  ${
													images[swipe.activeIndex]?.aspect == 1
														? "bg-primary-500"
														: "bg-zinc-300"
												}`}
											></button>
											<button
												onClick={() => {
													let localImages = images;
													localImages[swipe.activeIndex].aspect = 4 / 3;
													setImages([...localImages]);
												}}
												style={{ transform: "rotate(90deg)" }}
												className={`h-10 aspect-[3/4] rotate-90 shadow rounded  ${
													images[swipe.activeIndex]?.aspect == 4 / 3
														? "bg-primary-500"
														: "bg-zinc-300"
												}`}
											></button>
										</div>
									)}
									<div className="pt-4 w-full flex justify-center">
										<button
											onClick={() => {
												setCropDone(true);
												setIsOpen(false);
											}}
											className="p-2 hidden sm:block text-xl w-1/2 bg-primary-500 rounded text-white mx-auto"
										>
											Done
										</button>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Transition>
		)
	);
};

export default ImageCropper;
