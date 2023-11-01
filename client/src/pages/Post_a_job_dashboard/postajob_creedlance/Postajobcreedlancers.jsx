import "./postajob_creedlancers.css";
import { useState, Fragment, useContext } from "react";
import hourlyBasis from "../../../assets/images/hourly-basis.png";
import mileStone from "../../../assets/images/mile-stone.png";
import { occupations } from "../../../../data/occupations";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import DropZone from "./DropZone";
import SkillList from "../../../components/common/SkillList";
import { AddJobContext } from "../../../contexts/AddJobContext";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import PickCategory from "../../../components/common/PickCategory";
import ImageCropper from "../../../components/MikesComponents/ImageCropper";

function Postajobcreedlancers() {
	const navigate = useNavigate();
	const {
		occupationValue,
		setOccupationValue,
		skillsets,
		setSkillsets,
		files,
		setFiles,
		paybasis,
		setPaybasis,
		jobTitle,
		setJobTitle,
		jobDescription,
		setJobDescription,
		category,
		setCategory,
	} = useContext(AddJobContext);

	const [skillsetInput, setSkillsetInput] = useState("");
	const [query, setQuery] = useState("");
	const [showCategoryModal, setShowCategoryModal] = useState(false);

	const filteredOccupations =
		query === ""
			? occupations
			: occupations.filter((occupation) =>
					occupation.occupation
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<>
   
			<section className="section-formpost">
				{/* <Nav className="nav-form" /> */}
				<div className="logo"></div>
				<br></br>
				<br></br>
				<div className="formpost-container">
					<div className="formpost-heading">
						<h4>Tell us how you need it done</h4>
						<p>
							Within minutes, you can contact skilled Creedlancers. View their
							profiles, ratings, and portfolios, as well as chat with them. Only
							pay the Creedlancers when you are completely satisfied with their
							work.
						</p>
					</div>

					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col gap-y-3 px-4 pt-7 lg:bg-[#f0f0f0] lg:rounded-xl lg:w-1/2 lg:mt-10 lg:shadow-xl lg:px-6"
					>
						<Link
							className="bg-[#daa520] flex items-center justify-center w-fit text-white border-none rounded-2xl p-1 pr-3 text-xs sm:text-sm	font-inter"
							to="/dashboard"
						>
							<ChevronLeftIcon className="w-6" />
							Back to dashboard
						</Link>
						{/* Form row */}
						<div className="flex flex-col gap-y-3 sm:flex-row sm:items-center gap-x-2 lg:gap-x-4">
							{/* form group */}
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
									Choose a name for your project*
								</label>
								<input
									style={{ border: "1px solid #cfd4da" }}
									type="text"
									placeholder="Creedlance"
									className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 placeholder:text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4"
									value={jobTitle}
									onChange={(e) => setJobTitle(e.target.value)}
									required
								/>
							</div>

							{/* form group */}
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
									Occupation*
								</label>
								<Combobox value={occupationValue} onChange={setOccupationValue}>
									<div className="relative mt-1">
										<div className="relative w-full cursor-default overflow-hidden rounded-[14px] bg-white text-left border-solid border border-[#e2e0e0]">
											<Combobox.Input
												placeholder="Occupation"
												style={{ text: "#7a8593" }}
												className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4 border-none"
												displayValue={(occupation) => occupation.occupation}
												onChange={(event) => setQuery(event.target.value)}
												required
											/>
											<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 bg-white border-none">
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
						</div>
						<div className="flex flex-col gap-y-2 flex-1">
							<label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
								Category*
							</label>
							<input
								style={{ border: "1px solid #cfd4da", cursor:'pointer'}}
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
								className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 placeholder:text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4"
							/>
							<small className="pl-2 text-xs text-zinc-500">
								Select the category that is the closest match to the job offer
							</small>
							{showCategoryModal && (
								<PickCategory
									hide={() => setShowCategoryModal(false)}
									onPick={(cat) => setCategory(cat)} // callback called with the selected category
								/>
							)}
						</div>
						{/* form group */}
						<div className="flex flex-col gap-y-2 w-full box-border lg:mt-1">
							<label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
								Tell us more about the project*
							</label>
							<textarea
								placeholder="Tell us more about the project"
								className="border-solid border-[1px] p-3 border-[#dfe1e4] rounded-[14px] lg:border-[1.7px] min-h-[100px] resize-none lg:p-4 font-inter"
								value={jobDescription}
								onChange={(e) => setJobDescription(e.target.value)}
								required
							/>
						</div>
						<DropZone
							value={files}
							setValue={setFiles}
							className="border-solid mt-2 border-[0.5px] border-[#dfe1e4] lg:border-[1.7px] rounded-[14px] min-h-[100px] grid place-content-center lg:min-h-[220px] bg-white"
						/>
						<SkillList
							type="skill"
							title={"Which skills are required?"}
							placeholder={"Ex: React, Photoshop, Illustrator"}
							inp={skillsetInput}
							setInp={setSkillsetInput}
							oldVal={skillsets}
							setOldVal={setSkillsets}
							className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm mt-3 -mb-1"
						/>
						<div className="pay-worker">
							<label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
								How do you want to pay your worker?*
							</label>
							<div className="pay">
								<div
									className="pay-basis"
									style={{
										backgroundColor: "#fff",
										border:
											paybasis === "hourly"
												? "2px solid goldenrod"
												: "2px solid transparent",
									}}
									onClick={() => setPaybasis("hourly")}
								>
									<img src={hourlyBasis} alt="Hourly Basis" />
									<div className="pay-container">
										<h6>Pay on an hourly basis</h6>
										<p>
											Hire on an hourly basis and pay only for hours worked.
											Best for one-off tasks.
										</p>
									</div>
								</div>
								<div
									className="pay-basis"
									style={{
										backgroundColor: "#fff",
										border:
											paybasis === "milestone"
												? "2px solid goldenrod"
												: "2px solid transparent",
									}}
									onClick={() => setPaybasis("milestone")}
								>
									<img src={mileStone} alt="Milestone" />
									<div className="pay-container">
										<h6>Pay per mile stone</h6>
										<p>
											Agree on a price and release payment per progress made.
											Best for ongoing projects.
										</p>
									</div>
								</div>
							</div>
						</div>

						<button
							onClick={() => {
								if (
									occupationValue &&
									skillsets.length > 0 &&
									paybasis &&
									jobTitle &&
									jobDescription
								) {
									navigate("/Postjob_creedlancers/final_step");
								} else {
								}
							}}
							className="bg-[#daa520] border-none py-3 w-full rounded-md text-white text-sm mt-3 lg:mt-8 lg:py-4 lg:text-base text-center lg:mb-8"
						>
							Next
						</button>
					</form>
				</div>
				<div className="postajob-footer">
					<div className="postajob-footer-job-container">
						<div className="postajob-footer-one">
							<p>© 2022 CreedLance® Global Inc.</p>
						</div>
						<div className="postajob-footer-two">
							<ul className="postajob-footer-nav">
								<a href="/">
									<li>Terms of Service</li>
								</a>
								|
								<a href="/">
									<li>Privacy Policy</li>
								</a>
								|
								<a href="/">
									<li>CA Notice at Collection</li>
								</a>
								|
								<a href="/">
									<li>Cookie Settings</li>
								</a>
								|
								<a href="/">
									<li>Accessibility</li>
								</a>
							</ul>
						</div>
					</div>
				</div>
			</section> <ImageCropper />
		</>
	);
}

export default Postajobcreedlancers;
