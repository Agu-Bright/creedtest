import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchData } from "../api/fetchData";
import NoReviews from "../components/MikesComponents/NoReviews";
import { UserDataContext } from "./UserDataContext";

export const AddFormContext = createContext();

export const AddFormContextProvider = ({ children }) => {
	const [currentForm, setCurrentForm] = useState();
	const { userData } = useContext(UserDataContext);

	const [user, setUser] = useState(null);
	const [id, setId] = useState(null);

	useEffect(() => {
		console.log(id);
		if (id) {
			fetchData(`/users/${id}/get-user-username`).then((data) => setUser(data));
		} else {
			setUser(JSON.parse(userData)?.user);
		}
	}, [userData, id]);

	const clientDetails = [
		{
			title: "reviews",
			child: <NoReviews />,
			value: user?.reviews,
			fields: [{ label: "Review", placeholder: "Write review" }],
		},
		{
			title: "experience",
			child: null,
			time: true,
			value: user?.experiences,
			fields: [{ label: "Name of Company", placeholder: "Eg. Microsoft" }],
		},
		{
			title: "education",
			child: null,
			time: true,
			value: user?.education,
			fields: [
				{
					label: "Name of Institution",
					placeholder: "Eg. Federal University of Technology Owerri",
				},
			],
		},
		{
			title: "qualification",
			child: null,
			value: user?.qualifications,
			fields: [
				{ label: "Qualification", placeholder: "Qualification", value: "" },
			],
		},
	];
	const workerDetails = [
		{
			title: "about me",
			child: null,
			value: [user?.aboutMe, user?.description],
			fields: [{ label: "Describe yourself in 6 words", placeholder: "Eg. I'm an exceptional writer" }],
		},
		{
			title: "employment availability",
			child: null,
			value: user?.availability,
			fields: [
				{
					label: "Availability",
					options: ["Just Browsing", "Available for Employment"],
				},
			],
		},
		{
			title: "cover letter",
			child: null,
			value: user?.coverLetter,
			fields: [{ label: "Cover Letter", placeholder: "Write cover letter" }],
		},
		// {
		// 	title: "projects & portfolio",
		// 	child: null,
		// 	value: user?.portfolio,
		// 	fields: [{ label: "Portfolio", placeholder: "Title" }],
		// },
	];
	return (
		<AddFormContext.Provider
			value={{
				currentForm,
				setCurrentForm,
				clientDetails,
				setId,
				workerDetails,
			}}
			children={children}
		/>
	);
};
