import { createContext, useState } from "react";
import { postData } from "../api/postData";

export const SocialPostContext = createContext();

export const SocialPostProvider = ({ children }) => {
	const [dummyPost, setDummyPost] = useState(null);

	const createPost = (text, selectedFiles, location) => {
		console.log(selectedFiles);

		setDummyPost({
			description: text,
			photos: selectedFiles,
			location: location?.lga ? location?.lga + ", " + location?.state : "",
			likes: [],
			dislikes: [],
			createdAt: null,
			comments: [],
		});
		postData("/social/create-a-post", {
			photos: selectedFiles,
			description: text,
			location: location?.lga ? location?.lga + ", " + location?.state : "",
		})
			.then((res) => {
				if (res.ok) {
					setDummyPost(null);
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
		<SocialPostContext.Provider
			value={{ dummyPost, createPost }}
			children={children}
		/>
	);
};
