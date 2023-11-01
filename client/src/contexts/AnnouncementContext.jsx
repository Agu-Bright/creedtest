import { createContext, useContext, useState } from "react";
import { UserDataContext } from "./UserDataContext";
import { updateData } from "../api/updateData";
import { fetchData } from "../api/fetchData";

export const AnnouncementContext = createContext();

export const AnnouncementContextProvider = ({ children }) => {
	const { userData, checkStorage } = useContext(UserDataContext);

	const [isOpen, setIsOpen] = useState(false);
	const [page, setPage] = useState("");
	const checkAnnouncement = (pg) => {
		setPage(pg);
		const user = JSON.parse(userData)?.user;
		const posted =
			pg == "interview" ? user?.postedInterview : user?.postedProject;
		if (!posted) {
			setIsOpen(true);
			updateData(
				`/users/posted${pg == "interview" ? "Interview" : "Project"}`
			).then(() => {
				fetchData(`/users/${user._id}/get-user`).then((data) => {
					if (data) {
						localStorage.setItem(
							"user",
							JSON.stringify({
								user: data,
								token: JSON.parse(userData).token,
							})
						);
					}
					checkStorage();
				});
			});
		}
	};
	return (
		<AnnouncementContext.Provider
			children={children}
			value={{ isOpen, setIsOpen, checkAnnouncement, page }}
		/>
	);
};
