import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress, Rating } from "@mui/material";
import {
	CheckIcon,
	DocumentIcon,
	PlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import {
	UserIcon as UIcon,
	CreditCardIcon,
	PhoneIcon,
	EnvelopeIcon,
	ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

import Btn from "../../../components/MikesComponents/Btn";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import { AddFormContext } from "../../../contexts/AddForm";
import BrowseSimilar from "../Components/BrowseSimilar";
import { fetchData } from "../../../api/fetchData";
import AdditionalFiles from "../Components/AdditionalFIles";

const ClientProfile = ({ outwards, user, userId }) => {
	const [skills, setSkills] = useState([]);

	const { clientDetails, setCurrentForm } = useContext(AddFormContext);

	const [users, setUsers] = useState(null);

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
	}, [user]);

	return (
		<>
			<div id="mike" className="lg:mt-0 lg:py-10 px-6 pb-20 lg:pb-0">
				<div className=" grid lg:grid-cols-5 gap-10 lg:px-20 text-zinc-800">
					<section className="lg:col-span-3  pb-10">
						{/* details section */}
						{clientDetails.map((detail, index) => (
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
								{detail.title != "reviews" ? (
									<ul className="flex flex-col">
										{detail?.value?.map((val) => (
											<li>{val}</li>
										))}
									</ul>
								) : (
									detail?.value?.length > 0 && (
										<ul className="flex flex-col gap-5 h-40 overflow-y-auto">
											{detail?.value?.map((review) => (
												<li className="border-b pb-2">
													<div className="flex gap-2 items-center">
														<img
															src={review?.createdBy?.photo?.url || avatarImage}
															alt=""
															className="h-10 w-10 rounded-full object-cover"
														/>
														<div className="flex-col">
															<Link
																to={`/profile/${review?.createdBy?.username}/posts`}
															>
																{review?.createdBy?.name}
															</Link>
															<h4 className="text-xs">
																{review?.createdBy?.occupation}
															</h4>
														</div>
													</div>
													<div className="pt-1">
														<Rating readOnly defaultValue={review?.rating} />
														<p>{review?.content}</p>
													</div>
												</li>
											))}
										</ul>
									)
								)}
								{(detail?.value?.length == 0 || !detail?.value) && (
									<div className="py-10 flex flex-col items-center justify-center">
										{detail.child}
										No {detail.title} have been added
									</div>
								)}
							</div>
						))}

						{/* documents */}
						<AdditionalFiles outwards={outwards} user={user} />
					</section>

					{/* right hand side */}
					<section className="lg:col-span-2">
						<div>
							<h2>Verification</h2>
							<ul className="border rounded p-6 mt-4 mb-10 flex flex-col gap-1 w-full">
								<li className="flex gap-2 justify-between items-center pt-2 pb-3 border-b">
									<div className="flex gap-2 items-center">
										<UIcon className="h-5" /> Identity{" "}
										{!outwards && "Verification"}
									</div>
									{outwards ? (
										<XMarkIcon className="h-5 text-red-500" />
									) : (
										<p className="text-primary-500 text-sm">Verify</p>
									)}
								</li>
								<li className="flex gap-2 justify-between items-center pt-2 pb-3 border-b">
									<div className="flex gap-2 items-center">
										<CreditCardIcon className="h-5" /> Payment
										{!outwards && " Verification"}
									</div>
									{outwards ? (
										<XMarkIcon className="h-5 text-red-500" />
									) : (
										<p className="text-primary-500 text-sm">Verify</p>
									)}
								</li>
								<li className="flex gap-2 justify-between items-center pt-2 pb-3 border-b">
									<div className="flex gap-2 items-center">
										<PhoneIcon className="h-5" /> Phone{" "}
										{!outwards && "Verification"}
									</div>
									<CheckIcon className="h-5 text-green-500" />
								</li>
								<li className="flex gap-2 justify-between items-center pt-2 pb-3">
									<div className="flex gap-2 items-center">
										<EnvelopeIcon className="h-5" /> Email
										{!outwards && " Verification"}
									</div>
									<CheckIcon className="h-5 text-green-500" />
								</li>
							</ul>
						</div>
						<div className="border rounded p-6">
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
					</section>
				</div>
			</div>
		</>
	);
};

export default ClientProfile;
