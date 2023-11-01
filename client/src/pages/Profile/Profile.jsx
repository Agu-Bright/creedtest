import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import HeaderSection from "./Components/HeaderSection";
import ClientProfile from "./Profiles/ClientProfile";
import SocialProfile from "./Profiles/SocialProfile";
import WorkerProfile from "./Profiles/WorkerProfile";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import Btn from "./Components/Btn";
import { AddFormContext } from "../../contexts/AddForm";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LoaderContext } from "../../contexts/LoaderContext";
import { fetchData } from "../../api/fetchData";
import { updateData } from "../../api/updateData";
import Swal from "sweetalert2";
import { ModalContext } from "../../contexts/ModalContext";

const Profile = () => {
	const navigate = useNavigate();

	const [fixTab, setFixTab] = useState(false);
	const { page, id } = useParams();
	const links = [
		{ title: "posts", to: "posts" },
		{ title: "client profile", to: "client" },
		{ title: "worker profile", to: "worker" },
	];

	const [outwards, setOutwards] = useState(false);
	const location = useLocation();

	const { userData, checkStorage } = useContext(UserDataContext);
	const { showModal } = useContext(ModalContext);

	const [user, setUser] = useState(null);
	const [userId, setUserId] = useState(null);

	const [value, setValue] = useState(null);
	const [description, setDescription] = useState(null);
	const [rating, setRating] = useState(null);
	const [start, setStart] = useState(null);
	const [stop, setStop] = useState(null);

	const { currentForm, setCurrentForm, setId } = useContext(AddFormContext);
	const { setLoading } = useContext(LoaderContext);

	useEffect(() => {
		if (userData) {
			setUserId(JSON.parse(userData).user._id);
			if (id) {
				if (id == userId) {
					setLoading(false);

					navigate("/profile/posts");
				}

				setLoading(true);
				setOutwards(true);
				setId(id);
				fetchData(`/users/${id}/get-user-username`).then((data) => {
					setLoading(false);
					setUser(data);
				});
			} else {
				setId(null);
				setOutwards(false);
				setUser(JSON.parse(userData).user);
			}
		}
	}, [userData, id, userId]);

	useEffect(() => {
		userId &&
			fetchData(`/users/${userId}/get-user`).then((data) => {
				localStorage.setItem(
					"user",
					JSON.stringify({
						token: JSON.parse(userData).token,
						user: data,
					})
				);
				checkStorage();
				// setUser(data)
			});
	}, [userId]);
	return (
		<>
			{currentForm && (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						exit={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						id="mike"
						className="h-full w-full fixed top-0 left-0 flex items-center justify-center z-[9000]"
					>
						<div
							className="bg-zinc-500/50 h-full w-full absolute z-10"
							onClick={() => setCurrentForm("")}
						></div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								// const form = e.target;
								if (rating || value || description) {
									if (
										currentForm.title == "about me" &&
										value?.trim().split(" ")?.length > 5
									) {
										return showModal("Invalid input", false);
									}
									setLoading(true);
									updateData(
										currentForm.title != "skill"
											? `/users/${user._id}/${currentForm.title.replace(
													/\s/g,
													""
											  )}`
											: "/users/addSkills",
										{
											value: currentForm.time
												? `${value}, from ${start} to ${stop}`
												: value,
											rating: rating,
											description: description,
										}
									).then(() => {
										setLoading(false);
										showModal("Updated!", true);
										fetchData(`/users/${user._id}/get-user`).then((data) => {
											if (data) {
												localStorage.setItem(
													"user",
													JSON.stringify({
														user: data,
														token: JSON.parse(userData).token,
													})
												);
												checkStorage();
												setValue();
												setDescription();
												setRating();
												setStart();
												setStop();
												setCurrentForm("");
											}
										});
									});
								}
							}}
							className="w-full h-full max-w-3xl md:max-h-96 z-20 bg-white md:rounded-md shadow flex flex-col "
						>
							<div className="border-b h-max p-4 text-lg border-zinc-500 capitalize flex gap-2 md:justify-between items-center">
								<ChevronLeftIcon
									onClick={() => setCurrentForm("")}
									className="h-6 cursor-pointer md:hidden"
								/>
								<h2>Add {currentForm.title}</h2>
								<XMarkIcon
									onClick={() => setCurrentForm("")}
									className="h-6 cursor-pointer hidden md:block"
								/>
							</div>
							<div className="h-full relative">
								<div className="absolute top-0 bottom-0 w-full p-4">
									<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{currentForm.fields.map(
											({ label, placeholder, options }) => (
												<li key={label} className="flex flex-col gap-2">
													<label htmlFor="" className="text-base">
														{label}
													</label>
													{/*  */}
													{currentForm.title != "about me" ? (
														<>
															{!options && (
																<input
																	name="value"
																	type="text"
																	className="border rounded-md p-2"
																	placeholder={placeholder}
																	value={value}
																	onChange={(e) => setValue(e.target.value)}
																/>
															)}
															{options && (
																<select
																	className="border rounded-md p-2"
																	name=""
																	id=""
																	value={
																		currentForm.title != "skill"
																			? value
																			: rating
																	}
																	onChange={(e) =>
																		currentForm.title != "skill"
																			? setValue(e.target.value)
																			: setRating(e.target.value)
																	}
																>
																	{options.map((option) => (
																		<option>{option}</option>
																	))}
																</select>
															)}
														</>
													) : (
														<>
															<div className="w-full">
																<input
																	name="value"
																	type="text"
																	className="border rounded-md p-2 w-full"
																	placeholder={placeholder}
																	value={value}
																	onChange={(e) => setValue(e.target.value)}
																/>
																<span
																	className={`text-xs ${
																		value?.split(" ")?.length > 5
																			? "text-red-500"
																			: ""
																	} `}
																>
																	{value?.split(" ")?.length
																		? value?.split(" ")?.length
																		: 0}
																	/5 words
																</span>
															</div>{" "}
															<label htmlFor="" className="text-base">
																About Me
															</label>
															<textarea
																className="w-full h-20 border rounded-md p-2"
																value={description}
																onChange={(e) => setDescription(e.target.value)}
																placeholder="Eg. I am Bob and I..."
															></textarea>
														</>
													)}
												</li>
											)
										)}
										{currentForm.time && (
											<>
												<li className="md:block hidden"></li>
												<li className="flex flex-col gap-2">
													<label htmlFor="" className="text-base">
														Start Period
													</label>
													<input
														name="start"
														type="month"
														className="border rounded-md p-2 w-full"
														placeholder={"2000"}
														value={start}
														onChange={(e) => setStart(e.target.value)}
													/>
												</li>
												<li className="flex flex-col gap-2">
													<label htmlFor="" className="text-base">
														End Period
													</label>
													<input
														name="end"
														type="month"
														className="border rounded-md w-full p-2"
														placeholder={"2005"}
														value={stop}
														onChange={(e) => setStop(e.target.value)}
													/>
												</li>
											</>
										)}
									</ul>
								</div>
							</div>
							<div className="lg:grid grid-cols-2 gap-4 p-4 text-white">
								<Btn text={"Add"} className={"w-full px-10"} />
							</div>
						</form>
					</motion.div>
				</AnimatePresence>
			)}
			<AdminNav fixTab={fixTab} setFixTab={setFixTab} />
			<main id="mike">
				<HeaderSection
					user={user}
					id={id}
					outwards={outwards}
					userId={userId}
				/>
				<div className="flex gap-4 capitalize p-6 font-semibold max-w-6xl mx-auto text-zinc-500 text-sm lg:text-base">
					{links.map(({ title, to }) => (
						<Link
							to={"/profile/" + (id ? `${id}/` : "") + to}
							className={`border-b-2 py-2 w-40 text-center ${
								location.pathname == "/profile/" + (id ? `${id}/` : "") + to
									? " text-primary-500 border-primary-500"
									: ""
							} `}
						>
							{title}
						</Link>
					))}
				</div>
				{page == "client" && (
					<ClientProfile user={user} outwards={outwards} userId={userId} />
				)}
				{page == "worker" && (
					<WorkerProfile user={user} outwards={outwards} userId={userId} />
				)}
				{page == "posts" && (
					<SocialProfile user={user} outwards={outwards} userId={userId} />
				)}
			</main>
		</>
	);
};

export default Profile;
