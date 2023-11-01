// import "../main.css";
import { useState, useEffect, useContext } from "react";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { ModalContext } from "../../../contexts/ModalContext";
import Btn from "../Components/Btn";
import Swal from "sweetalert2";
import { deleteData } from "../../../api/deleteData";
import React from "react";
import { updateData } from "../../../api/updateData";
import { useNavigate } from "react-router-dom";
const Account = () => {
	const navigate = useNavigate();
	const { showModal } = useContext(ModalContext);
	const { userData } = useContext(UserDataContext);
	const [profile, setProfile] = useState(null);
	const [enabled, setEnabled] = useState(false);
	const [listMe, setListMe] = useState(false);
	const [allowFreelancer, setllowFreelancer] = useState(false);
	const [hidePrice, setHidePrice] = useState(profile?.hidePrice);
	const [work, setWork] = useState(true);
	const [accountType, setAccountType] = useState(null);
	const storage = localStorage.getItem("user");
	const mainStorage = JSON.parse(storage);

	useEffect(() => {
		if (userData) {
			const { user } = JSON.parse(userData);
			user?.passwordConfirm && delete user.passwordConfirm;
			setProfile(user);
			setListMe(user.listMe);
			setllowFreelancer(user.allowFreelancer);
			setHidePrice(user.hidePrice);
			setAccountType(user.accountType);
		}
	}, [userData]);

	const enableListMe = async (value) => {
		await updateData(`/users/update/${profile._id}`, {
			listMe: !value,
		})
			.then(async (res) => {
				const { data } = await res.json();
				showModal("saved", true);
				setListMe(data.updatedUser.listMe);
				const update = {
					user: { ...profile, listMe: data.updatedUser.listMe },
					token: mainStorage.token,
				};
				localStorage.setItem("user", JSON.stringify(update));
			})
			.catch((err) => {
				showModal("Network Error", false);
			});
	};

	const enableAllow = async (value) => {
		const response = await updateData(`/users/update/${profile._id}`, {
			allowFreelancer: !value,
		})
			.then(async (res) => {
				const { data } = await res.json();
				showModal("saved", true);
				setllowFreelancer(data.updatedUser.allowFreelancer);
				const update = {
					user: {
						...profile,
						allowFreelancer: data.updatedUser.allowFreelancer,
					},
					token: mainStorage.token,
				};
				localStorage.setItem("user", JSON.stringify(update));
			})
			.catch((err) => {
				showModal("Network Error", false);
			});
	};

	const enabelHide = async (value) => {
		const response = await updateData(`/users/update/${profile._id}`, {
			hidePrice: !value,
		})
			.then(async (res) => {
				const { data } = await res.json();
				showModal("saved", true);
				setHidePrice(data.updatedUser.hidePrice);
				const update = {
					user: { ...profile, hidePrice: data.updatedUser.hidePrice },
					token: mainStorage.token,
				};
				localStorage.setItem("user", JSON.stringify(update));
			})
			.catch((err) => {
				showModal("Network Error", false);
			});
	};

	const updateAccountType = async (type) => {
		const response = await updateData(`/users/update/${profile._id}`, {
			accountType: type,
		})
			.then(async (res) => {
				const { data } = await res.json();
				showModal("saved", true);
				setAccountType(data.updatedUser.accountType);
				const update = {
					user: { ...profile, accountType: data.updatedUser.accountType },
					token: mainStorage.token,
				};
				localStorage.setItem("user", JSON.stringify(update));
			})
			.catch((err) => {
				showModal("Network Error", false);
			});
	};

	const deactivateAccount = async () => {
		const response = await updateData(`/users/deactivate-my-account`);
		if (!response.ok) {
			const data = await response.json();
			showModal(`${data.message}`, false);
		} else {
			showModal("success", true);
			const update = {
				user: { ...profile, active: data.updatedUser.active },
				token: mainStorage.token,
			};
			localStorage.setItem("user", JSON.stringify(update));
			return true;
		}
	};

	const deleteAccount = async () => {
		const response = await deleteData(`/users/delete-my-account`);
		if (!response.ok) {
			const data = await response.json();
			showModal(`${data.message}`, false);
		} else {
			showModal("Account Deleted", true);
			localStorage.removeItem("user");
			navigate("/login");
			return true;
		}
	};

	return (
		<>
			<h1 className="text-3xl font-semibold lg:px-4">Account</h1>
			<hr className="my-6" />
			<section>
				<h2 className="py-4 text-2xl">Directory and Follow Settings</h2>
				<ul className="flex flex-col gap-4 pb-10">
					<li className="flex items-center gap-2 text-sm lg:text-base">
						<Switch
							checked={listMe}
							onChange={() => enableListMe(listMe)}
							className={`${listMe ? "bg-zinc-900" : "bg-zinc-300"}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${listMe ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						List me on the Freelancer directory, allowing Employers to hire me
						directly for Projects,
					</li>
					<li className="flex items-center gap-2 text-sm lg:text-base">
						<Switch
							checked={allowFreelancer}
							onChange={() => enableAllow(allowFreelancer)}
							className={`${allowFreelancer ? "bg-zinc-900" : "bg-zinc-300"}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${
									allowFreelancer ? "translate-x-5" : "translate-x-0"
								}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						Allow Freelancers to follow me, notifying them of projects and
						contents i have posted,
					</li>
					<li className="flex items-center gap-2 text-sm lg:text-base">
						<Switch
							checked={hidePrice}
							onChange={() => enabelHide(hidePrice)}
							className={`${hidePrice ? "bg-zinc-900" : "bg-zinc-300"}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${hidePrice ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						Hide price on reviews and projects with sealed bids,
					</li>
				</ul>
				<h2 className="py-4 text-2xl">
					Account Type
					<h3 className="text-zinc-500 text-sm italic">I am looking to:</h3>
				</h2>
				<ul className="flex flex-col gap-4 pb-10">
					<li className="flex items-center">
						<div className="w-8">
							<div
								onClick={() => updateAccountType("work")}
								className={`h-5 w-5 rounded-full  flex justify-center items-center cursor-pointer ${
									accountType === "work" ? "bg-zinc-900" : "bg-zinc-300"
								} hover:bg-zinc-900`}
							>
								<motion.div
									animate={{
										height: accountType === "work" ? "8px" : "12px",
										width: accountType === "work" ? "8px" : "12px",
									}}
									className=" rounded-full bg-white"
								></motion.div>
							</div>
						</div>
						Work
					</li>
					<li className="flex items-center">
						<div className="w-8">
							<div
								onClick={() => updateAccountType("hire")}
								className={`h-5 w-5 rounded-full  flex justify-center items-center cursor-pointer ${
									accountType !== "work" ? "bg-zinc-900" : "bg-zinc-300"
								} hover:bg-zinc-900`}
							>
								<motion.div
									animate={{
										height: accountType !== "work" ? "8px" : "12px",
										width: accountType !== "work" ? "8px" : "12px",
									}}
									className=" rounded-full bg-white"
								></motion.div>
							</div>
						</div>
						Hire
					</li>
				</ul>
				<div className=" pt-4 flex flex-col gap-4">
					<h3 className="text-2xl capitalize font-medium">
						Deactivate Account
					</h3>
					<p>
						Deactivating your account will cause your profile and listings to
						disappear, and you will not receive any notifications from us. This
						can be undone latter.
					</p>
				</div>
				<div className="pt-6 pb-10">
					<Btn
						type={1}
						text={"Deactivate Account"}
						onClick={() =>
							Swal.fire({
								icon: "warning",
								title: "Deactivate Account",
								text: "Deactivating your account will cause your profile and listings to disappear",
								showConfirmButton: true,
								confirmButtonColor: "rgb(218 165 32)",
								confirmButtonText: "Deactivate",
								showCancelButton: true,
							}).then(async (res) => {
								if (res.isConfirmed) {
									const status = await deactivateAccount();
									// setProjects((prev) =>
									//   prev.filter((items) => items._id !== job._id)
									// );
									// status &&
									status &&
										Swal.fire({
											icon: "success",
											title: "Account Deactivated",
											text: "Your Account have been deactivated",
											timer: 1500,
										});
								}
							})
						}
					/>
				</div>

				<div className="pt-4 flex flex-col gap-4">
					<h3 className="text-2xl capitalize font-medium">Delete Account</h3>
					<p>
						Deactivating your account will cause your profile and listings to
						disappear, and you will not receive any notifications from us. This
						can be undone latter.
					</p>
				</div>
				<div className="pt-6 pb-10">
					<Btn
						type={1}
						text={"Delete Account"}
						onClick={() =>
							Swal.fire({
								icon: "warning",
								title: "Delete Account",
								text: "Deleting your account will cause your profile and listings to disappear",
								showConfirmButton: true,
								confirmButtonColor: "rgb(218 165 32)",
								confirmButtonText: "Delete",
								showCancelButton: true,
							}).then(async (res) => {
								if (res.isConfirmed) {
									const status = await deleteAccount();
									// setProjects((prev) =>
									//   prev.filter((items) => items._id !== job._id)
									// );

									status &&
										Swal.fire({
											icon: "success",
											title: "Account Deleted",
											text: "Your Account have been Deleted",
											timer: 1500,
										});
								}
							})
						}
					/>
				</div>
			</section>
		</>
	);
};

export default Account;
