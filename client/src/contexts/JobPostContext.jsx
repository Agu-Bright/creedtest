import { createContext, useState } from "react";
import { postData } from "../api/postData";
import { useContext } from "react";
import { AnnouncementContext } from "./AnnouncementContext";

export const JobPostContext = createContext();

export const JobPostProvider = ({ children }) => {
	const [dummyPost, setDummyPost] = useState(null);
	const { checkAnnouncement } = useContext(AnnouncementContext);

	const createPost = (data, type) => {
		setDummyPost({ ...data });
		postData(
			type == "interview"
				? "/interviews/createInterview"
				: "/projects/createProject",
			data
		)
			.then((res) => {
				if (res.ok) {
					setDummyPost(null);
					checkAnnouncement(type == "interview" ? "interview" : "job");
				} else {
					setDummyPost(null);
					res.json().then((data) => showModal(data.message));
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				setDummyPost(null);
				throw error;
			});
	};
	return (
		<JobPostContext.Provider
			value={{ dummyPost, createPost }}
			children={children}
		/>
	);
};
