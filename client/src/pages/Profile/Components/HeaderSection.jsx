import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon, PhotoIcon } from "@heroicons/react/20/solid";
import {
	ArrowsPointingOutIcon,
	BanknotesIcon,
	BuildingOfficeIcon,
	EllipsisHorizontalIcon,
	MapPinIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../../api/postData";
import { updateData } from "../../../api/updateData";
import { LoaderContext } from "../../../contexts/LoaderContext";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { moneyFormat } from "../../../functions/moneyFormat";
import { AddFormContext } from "../../../contexts/AddForm";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import { ImageContext } from "../../../contexts/ImageContext";
import ImageCropper from "../../../components/MikesComponents/ImageCropper";

const HeaderSection = ({ outwards, id, user, userId }) => {
	const { showCropper, croppedImages, cropDone } = useContext(ImageContext);

	const navigate = useNavigate();

	const { setLoading } = useContext(LoaderContext);
	const { checkStorage } = useContext(UserDataContext);
	const { setCurrentForm } = useContext(AddFormContext);

	const [isOpen, setIsOpen] = useState(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}

	const [showPanel, setShowPanel] = useState(false);
	const [isProfilePhoto, setIsProfilePhoto] = useState(false);

	const handleDrag = (e, info) => {
		if (info.offset.y > 100) {
			setShowPanel(false);
			setFixTab(false);
		}
	};

	const [following, setFollowing] = useState(false);

	const [followers, setFollowers] = useState(null);

	const [pfp, setPfp] = useState(null);
	const [coverPhoto, setCoverPhoto] = useState(null);

	const [isHeader, setIsHeader] = useState(false);

	const handleFollow = () => {
		if (!following) {
			postData(`/users/${user?._id}/follow`).then((res) => {
				if (res.ok) {
					setFollowing(true);

					let localFollowers = followers;

					localFollowers.push(userId);

					setFollowers([...localFollowers]);
				}
			});
		} else {
			updateData(`/users/${user?._id}/unfollow`).then((res) => {
				if (res.ok) {
					setFollowing(false);
					let localFollowers = followers;
					localFollowers.splice(localFollowers.indexOf(userId), 1);
					setFollowers([...localFollowers]);
				}
			});
		}
	};

	useEffect(() => {
		setFollowers(user?.followers);
		if (user?.followers?.includes(userId)) {
			setFollowing(true);
		}
		setPfp(user?.photo?.url);
		setCoverPhoto(user?.coverPhoto?.url);
	}, [user]);

	useEffect(() => {
		if (cropDone && isHeader) {
			setLoading(true);
			updateData(`/users/update${isProfilePhoto ? "Profile" : "Cover"}Photo`, {
				photo: croppedImages[0],
			}).then((res) => {
				setLoading(false);
				setIsHeader(false);
				res.json().then((r) => {
					let userData = JSON.parse(localStorage.getItem("user"));
					if (isProfilePhoto) {
						userData.user.photo = r.data.photo;
						setPfp(r.data.photo.url);
						localStorage.setItem("user", JSON.stringify(userData));
					} else {
						userData.user.coverPhoto = r.data.photo;
						setCoverPhoto(r.data.photo.url);
						localStorage.setItem("user", JSON.stringify(userData));
					}
					checkStorage;
				});
			});
		}
	}, [cropDone]);
	return (
		<>
			<header className="mt-[63px] sm:mt-0">
				<div
					onClick={() => {
						if (outwards) {
							coverPhoto && openModal();
							setIsProfilePhoto(false);
						} else {
							setShowPanel(true);
							setIsProfilePhoto(false);
						}
					}}
					className=" h-40 md:h-80 w-full text-zinc-500 relative"
				>
					{!coverPhoto && (
						<div className="bg-zinc-300 flex justify-center items-center h-full">
							<PhotoIcon className="h-10" />
						</div>
					)}
					{coverPhoto && (
						<img
							src={coverPhoto}
							className="h-full w-full object-cover"
							alt=""
						/>
					)}
					{!outwards && (
						<div className="h-8 w-8 rounded-full bg-zinc-300 border border-white flex justify-center items-center absolute bottom-1.5 right-1.5 ">
							<CameraIcon className="h-4" />
						</div>
					)}
				</div>

				<div className="flex flex-col lg:flex-row px-8 md:px-10 gap-4 w-full relative">
					{pfp ? (
						<img
							onClick={() => {
								if (outwards) {
									openModal();
									setIsProfilePhoto(true);
								} else {
									setShowPanel(true);
									setIsProfilePhoto(true);
								}
							}}
							className="lg:-mt-10 -mt-20 lg:h-40 lg:w-40 h-32 w-32 object-cover rounded-full border-2 md:border-4 cursor-pointer"
							src={pfp}
						/>
					) : (
						<div
							onClick={() => {
								if (outwards) {
									pfp && openModal();
									setIsProfilePhoto(true);
								} else {
									setShowPanel(true);
									setIsProfilePhoto(true);
								}
							}}
							className="lg:h-40 lg:w-40 h-32 w-32 rounded-full flex items-center justify-center border-2 md:border-4 border-white bg-zinc-300 text-zinc-500 lg:-mt-10 -mt-20 relative"
						>
							<img
								className="h-full w-full rounded-full"
								src={avatarImage}
								alt=""
							/>

							{!outwards && (
								<div className="h-8 w-8 rounded-full bg-zinc-300 border border-white flex justify-center items-center absolute bottom-1.5 right-1.5">
									<CameraIcon className="h-4" />
								</div>
							)}
						</div>
					)}

					<div className="flex flex-col">
						<h1 className="text-3xl font-bold capitalize">
							{user && user.name}
						</h1>
						<h2 className="text-base font-bold text-zinc-500 mb-2 capitalize">
							@{user && user.username}
						</h2>

						<Link
							to={"/profile/followers" + (id ? `/${id}` : "")}
							className="font-semibold text-zinc-500 text-xs items-center flex"
						>
							{[1, 2, 3, 4].map(() => (
								<div className="h-6 w-6 rounded-full bg-zinc-400 border border-white -ml-1 "></div>
							))}
							<span className="pt-1 pl-1 text-zinc-500">
								{" "}
								{user?.followers.length} followers
							</span>
						</Link>

						<button
							onClick={() => {
								!outwards ? navigate("/settings/profile") : handleFollow();
							}}
							className={`${
								following ? "bg-zinc-100" : "bg-primary-500 text-white"
							} p-0 w-full lg:w-max px-20 py-2  rounded-md mt-4 font-semibold shadow`}
						>
							{outwards ? (following ? "Unfollow" : "Follow") : "Edit Profile"}
						</button>
						{/* <button className="bg-zinc-300 hidden lg:block text-zinc-300 py-2 px-4 rounded-md absolute top-2 right-10">
							<EllipsisHorizontalIcon className="h-6" />
						</button> */}
					</div>
				</div>
				<div className="border p-6">
					<div className=" grid grid-cols-3 md:text-sm text-xs  gap-4">
						<p className="flex flex-col bg-zinc-100/50 p-4 rounded justify-center gap-2 items-center text-center">
							<BuildingOfficeIcon className="h-4" />{" "}
							{user?.role == "enterprise"
								? "Enterprise Account"
								: "Creedlancer Account"}
						</p>
						<p
							onClick={() =>
								!outwards &&
								setCurrentForm({
									title: "hourly pay",
									child: null,
									fields: [
										{
											label: "Amount",
											placeholder: "Ex: 5000",
										},
									],
								})
							}
							className="flex cursor-pointer flex-col bg-zinc-100/50 p-4 rounded justify-center relative gap-2 items-center text-center"
						>
							<BanknotesIcon className="h-4" />{" "}
							{moneyFormat(user?.hourlyPay ? user?.hourlyPay : 0)} /hour
						</p>
						<p className="flex flex-col bg-zinc-100/50 p-4 rounded justify-center gap-2 items-center text-center">
							<MapPinIcon className="h-4" /> {user?.city}, {user?.state}
						</p>
					</div>
				</div>
			</header>
			<Transition appear show={showPanel} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setShowPanel(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div id="mike" className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full  items-center justify-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={
										"bg-white px-10 py-6 overflow-hidden rounded-lg w-max h-max relative"
									}
								>
									<button
										style={{ outline: "none" }}
										className="flex outline-none text-zinc-500 gap-4 px-4 py-4 hover:bg-zinc-200 rounded hover:text-zinc-700 transition w-full text-center disabled:opacity-50"
										disabled={isProfilePhoto ? !pfp : !coverPhoto}
										onClick={(e) => {
											e.preventDefault();
											setShowPanel(false);
											setIsOpen(true);
										}}
									>
										<ArrowsPointingOutIcon className="h-6" />
										View {isProfilePhoto ? "Profile" : "Cover"} Photo
									</button>
									<button
										style={{ outline: "none" }}
										className="flex outline-none text-zinc-500 gap-4 px-4 py-4 hover:bg-zinc-200 rounded hover:text-zinc-700 transition w-full text-center relative"
									>
										<PhotoIcon className="h-6" />
										Change {isProfilePhoto ? "Profile" : "Cover"} Photo
										<input
											type="file"
											accept="image/*"
											onChange={(e) => {
												setShowPanel(false);
												setIsHeader(true);
												showCropper([e.target.files[0]]);
											}}
											className="absolute top-0 left-0 h-full w-full z-50 opacity-0"
										/>
									</button>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div id="mike" className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full  items-center justify-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel
									className={
										"bg-white p-6 overflow-hidden rounded-2xl w-max h-max relative"
									}
								>
									<img
										as="img"
										src={
											isProfilePhoto ? user?.photo?.url : user?.coverPhoto?.url
										}
										style={{ maxHeight: "70vh" }}
										className="w-[80vw] md:w-auto object-contain rounded transform text-left align-middle shadow-xl transition-all md:min-h-[30vh]"
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			<ImageCropper />
		</>
	);
};

export default HeaderSection;
