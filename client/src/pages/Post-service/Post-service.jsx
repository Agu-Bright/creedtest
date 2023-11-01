import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import "./Post-service.css";
import PickLocation from "../../components/common/PickLocation";
import PickCategory from "../../components/common/PickCategory";
import React, { Fragment, useContext, useEffect, useState } from "react";
import About_service from "./Post-service1";
import Service_details from "./Post-service2";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import Btn from "../../components/MikesComponents/Btn";
import { img7 } from "../../assets/mike";
import List from "../../components/MikesComponents/List";
import { AddServicesContext } from "../../contexts/ServicesContext";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { LoaderContext } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";
import ImageCropper from "../../components/MikesComponents/ImageCropper";

const Post_service = () => {
	const navigate = useNavigate();
	const {
		name,
		setName,
		category,
		setCategory,
		location,
		setLocation,
		files,
		setFiles,
		description,
		setDescription,
		skills,
		setSkills,
		duration,
		setDuration,
		selectDuration,
		setSelectDuration,
		methodOfPayment,
		setMethodOfPayment,
		minimumPrice,
		setMinimumPrice,
		maximumPrice,
		setMaximumPrice,
		addService,
	} = useContext(AddServicesContext);

	const { setLoading } = useContext(LoaderContext);

	const [display, setDisplay] = useState(false);
	const [showCategoryModal, setShowCategoryModal] = useState(false);

	const [fixTab, setFixTab] = useState(false);
	const [id, setId] = useState("details");
	const [skillsInput, setSkillsInput] = useState("");
	const handleTab1 = () => {
		// update the state to tab1
		setId("details");
	};
	const handleTab2 = () => {
		// update the state to tab2
		name && category && location && description && setId("requirements");
	};

	const handleCLick = () => {
		if (
			name &&
			category &&
			location &&
			description &&
			skills.length > 0 &&
			minimumPrice &&
			maximumPrice &&
			duration &&
			selectDuration
		) {
			setLoading(true);
			addService().then((res) => {
				setLoading(false);
				res.ok && navigate("/dashboard/browse/services");
			});
		}
	};

	return (
		<>
			<AdminNav fixTab={fixTab} setFixTab={setFixTab} />
			<div id="mike" className="grid lg:grid-cols-3">
				<div className="lg:col-span-2">
					<form
						onSubmit={(e) => e.preventDefault()}
						className="max-w-2xl mx-auto py-20  px-6"
					>
						<h1 className="text-3xl font-semibold border-b-4 border-primary-500 w-max pr-2">
							Create Service
						</h1>
						{id == "details" && (
							<section className="flex flex-col gap-10 pt-10 capitalize font-medium">
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Name of Service (required)
									</label>
									<input
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="border rounded-md p-2 valid:border-emerald-300"
										placeholder={"Ex: Maths Tutor"}
										required
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Category of Service (required)
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
										Select the category that is the closest match to the service
										you provide.
									</small>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Location of Service (required)
									</label>

									<div
										type="text"
										className="border rounded-md p-2 valid:border-emerald-300 cursor-pointer"
										required
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
									{showCategoryModal && (
										<PickCategory
											hide={() => setShowCategoryModal(false)}
											onPick={(cat) => setCategory(cat)} // callback called with the selected category
										/>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Tell us about the Service you render (required)
									</label>
									<textarea
										type="text"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="border h-32 rounded-md p-2 valid:border-emerald-300"
										placeholder={"Ex: John Doe"}
										required
									/>
								</div>
							</section>
						)}
						{id == "requirements" && (
							<section className="flex flex-col gap-10 pt-10 capitalize font-medium">
								<List
									title={"Skills Offered"}
									placeholder={"Ex: C++"}
									inp={skillsInput}
									setInp={setSkillsInput}
									oldVal={skills}
									setOldVal={setSkills}
									type={"skill"}
								/>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Price of Service (required)
									</label>
									<div className="flex border rounded-md overflow-clip">
										<input
											type="number"
											value={minimumPrice}
											onChange={(e) => setMinimumPrice(e.target.value)}
											className=" p-2 valid:border-emerald-300 w-full"
											placeholder={"Min Ex: 5000"}
											required
										/>
										<input
											type="number"
											value={maximumPrice}
											onChange={(e) => setMaximumPrice(e.target.value)}
											className=" p-2 border-l valid:border-emerald-300 w-full"
											placeholder={"Max Ex: 15000"}
											required
										/>
										<select
											value={methodOfPayment}
											onChange={(e) => setMethodOfPayment(e.target.value)}
											className="border-l px-2"
										>
											<option value="hourly">Hourly</option>
											<option value="fixed">Fixed</option>
										</select>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Duration of Service (required)
									</label>
									<div className="flex border rounded-md overflow-clip">
										<input
											type="number"
											value={duration}
											onChange={(e) => setDuration(e.target.value)}
											className=" p-2 valid:border-emerald-300 w-full"
											placeholder={"Ex: 14"}
											required
										/>
										<select
											value={selectDuration}
											onChange={(e) => setSelectDuration(e.target.value)}
											className="border-l px-2"
										>
											<option value="days">Days</option>
											<option value="weeks">Weeks</option>
											<option value="months">Months</option>
										</select>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Additional Files or Images (Optional)
									</label>
									<div className="border rounded py-14 flex-col flex items-center justify-center text-zinc-400 mt-4 relative">
										{files.length > 0 && (
											<ul className="text-zinc-700 list-disc">
												{files?.map((file) => (
													<li>{file.name}</li>
												))}
											</ul>
										)}
										{files.length == 0 && (
											<>
												<ArrowUpTrayIcon className="h-10 mb-5" />
												<p>Drag & Drop to Upload Document</p>
											</>
										)}
										<input
											type="file"
											accept="image/*"
											multiple
											onChange={(e) => setFiles([...e.target.files])}
											className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
										/>
									</div>
								</div>
							</section>
						)}
						<div className="py-10 flex gap-4">
							<Btn
								tp={id != "requirements" ? "button" : "submit"}
								type={2}
								onClick={() => (id == "details" ? handleTab2() : handleCLick())}
								text={id == "details" ? "Next" : "Create"}
							/>
							{id != "details" && (
								<button
									type="button"
									onClick={() => handleTab1()}
									className="px-4 py-2 text-primary-500 hover:bg-primary-100 rounded outline-none"
								>
									Back
								</button>
							)}
						</div>
					</form>
				</div>
				<div
					className={"hidden lg:block h-full w-full relative"}
					style={{
						background: `url('${img7}') fixed`,
						backgroundPosition: "right",
						backgroundSize: "contain",
						backgroundRepeat: "no-repeat",
					}}
				>
					<div className="absolute h-full w-full bg-black/30"></div>
				</div>
			</div>
			<ImageCropper />
		</>
	);
};

export default Post_service;
