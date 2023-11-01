import { Fragment, useContext, useEffect, useState } from "react";
import { ArrowUpTrayIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import Btn from "../../components/MikesComponents/Btn";
import List from "../../components/MikesComponents/List";
import { img5 } from "../../assets/mike";
import PickLocation from "../../components/common/PickLocation";
import PickCategory from "../../components/common/PickCategory";
import { postData } from "../../api/postData";
import { LoaderContext } from "../../contexts/LoaderContext";
// import { LocationContext } from "../../provider/Location";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { occupations } from "../../../data/occupations";
import { AnnouncementContext } from "../../contexts/AnnouncementContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ImageContext } from "../../contexts/ImageContext";
import ImageCropper from "../../components/MikesComponents/ImageCropper";
import { JobPostContext } from "../../contexts/JobPostContext";
import { ModalContext } from "../../contexts/ModalContext";

const CreateInterview = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { showCropper, croppedImages, cropDone } = useContext(ImageContext);
	const { createPost } = useContext(JobPostContext);
	const { showModal } = useContext(ModalContext);

	const [fixTab, setFixTab] = useState(false);
	const [title, setTitle] = useState();
	const [occupationValue, setOccupationValue] = useState();
	const [natureOfInterview, setNatureOfInterview] = useState();
	const [category, setCategory] = useState();
	const [opts, setOpts] = useState([]);
	const [numberOfVacancies, setNumberOfVacancies] = useState(opts[0]);
	const [budget, setBudget] = useState();
	const [files, setFiles] = useState([]);
	const [uploadableFiles, setUploadableFiles] = useState([]);
	const [date, setDate] = useState();
	const [companyDescription, setCompanyDescription] = useState();
	const [locationState, setLocationState] = useState();
	const [responsibilities, setResponsibilities] = useState([]);
	const [responsibilitiesInput, setResponsibilitiesInput] = useState();
	const [requirements, setRequirements] = useState([]);
	const [requirementsInput, setRequirementsInput] = useState();
	const [skills, setSkills] = useState([]);
	const [skillsInput, setSkillsInput] = useState();
	const [display, setDisplay] = useState(false);
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const { setLoading } = useContext(LoaderContext);
	const { checkAnnouncement } = useContext(AnnouncementContext);
	const [maxDate, setMaxDate] = useState(null);
	const [minDate, setMinDate] = useState(null);

	const [query, setQuery] = useState("");

	const filteredOccupations =
		query === ""
			? occupations
			: occupations.filter((occupation) =>
					occupation.occupation
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	useEffect(() => {
		let arr = ["0-1", "2-5"];
		for (let i = 1; i < 20; i++) {
			arr.push(i * 5 + "-" + (i + 1) * 5);
		}
		arr.push("100+");
		setOpts([...arr]);
	}, []);

	useEffect(() => {
		setUploadableFiles([]);
		const images = files;
		images.length > 0 && showCropper(images);
	}, [files]);
	useEffect(() => {
		if (cropDone) {
			setUploadableFiles([...croppedImages]);
		}
	}, [cropDone]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleCLick = () => {
		if (
			title &&
			locationState?.lga &&
			category.category &&
			natureOfInterview &&
			numberOfVacancies &&
			date &&
			companyDescription &&
			responsibilities.length > 0 &&
			occupationValue &&
			requirements.length > 0 &&
			skills.length > 0 &&
			id == "requirements"
		) {
			const data = {
				title,
				location: `${locationState?.lga}, ${locationState.state}`,
				natureOfInterview,
				numberOfVacancies,
				budget,
				jobOccupation: occupationValue.occupation,
				date,
				photos: uploadableFiles,
				companyDescription,
				jobResponsibilities: responsibilities,
				jobRequirements: requirements,
				requiredSkills: skills,
				category: category.category,
				subcategory: category.subCategory,
			};
			createPost(data, "interview");
			navigate("/posted/interviews");
			// if (res.ok) {
			// 	checkAnnouncement("interview");
			// }
		} else {
			showModal("Please fill in all required fields", false);
		}
	};

	const calculateMaxDate = () => {
		const currentDate = new Date();
		const nextFiveDays = new Date();
		const nextTwoDays = new Date();
		nextFiveDays.setDate(currentDate.getDate() + 10);
		nextTwoDays.setDate(currentDate.getDate() + 2);

		// Convert the nextFiveDays date to a string in the "YYYY-MM-DD" format
		const formattedMaxDate = nextFiveDays.toISOString().split("T")[0];
		const formattedMinDate = nextTwoDays.toISOString().split("T")[0];

		// Set the max date in the state
		setMaxDate(formattedMaxDate);
		setMinDate(formattedMinDate);
	};
	useEffect(() => {
		id == "requirements" && !title ? navigate("/create/interview/details") : "";

		calculateMaxDate();
	}, []);
	return (
		<>
			<AdminNav fixTab={fixTab} setFixTab={setFixTab} />
			<div id="mike" className="grid lg:grid-cols-3">
				<div className="lg:col-span-2">
					<form
						onSubmit={(e) => handleSubmit(e)}
						className="max-w-2xl mx-auto py-20  px-6"
					>
						<h1 className="text-3xl font-semibold border-b-4 border-primary-500 w-max pr-2">
							Create Interview
						</h1>
						{id == "details" && (
							<section className="flex flex-col gap-10 pt-10 capitalize font-medium">
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Title of the Interview (required)
									</label>
									<input
										type="text"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className="border rounded-md p-2 valid:border-emerald-300"
										placeholder={"Ex: Maths Expert Needed"}
										required
									/>
								</div>{" "}
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Interview Occupation (required)
									</label>

									<Combobox
										value={occupationValue}
										onChange={setOccupationValue}
									>
										<div className="relative mt-1">
											<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-100 sm:text-sm border">
												<Combobox.Input
													className="border border-gray-200 border-inherit rounded-[14px] text-sm p-2 placeholder:text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border"
													displayValue={(occupation) => occupation.occupation}
													onChange={(event) => setQuery(event.target.value)}
													placeholder="Ex: Teacher"
													required
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
																					active
																						? "text-white"
																						: "text-primary-500"
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
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Category of Interview (required)
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
										placeholder={"Ex: Education"}
										required
										className="border rounded-md p-2 valid:border-emerald-300 cursor-pointer"
									/>
									<small className="pl-2 text-xs text-zinc-500">
										Select the category that is the closest match to the job
										position.
									</small>
									{showCategoryModal && (
										<PickCategory
											hide={() => setShowCategoryModal(false)}
											onPick={(cat) => setCategory(cat)} // callback called with the selected category
										/>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Interview Location (required)
									</label>

									<div
										type="text"
										className="border rounded-md p-2 valid:border-emerald-300 cursor-pointer"
										required
										onClick={() => setDisplay(true)}
									>
										{locationState?.lga ? (
											`${locationState?.lga}, ${locationState?.state}`
										) : (
											<p className="text-zinc-400">Ex: Lagos</p>
										)}
									</div>
									{display && (
										<PickLocation
											onPick={setLocationState}
											hide={() => setDisplay(false)}
											setDisp={setDisplay}
										/>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Nature of Interview (required)
									</label>
									<select
										type="text"
										value={natureOfInterview}
										onChange={(e) => setNatureOfInterview(e.target.value)}
										className="border rounded-md p-2"
										required
									>
										<option selected disabled hidden>
											Select
										</option>
										<option value="on site">On Site</option>
										<option value="remote">Remote</option>
									</select>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Number of Vacancies (required)
									</label>
									<select
										value={numberOfVacancies}
										onChange={(e) => setNumberOfVacancies(e.target.value)}
										className="border rounded-md p-2"
										required
									>
										<option selected disabled hidden>
											Select
										</option>
										{opts.map((opt) => (
											<option value={opt}>{opt}</option>
										))}
									</select>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Budget (required)
									</label>
									<select
										value={budget}
										onChange={(e) => setBudget(e.target.value)}
										className="border rounded-md p-2"
										required
									>
										<option selected disabled hidden>
											Select
										</option>
										<option value="₦5k - ₦10k">₦5k - ₦10k</option>
										<option value="₦10k - ₦20k">₦10k - ₦20k</option>
										<option value="₦20k - ₦50k">₦20k - ₦50k</option>
										<option value="₦50k - ₦100k">₦50k - ₦100k</option>
										<option value="₦100k - ₦200k">₦100k - ₦200k</option>
										<option value="₦200k - ₦500k">₦200k - ₦500k</option>
										<option value="₦500k - ₦1M">₦500k - ₦1M</option>
										<option value="₦1M - ₦5M">₦1M - ₦5M</option>
										<option value="₦5M - ₦10M">₦5M - ₦10M</option>
										<option value="₦10M and above">₦10M and above</option>
									</select>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Date of Interview (required)
									</label>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											minDate={dayjs(minDate)}
											maxDate={dayjs(maxDate)}
											value={date}
											onChange={(newVal) => setDate(newVal)}
											className="border rounded-md p-2 valid:border-emerald-300"
										/>
									</LocalizationProvider>
									{/* {minDate && (
                    className="border rounded-md p-2 valid:border-emerald-300"
                    placeholder={"Ex: 2/2/23"}
                    <input
                      type="date"
                      value={date}
                      min={minDate}
                      max={maxDate}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  )} */}
								</div>
							</section>
						)}
						{id == "requirements" && (
							<section className="flex flex-col gap-10 pt-10 capitalize font-medium">
								<div className="flex flex-col gap-2">
									<label htmlFor="" className="text-base">
										Tell us about your company / job (required)
									</label>
									<textarea
										type="text"
										value={companyDescription}
										onChange={(e) => setCompanyDescription(e.target.value)}
										className="border h-32 rounded-md p-2 valid:border-emerald-300"
										placeholder={"Ex: John Doe"}
										required
									/>
								</div>
								<List
									title={"Job Responsibilities"}
									placeholder={"Ex: Write out algorithms and use cases"}
									inp={responsibilitiesInput}
									setInp={setResponsibilitiesInput}
									oldVal={responsibilities}
									setOldVal={setResponsibilities}
								/>
								<List
									title={"Job Requirements"}
									placeholder={"Ex: BSc in Mathematics"}
									inp={requirementsInput}
									setInp={setRequirementsInput}
									oldVal={requirements}
									setOldVal={setRequirements}
								/>
								<List
									title={"Skills Required"}
									placeholder={"Ex: C++"}
									inp={skillsInput}
									setInp={setSkillsInput}
									oldVal={skills}
									setOldVal={setSkills}
									type={"skill"}
								/>
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
								tp={id != "details" ? "button" : "submit"}
								type={2}
								onClick={() => {
									let check =
										title &&
										locationState.lga &&
										category.category &&
										budget &&
										natureOfInterview &&
										numberOfVacancies &&
										occupationValue &&
										date;

									check && id == "details"
										? navigate("/create/interview/requirements")
										: handleCLick();

									!check &&
										showModal("Please fill in all required fields", false);
								}}
								text={id == "details" ? "Next" : "Create"}
							/>
							{id != "details" && (
								<button
									type="button"
									onClick={() => navigate("/create/interview/details")}
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
						background: `url('${img5}') fixed`,
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

export default CreateInterview;
