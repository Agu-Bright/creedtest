import { useContext, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
	CheckIcon,
	DocumentIcon,
	PlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

import Btn from "../../../components/MikesComponents/Btn";
import { AddFormContext } from "../../../contexts/AddForm";
import BrowseSimilar from "../Components/BrowseSimilar";
import { fetchData } from "../../../api/fetchData";
import { UserDataContext } from "../../../contexts/UserDataContext";
import AdditionalFiles from "../Components/AdditionalFIles";

const WorkerProfile = ({ outwards, user, userId }) => {
	const [percentage, setPercentage] = useState(20);

	const [users, setUsers] = useState(null);
	const [skills, setSkills] = useState([]);

	const checkFunc = (vals) => {
		let localPercentage = 0;
		vals?.forEach((val, i) => {
			if (typeof val != "object" && val) {
				localPercentage += 10;
			} else if (typeof val == "object" && val?.length > 0) {
				localPercentage += 10;
			}
		});
		setPercentage(percentage + localPercentage);
	};

	useEffect(() => {
		user?.skills && setSkills(user?.skills);
		user &&
			fetchData("/users/get-users").then((data) =>
				setUsers(
					data
						.filter((item) => item?._id != user?._id)
						.filter((item) => item?._id != userId)
				)
			);
		user &&
			percentage == 20 &&
			checkFunc([
				user?.skills,
				user?.aboutMe,
				user?.availability,
				user?.coverLetter,
				user?.qualifications,
				user?.education,
				user?.experiences,
				user?.photo?.url,
			]);
	}, [user]);
	const { workerDetails, clientDetails, setCurrentForm } =
		useContext(AddFormContext);

	const CP = ({ className }) => {
		return (
			!outwards && (
				<>
					<div className={"bg-primary-100 rounded p-6 " + className}>
						<div className="flex gap-4 lg:gap-6 flex-col lg:flex-row">
							<div className="w-20">
								<div className="h-20 w-20">
									<CircularProgressbar
										value={percentage}
										text={`${percentage}%`}
										styles={buildStyles({
											pathColor: `rgb(218, 165, 32)`,
											textColor: "rgb(218 165 32)",
											trailColor: "rgba(218, 165, 32, 0.2)",
											backgroundColor: "rgb(255 241 207)",
										})}
									/>
								</div>
							</div>
							<p>
								Your Profile is {percentage}% complete.{" "}
								{percentage < 100
									? "Click on the button below to complete your profile."
									: "We will will keep you updated on more progress. Enjoy the app!"}
								{percentage < 100 && (
									<button className="w-full bg-white text-primary-500 py-2 mt-3 rounded-md border-2 border-primary-500/50">
										Complete Profile
									</button>
								)}
							</p>
						</div>
					</div>

					<ul
						className={
							"border rounded p-6 mt-10 mb-10 flex flex-col gap-1 " + className
						}
					>
						{workerDetails.map(({ title, value }) => (
							<li className="flex gap-2 justify-between items-center pt-2 pb-4 border-b capitalize">
								<div>{title}</div>
								{value ? (
									<CheckIcon className="h-5 text-green-500" />
								) : (
									<XMarkIcon className="h-5 text-red-500" />
								)}
							</li>
						))}
						{clientDetails.map(
							({ title, value }) =>
								title != "reviews" && (
									<li className="flex gap-2 justify-between items-center pt-2 pb-4 border-b capitalize">
										<div>{title}</div>
										{value ? (
											<CheckIcon className="h-5 text-green-500" />
										) : (
											<XMarkIcon className="h-5 text-red-500" />
										)}
									</li>
								)
						)}
						<li className="flex gap-2 justify-between items-center pt-2 pb-4 border-b capitalize">
							<div>profile photo</div>

							<CheckIcon className="h-5 text-green-500" />
						</li>
					</ul>
				</>
			)
		);
	};
	return (
		<>
			<div id="mike" className="lg:mt-0 lg:py-10 px-6 pb-20 lg:pb-0">
				<div className="grid lg:grid-cols-5 gap-10 lg:px-20 text-zinc-800">
					<section className="lg:col-span-3 lg:pb-10">
						<CP className={"lg:hidden"} />

						{workerDetails.map((detail) => (
							<div className=" border rounded p-6 mb-6 lg:mb-10">
								<div className="flex justify-between">
									<h2 className="text-xl font-semibold capitalize">
										{detail.title}
									</h2>
									<Btn
										className={"w-max"}
										toggle={detail.title != "reviews" ? outwards : !outwards}
										text={"Edit"}
										onClick={() => setCurrentForm(detail)}
									/>
								</div>
								<hr className="my-4" />
								<ul className="flex flex-col">
									{typeof detail.value == "string" ? (
										<li>{detail.value}</li>
									) : (
										detail?.value?.map((val) => <li>{val}</li>)
									)}
								</ul>
								{(detail?.value?.length == 0 || !detail?.value) && (
									<div className="py-10 flex flex-col items-center justify-center">
										{detail?.child}
										No {detail.title} have been added
									</div>
								)}
							</div>
						))}
						{/* documents */}
						<AdditionalFiles user={user} outwards={outwards} />
					</section>

					<section className="lg:col-span-2">
						<CP className={"hidden lg:block"} />
						<div className="border rounded p-6 mb-10">
							<h2 className="text-sm mb-4">Top Skills</h2>
							<ul className="flex flex-col gap-1 capitalize">
								{skills.map((skill) => (
									<li className="py-2">
										<h3 className="mb-2">{skill.skillName}</h3>
										<div className=" w-full grid grid-cols-5 gap-1.5">
											{[1, 2, 3, 4, 5].map((i) => (
												<div
													className={`h-2.5 rounded-sm w-full ${
														skill.rating >= i
															? "bg-primary-500"
															: "bg-yellow-200 border border-primary-500"
													}`}
												></div>
											))}
										</div>
									</li>
								))}
								{skills.length == 0 && (
									<li className="text-zinc-500 text-center pb-2 border-b">
										No skills added yet
									</li>
								)}
							</ul>
							{!outwards && (
								<button
									onClick={() =>
										setCurrentForm({
											title: "skill",
											child: null,
											value: "",
											fields: [
												{
													label: "Skill",
													placeholder: "Ex: Water Painting",
													value: "",
												},
												{
													label: "Rating (Max: 5)",
													options: [1, 2, 3, 4, 5],
													placeholder: "Ex: Water Painting",
													value: "",
												},
											],
										})
									}
									className="py-2 flex items-center justify-center text-primary-500 gap-2 mt-4 w-full"
								>
									<PlusIcon className="h-6" /> Add Skill
								</button>
							)}
						</div>
						{users && (
							<>
								<BrowseSimilar
									title={"creedlancers"}
									data={users}
									classname={"mt-10"}
								/>
								{/* <BrowseSimilar
									title={"Enterprises"}
									data={users}
									classname={"mt-10"}
								/> */}
							</>
						)}
						{/* <BrowseSimilar
							title={"Enterprises"}
							data={contacts}
							classname={"mt-10"}
						/> */}
					</section>
				</div>
			</div>
		</>
	);
};

export default WorkerProfile;
