import React, {
	useContext,
	useEffect,
	useState,
	useRef,
	Fragment,
} from "react";
// import "./CompleteReg.css";
import DropZone from "./DropZone";
import { States } from "../../data/data";
import { cities } from "../../data/data";
import { useNavigate } from "react-router-dom";
// import David from "../../assets/dashboard/applicant.png";
import { SignupContext } from "../../contexts/SignupContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import { ModalContext } from "../../contexts/ModalContext";
import { UserDataContext } from "../../contexts/UserDataContext";
import Logo from "../../assets/logo-img/Creedlance logo without slogan black.png";
import Avatar from "../../assets/creating-account-img/image-placeholder.png";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { occupations } from "../../../data/occupations";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import PickLocation from "../../components/common/PickLocation";
import PickCategory from "../../components/common/PickCategory";
import { fetchData } from "../../api/fetchData";
import { CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CompleteReg = () => {
	const navigate = useNavigate();
	const uploadPictureRef = useRef(null);
	const { setLoading } = useContext(LoaderContext);
	const {
		name,
		setName,
		username,
		setUsername,
		file,
		setFile,
		DateOfBirth,
		setDateOfBirth,
		occupationValue,
		setOccupationValue,
		state,
		setState,
		setCity,
		city,
		businessLocation,
		setBusinessLocation,
		category,
		setCategory,
		bio,
		setBio,
		signup,
		setPhoto,
	} = useContext(SignupContext);
	const { showModal } = useContext(ModalContext);
	const { checkStorage } = useContext(UserDataContext);

	const [query, setQuery] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [userLoader, setUserLoader] = useState(false);
	const [taken, setTaken] = useState(false);
	const [display, setDisplay] = useState(false);
	const [showCategoryModal, setShowCategoryModal] = useState(false);

	useEffect(() => {
		setState(location.state);
		setCity(location.lga);
	}, [location]);

	useEffect(() => {
		setTaken(false);
		if (username) {
			setUserLoader(true);
			fetchData(`/users/${username.toLowerCase()}/get-user-username`).then(
				(data) => {
					setUserLoader(false);
					data && setTaken(true);
				}
			);
		}
	}, [username]);

	const filteredOccupations =
		query === ""
			? occupations
			: occupations.filter((occupation) =>
					occupation.occupation
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	function handleChange(e) {
		setFile(URL.createObjectURL(e.target.files[0]));
		setPhoto(e.target.files[0]);
	}
	const handleSubmit = (e) => {
		setLoading(true);
		e.preventDefault();

		if (name && DateOfBirth && occupationValue && location && category && bio) {
			signup(false).then((res) => {
				if (res.ok) {
					res.json().then((res) => {
						localStorage.setItem("user", JSON.stringify(res));
						checkStorage();
						setLoading(false);
						navigate("/profile/posts");
						showModal("Welcome " + name + "!", true);
					});
				} else {
					res.json().then((res) => {
						showModal(res.message, false);
						setLoading(false);
					});
				}
			});
		} else {
			setLoading(false);
			showModal("Fill all required (*) fields", false);
			console.log(
				name,
				file,
				DateOfBirth,
				occupationValue,
				businessLocation,
				bio
			);
		}
	};

	const handleProfileImageUpload = () => {
		uploadPictureRef.current.click();
	};

	const IOSSwitch = styled((props) => (
		<Switch
			focusVisibleClassName=".Mui-focusVisible"
			disableRipple
			{...props}
		/>
	))(({ theme }) => ({
		width: 42,
		height: 26,
		padding: 0,
		// marginLeft: -28,
		"& .MuiSwitch-switchBase": {
			padding: 0,
			margin: 2,
			transitionDuration: "300ms",
			"&.Mui-checked": {
				transform: "translateX(16px)",
				color: "#fff",
				"& + .MuiSwitch-track": {
					backgroundColor:
						theme.palette.mode === "dark" ? "#152144" : "#152144",
					opacity: 1,
					border: 0,
				},
				"&.Mui-disabled + .MuiSwitch-track": {
					opacity: 0.5,
				},
			},
			"&.Mui-focusVisible .MuiSwitch-thumb": {
				color: "#152144",
				border: "6px solid #fff",
			},
			"&.Mui-disabled .MuiSwitch-thumb": {
				color:
					theme.palette.mode === "light"
						? theme.palette.grey[100]
						: theme.palette.grey[600],
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
			},
		},
		"& .MuiSwitch-thumb": {
			boxSizing: "border-box",
			width: 22,
			height: 22,
		},
		"& .MuiSwitch-track": {
			borderRadius: 26 / 2,
			backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
			opacity: 1,
			transition: theme.transitions.create(["background-color"], {
				duration: 500,
			}),
		},
	}));

	useEffect(() => {
		!name ? navigate("/register") : null;
		setOccupationValue();
		let d = new Date();
		setDate(`${d.getFullYear() - 18}-${d.getMonth() + 1}-${d.getDate()}`);
	}, []);

	return (
		<div className="box-border w-full bg-white">
			<input
				type="file"
				ref={uploadPictureRef}
				onChange={handleChange}
				className="hidden"
			/>
			<div className="lg:w-[90%] lg:mx-auto max-w-[1300px] pt-4">
				<img
					src={Logo}
					alt="creedlance-logo"
					className="w-1/2 object-contain block my-3 lg:w-64 lg:mb-16 lg:mx-auto"
				/>
			</div>
			<form
				className="lg:flex lg:w-[90%] lg:mx-auto max-w-[1300px] lg:mb-16"
				onSubmit={(e) => handleSubmit(e)}
			>
				{/* Left */}
				<div className="px-4 lg:flex-1 pt-10 lg:pb-[4rem]">
					<h1 className="font-intermedium m-0 text-[#152144] text-2xl lg:text-4xl">
						Register
					</h1>
					<p className="font-inter m-0 text-sm text-[#A0AEC0] mt-1 lg:text-base">
						Please make sure the following details are correct.
					</p>
					{/* upload profile image */}
					<div className="lg:hidden">
						<div className="flex flex-col items-center gap-y-2 my-5">
							<img
								src={file ? file : Avatar}
								className="h-20 aspect-square object-cover rounded-full"
							/>
							<button
								className="py-2 px-4 rounded-md outline-none border"
								onClick={handleProfileImageUpload}
								type="button"
							>
								Upload picture
							</button>
						</div>
					</div>

					{/* inputs */}
					<div className="mt-5 flex flex-col gap-y-5 lg:mt-7 lg:gap-y-7">
						{/* form group */}
						<div className="flex flex-col gap-y-2">
							<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
								Username*
							</label>
							<div className="relative">
								<input
									style={{ border: "1px solid #cfd4da" }}
									type="text"
									required
									placeholder="Username"
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
									}}
									className={`border border-gray-200 border-inherit rounded-[14px] text-sm p-3 placeholder:text-[#7a8593] focus:outline-yellow-400 ${
										taken ? "border-red-500" : ""
									} focus:outline w-full box-border lg:p-4`}
								/>
								{userLoader && (
									<div className="absolute h-full w-max flex items-center top-0 right-4">
										<CircularProgress
											size={20}
											sx={{ color: "rgb(113 113 122)" }}
										/>
									</div>
								)}
							</div>
							{taken && (
								<p className="text-xs text-red-500 -mt-1">
									This username has been taken.
								</p>
							)}
						</div>
						{/* form group */}
						<div id="mike" className="flex flex-col gap-y-2">
							<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
								Occupation*
							</label>
							<Combobox value={occupationValue} onChange={setOccupationValue}>
								<div className="relative mt-1">
									<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-100 sm:text-sm border">
										<Combobox.Input
											className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 placeholder:text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4"
											displayValue={(occupation) => occupation.occupation}
											onChange={(event) => setQuery(event.target.value)}
											placeholder="Occupation"
										/>
										<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</Combobox.Button>
									</div>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
										afterLeave={() => setQuery("")}
									>
										<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{filteredOccupations.length === 0 && query !== "" ? (
												<Combobox.Option
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? "bg-primary-500 text-white"
																: "text-gray-900"
														}`
													}
													value={{ id: null, occupation: query }}
												>
													"{query}"
												</Combobox.Option>
											) : (
												filteredOccupations.map((occupation) => (
													<Combobox.Option
														key={occupation.id}
														className={({ active }) =>
															`relative cursor-default select-none py-2 pl-10 pr-4 ${
																active
																	? "bg-primary-500 text-white"
																	: "text-gray-900"
															}`
														}
														value={occupation}
													>
														{({ selected, active }) => (
															<>
																<span
																	className={`block truncate ${
																		selected ? "font-medium" : "font-normal"
																	}`}
																>
																	{occupation.occupation}
																</span>
																{selected ? (
																	<span
																		className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																			active ? "text-white" : "text-primary-500"
																		}`}
																	>
																		<CheckIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	</span>
																) : null}
															</>
														)}
													</Combobox.Option>
												))
											)}
										</Combobox.Options>
									</Transition>
								</div>
							</Combobox>
						</div>
						<div id="mike" className="flex flex-col gap-y-2">
							<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
								Category*
							</label>
							<input
								type="text"
								value={
									category
										? `${category.category}, ${category.subCategory}`
										: ""
								}
								readOnly
								onClick={() => setShowCategoryModal(!showCategoryModal)}
								className="border rounded-md p-2 valid:border-emerald-300"
								placeholder={"Ex: Education"}
								required
							/>
							<small className="pl-2 text-xs text-zinc-500">
								Choose the closest category to your Business, Service, Provision
								or Occupation
							</small>
							{showCategoryModal && (
								<PickCategory
									hide={() => setShowCategoryModal(false)}
									onPick={(cat) => setCategory(cat)} // callback called with the selected category
								/>
							)}
						</div>
						{/* Form row
						<div className="flex items-center gap-x-2 lg:gap-x-4">
							
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">Job Category*</label>
								<select 
									style={{border: '1px solid #cfd4da'}}
									 className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
									 value={jobCategory}
									 onChange={(e) => setJobCategory(e.target.value)}
								>
									<option value="">Select an option</option>
									<option value="option1">Option 1</option>
									<option value="option2">Option 2</option>
									<option value="option3">Option 3</option>
								</select>
							</div>
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">Job Subcategory*</label>
								<select 
									style={{border: '1px solid #cfd4da'}}
									 className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
									 value={jobSubCategory}
									 onChange={(e) => setJobSubCategory(e.target.value)}
								>
									<option value="">Select an option</option>
									<option value="option1">Option 1</option>
									<option value="option2">Option 2</option>
									<option value="option3">Option 3</option>
								</select>
							</div>
						</div> */}
						{/* Form row */}
						<div className="flex items-center gap-x-2 lg:gap-x-4">
							{/* form group */}
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
									DOB*
								</label>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									{date && (
										<DatePicker
											maxDate={dayjs(date)}
											value={DateOfBirth}
											onChange={(newVal) => setDateOfBirth(newVal)}
											// maxDate={dayjs(maxDate)}
											className="border rounded-md p-2 valid:border-emerald-300"
										/>
									)}
								</LocalizationProvider>
							</div>
							{/* form group */}
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
									Level of Education*
								</label>
								<select
									style={{ border: "1px solid #cfd4da" }}
									className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
									//  value={jobCategory}
									//  onChange={(e) => setJobCategory(e.target.value)}
								>
									<option selected hidden>
										Select an option
									</option>

									<option value="High School Diploma">
										High School Diploma
									</option>
									<option value="Associate's Degree">Associate's Degree</option>
									<option value="bachelor's Degree">Bachelor's Degree</option>
									<option value="Master's Degree">Master's Degree</option>
									<option value="Doctorate (Ph.D.)">Doctorate (Ph.D.)</option>
								</select>
							</div>
						</div>
						{/* Form row */}
						<div className="flex flex-col gap-y-2">
							<label
								htmlFor=""
								className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm"
							>
								My Location*
							</label>
							<div
								type="text"
								id="mike"
								style={{ border: "1px solid rgb(209 213 219)" }}
								className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem] cursor-pointer text-base"
								onClick={() => setDisplay(true)}
							>
								{location?.lga ? (
									`${location?.lga}, ${location?.state}`
								) : (
									<p className="text-zinc-400">Ex: Lagos</p>
								)}
							</div>
							{display && (
								<PickLocation
									onPick={setLocation}
									hide={() => setDisplay(false)}
									setDisp={setDisplay}
								/>
							)}
						</div>
						{/* form group */}
						{/* <div className="flex flex-col gap-y-2">
							<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
								Business Location*
							</label>
							<select
								style={{ border: "1px solid #cfd4da" }}
								className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
								value={businessLocation}
								onChange={(e) => setBusinessLocation(e.target.value)}
							>
								<option selected hidden>
									Select an option
								</option>

								{States.map((option, index) => (
									<option key={index} value={option.state}>
										{option.state}
									</option>
								))}
							</select>
						</div> */}

						{/* Get job offers */}
						<div className="hidden items-center gap-x-2 lg:flex">
							<IOSSwitch />
							<p className="m-0 text-[0.85rem] font-inter">
								Get me job offers from my location only{" "}
							</p>
						</div>
					</div>
				</div>

				<div className="hidden lg:inline border-dashed border-primary-500 border-[2px] mx-10"></div>

				{/* Right */}
				<div className="flex flex-col items-center gap-y-5 px-4 mt-5 pb-5 lg:mt-0 lg:flex-1 lg:pt-2 lg:gap-y-7">
					{/* upload profile image */}
					<div className="hidden flex-col items-center gap-y-2 my-5 lg:flex">
						<img
							src={file ? file : Avatar}
							className="h-20 object-cover rounded-full aspect-square"
						/>
						<button
							className="py-2 px-4 rounded-md outline-none border"
							onClick={handleProfileImageUpload}
							type="button"
						>
							Upload picture
						</button>
					</div>

					{/* Form row */}
					<div className="flex flex-col gap-y-3 w-full box-border sm:flex-row sm:items-center sm:gap-x-2 lg:gap-x-4">
						{/* form group */}
						<div className="flex flex-col gap-y-2 flex-1">
							<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
								Certificate (optional)
							</label>
							<DropZone className="border-dashed border-[0.5px] border-[#cfd4da] lg:border-[1.7px] rounded-[14px]" />
						</div>
						{/* form group */}
						<div className="flex flex-col gap-y-2 flex-1">
							<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
								Resume (optional)
							</label>
							<DropZone className="border-dashed border-[0.5px] border-[#cfd4da] lg:border-[1.7px] rounded-[14px]" />
						</div>
					</div>
					{/* form group */}
					<div className="flex flex-col gap-y-2 w-full">
						<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
							Work Experience*
						</label>
						<input
							required
							style={{ border: "1px solid #cfd4da" }}
							type="number"
							className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border pr-3 lg:p-[1.1rem]"
							placeholder="Ex: 3 (years)"
						/>
					</div>
					{/* form group */}
					{/* <div className="flex flex-col gap-y-2 w-full">
						<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
							Job Pictures/album
						</label>
						<span className="text-[#abb0ba] font-inter text-xs pl-2">
							This is where you can show your service or products through
							pictures. If you don’t have any, you can skip
						</span>
						<DropZone className="border-dashed border-[0.5px] border-[#cfd4da] lg:border-[1.7px] rounded-[14px] min-h-[100px] grid place-content-center lg:min-h-[220px]" />
					</div> */}
					{/* form group */}
					<div className="flex flex-col w-full gap-y-2">
						<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
							Description of your Job/self*
						</label>
						<textarea
							className=" border-[0.5px] p-3 border-[#cfd4da] rounded-[14px] lg:border-[1.7px] min-h-[100px] resize-none lg:p-4"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>
					</div>
					{/* Get job offers */}
					<div className="lg:hidden">
						<div className="flex items-center gap-x-2 w-full mt-4 lg:hidden">
							<IOSSwitch />
							<p className="m-0 text-[0.85rem] font-inter">
								Get me job offers from my location only{" "}
							</p>
						</div>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={taken}
						className="bg-[#daa520] disabled:opacity-50 border-none py-3 w-full rounded-md text-white mt-3 lg:mt-8 lg:py-4 lg:text-base"
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default CompleteReg;
