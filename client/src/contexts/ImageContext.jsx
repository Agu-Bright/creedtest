import { createContext, useState } from "react";
import { img3, img6 } from "../assets/mike";

export const ImageContext = createContext();

export const ImageContextProvider = ({ children }) => {
	const [images, setImages] = useState([
		{ src: img6, zoom: 1, crop: { x: 0, y: 0 }, aspect: 1 },
		{ src: img3, zoom: 1, crop: { x: 0, y: 0 }, aspect: 1 },
	]);
	const [croppedImages, setCroppedImages] = useState([]);

	const [isOpen, setIsOpen] = useState(false);
	const [cropDone, setCropDone] = useState(false);

	const showCropper = (myImages) => {
		setIsOpen(true);
		setCropDone(false);
		setImages([]);
		setCroppedImages([]);
		// console.log(myImages)
		const localImages = [];
		for (let i = 0; i < myImages.length; i++) {
			localImages.push({
				src: URL.createObjectURL(myImages[i]),
				zoom: 1,
				crop: { x: 0, y: 0 },
				aspect: 1,
			});
		}
		setImages([...localImages]);
	};

	return (
		<ImageContext.Provider
			value={{
				images,
				setImages,
				croppedImages,
				setCroppedImages,
				isOpen,
				setIsOpen,
				showCropper,
				cropDone,
				setCropDone,
			}}
			children={children}
		/>
	);
};
