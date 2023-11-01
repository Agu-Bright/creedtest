import { createContext, useContext, useEffect, useState } from "react";
import { postData } from "../api/postData";
import { jobState } from "./JobProvider";
import { ImageContext } from "./ImageContext";
import { JobPostContext } from "./JobPostContext";

export const AddJobContext = createContext();

export const AddJobProvider = ({ children }) => {
	const { showCropper, croppedImages, cropDone } = useContext(ImageContext);
	const { createPost } = useContext(JobPostContext);

	//step1
	const [occupationValue, setOccupationValue] = useState("");
	const [skillsets, setSkillsets] = useState([]);
	const [paybasis, setPaybasis] = useState("hourly");
	const [files, setFiles] = useState([]);
	const [uploadableFiles, setUploadableFiles] = useState([]);
	const [jobTitle, setJobTitle] = useState("");
	const [jobDescription, setJobDescription] = useState("");

	//step2
	const [bidding, setBidding] = useState("public");
	const [jobType, setJobType] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [jobBudget, setJobBudget] = useState("");
	const [category, setCategory] = useState("");

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
	const { updateNumbers } = jobState();

	const addJob = () => {
		const data = {
			occupation: occupationValue.occupation,
			title: jobTitle,
			description: jobDescription,
			skills: skillsets,
			payType: paybasis,
			files: uploadableFiles,
			jobType,
			jobLocation: `${jobLocation?.lga}, ${jobLocation.state}`,
			budget: jobBudget,
			bidding: bidding,
			proposals: [],
			category: category.category,
			subcategory: category.subCategory,
		};
		createPost(data, "project");
	};
	updateNumbers();

	return (
		<AddJobContext.Provider
			children={children}
			value={{
				occupationValue,
				setOccupationValue,
				skillsets,
				setSkillsets,
				paybasis,
				setPaybasis,
				files,
				setFiles,
				jobTitle,
				setJobTitle,
				jobDescription,
				setJobDescription,
				bidding,
				setBidding,
				jobType,
				setJobType,
				jobLocation,
				setJobLocation,
				jobBudget,
				setJobBudget,
				addJob,
				category,
				setCategory,
			}}
		/>
	);
};
