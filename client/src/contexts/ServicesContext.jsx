import { createContext, useContext, useEffect, useState } from "react";
import { postData } from "../api/postData";
import { ImageContext } from "./ImageContext";

export const AddServicesContext = createContext();

export const AddServicesProvider = ({ children }) => {
	const { showCropper, croppedImages, cropDone } = useContext(ImageContext);

	//step1
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [location, setLocation] = useState("");
	const [photos, setPhotos] = useState([]);
	const [files, setFiles] = useState([]);
	const [uploadableFiles, setUploadableFiles] = useState([]);

	//step2
	const [description, setDescription] = useState();
	const [skills, setSkills] = useState([]);
	const [duration, setDuration] = useState();
	const [selectDuration, setSelectDuration] = useState("days");
	const [methodOfPayment, setMethodOfPayment] = useState("fixed");
	const [minimumPrice, setMinimumPrice] = useState(null);
	const [maximumPrice, setMaximumPrice] = useState(null);

	useEffect(() => {
		setUploadableFiles([]);
		const images = files;
		images.length > 0 && showCropper(images);
	}, [files]);
	useEffect(() => {
		if (cropDone) {
			setUploadableFiles([...croppedImages]);
		}
	}, [cropDone]);

	const addService = () =>
		postData("/services/create-service", {
			name,
			category: category.category,
			subcategory: category.subCategory,
			location: `${location.lga}, ${location.state}`,
			photos: uploadableFiles,
			description,
			skills,
			duration,
			selectDuration,
			methodOfPayment,
			minimumPrice,
			maximumPrice,
		});
	return (
		<AddServicesContext.Provider
			children={children}
			value={{
				name,
				setName,
				category,
				setCategory,
				location,
				setLocation,
				files,
				setFiles,
				photos,
				setPhotos,
				description,
				setDescription,
				skills,
				setSkills,
				duration,
				setDuration,
				selectDuration,
				setSelectDuration,
				methodOfPayment,
				setMethodOfPayment,
				minimumPrice,
				setMinimumPrice,
				maximumPrice,
				setMaximumPrice,
				addService,
			}}
		/>
	);
};
