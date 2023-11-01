import "./postajob_creedlancers2.css";
import React, { useContext, useEffect, useState } from "react";
import StandardProject from "../../../assets/images/standard-project.png";
import recruiterProject from "../../../assets/images/recruiter-project.png";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { AddJobContext } from "../../../contexts/AddJobContext";
import PickLocation from "../../../components/common/PickLocation";

function Postajobcreedlancers2() {
	const navigate = useNavigate();
	const [showLocationPicker, setShowLocationPicker] = useState(false);

	useEffect(() => {
		if (showLocationPicker) {
			document.querySelector("html").classList.add("modal__open");
		} else {
			document.querySelector("html").classList.remove("modal__open");
		}
	}, [showLocationPicker]);

	const {
		bidding,
		setBidding,
		jobType,
		setJobType,
		jobLocation,
		setJobLocation,
		jobBudget,
		setJobBudget,
		jobTitle,
	} = useContext(AddJobContext);

	useEffect(() => {
		!jobTitle && navigate("/Postjob_creedlancers");
	}, []);

	return (
		<>
			<section className="section-formpost">
				{/* <Nav className="nav-form" /> */}
				<div className="logo"></div>
				<br></br>
				<br></br>
				<div className="formpost-container">
					<div className="formpost-heading">
						<h4>Step 2</h4>
						<p>
							You are one step away from getting bids from workers and
							Enterprises
						</p>
					</div>

					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col gap-y-3 px-4 pt-7 lg:bg-[#f0f0f0] lg:rounded-xl lg:w-1/2 lg:mt-10 lg:shadow-xl lg:px-6"
					>
						<Link
							className="bg-[#daa520] flex items-center justify-center w-fit text-white border-none rounded-2xl p-1 pr-3 text-xs sm:text-sm	font-inter"
							to="/Postjob_creedlancers"
						>
							<ChevronLeftIcon className="w-6" />
							Go back
						</Link>
						{/* Form row */}
						<div className="flex flex-col gap-y-3 sm:flex-row sm:items-center gap-x-2 lg:gap-x-4">
							{/* form group */}
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
									Job Type*
								</label>
								<select
									style={{ border: "1px solid #cfd4da" }}
									className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
									defaultValue="remote"
									value={jobType}
									onChange={(e) => setJobType(e.target.value)}
									required
								>
									<option hidden selected>
										select
									</option>
									<option value="remote">Remote</option>
									<option value="onsite">Onsite</option>
									<option value="hybrid">Hybrid</option>
								</select>
							</div>

							{/* form group */}
							<div className="flex flex-col gap-y-2 flex-1">
								<label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
									Job Location*
								</label>
								<input
									style={{ border: "1px solid #cfd4da" }}
									type="text"
									readOnly
									placeholder="Port Harcout, River State"
									className="border border-gray-200 border-inherit rounded-[14px] text-sm p-3 placeholder:text-[#7a8593] focus:outline-yellow-400 focus:outline w-full box-border lg:p-4"
									required
									value={
										jobLocation
											? `${jobLocation?.lga}, ${jobLocation.state}`
											: ""
									}
									onFocus={() => setShowLocationPicker(true)}
									onChange={(e) => setJobLocation(e.target.value)}
								/>
							</div>
						</div>
						{/* form group */}
						<div className="flex flex-col gap-y-2 flex-1">
							<label className="text-[#2D3748] font-inter text-xs pl-2 lg:text-sm">
								What's your budget?*
							</label>
							<select
								style={{ border: "1px solid #cfd4da" }}
								className="block px-4 border border-gray-300 focus:outline-none focus:border-blue-500 bg-white border-#E2E8F0] text-[#7a8593] rounded-xl py-[0.85rem] w-full box-border lg:p-[1.1rem]"
								required
								value={jobBudget}
								onChange={(e) => setJobBudget(e.target.value)}
							>
								<option hidden selected>
									select
								</option>
								<option value="5k - 10k (Micro-task)">
									5k - 10k (Micro-task){" "}
								</option>
								<option value="10k - 20k (Micro-project)">
									10k - 20k (Micro-project)
								</option>
								<option value="20k - 50k (Small-scale-task)">
									20k - 50k (Small-scale-task)
								</option>
								<option value="50k - 100k (Small-scale-project)">
									50k - 100k (Small-scale-project)
								</option>
								<option value="100k - 200k (Medium-project)">
									100k - 200k (Medium-project)
								</option>
								<option value="200k - 500k (Large-project)">
									200k - 500k (Large-project)
								</option>
								<option value="500k - 1M (Larger-project)">
									500k - 1M (Larger-project)
								</option>
								<option value="1M - 5M (Very-large-project)">
									1M - 5M (Very-large-project)
								</option>
								<option value="5M - 10M (Platinum-Project)">
									5M - 10M (Platinum-Project)
								</option>
								<option value="10M and above (Diamond-project)">
									10M and above (Diamond-project)
								</option>
							</select>
						</div>

						<div className="pay-worker">
							<label className="text-[#2D3748] font-inter text-xs lg:pl-2 lg:text-sm">
								What type of project are you posting*
							</label>
							<div className="pay">
								<div
									className="pay-basis"
									style={{
										backgroundColor: "#fff",
										border:
											bidding === "public"
												? "2px solid goldenrod"
												: "2px solid transparent",
									}}
									onClick={() => setBidding("public")}
								>
									<img src={StandardProject} alt="Public-Biding" />
									<div className="pay-container">
										<h6>Public-Biding</h6>
										<p>
											A Public Bid project will allow, creedlancers to see each
											others bid and proposals, which may encourage competition
											and lower prices
										</p>
									</div>
								</div>
								<div
									className="pay-basis"
									style={{
										backgroundColor: "#fff",
										border:
											bidding === "private"
												? "2px solid goldenrod"
												: "2px solid transparent",
									}}
									onClick={() => setBidding("private")}
								>
									<img src={recruiterProject} alt="Milestone" />
									<div className="pay-container">
										<h6>Private-Biding</h6>
										<p>
											A Private Bid will disable Creedlancers from seeing each
											others bid. Which means each worker will bargain a price
											he/she feels is conduscive for the project
										</p>
									</div>
								</div>
							</div>
						</div>

						<button
							onClick={() => {
								if (jobType && jobLocation && jobBudget && bidding) {
									navigate("/job/preview");
								}
							}}
							className="bg-[#daa520] border-none py-3 w-full rounded-md text-white text-sm mt-3 lg:mt-8 lg:py-4 lg:text-base text-center lg:mb-8"
						>
							Preview post
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
			</section>
			{showLocationPicker && (
				<PickLocation
					hide={() => setShowLocationPicker(false)}
					onPick={setJobLocation}
				/>
			)}
		</>
	);
}

export default Postajobcreedlancers2;
