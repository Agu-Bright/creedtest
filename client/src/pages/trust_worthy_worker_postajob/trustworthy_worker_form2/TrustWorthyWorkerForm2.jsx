import "./trust_worthy_worker_form2.css";
import React from "react";
import StandardProject from "../../../assets/images/standard-project.png";
import Line from "../../../assets/images/line.png";
import Arrow from "../../../assets/images/arrow.png";

function TrustWorthyWorkerForm2() {
	return (
		<>
			<section className="section-formpost">
				<div className="logo"></div>
				<br></br>
				<br></br>
				<div className="formpost-container">
					<div className="formpost-heading">
						<h4>Step 2</h4>
						<p>You are one last step away from getting a trustworthy worker</p>
					</div>
					<form action="/" className="form">
						<div className="form-container">
							<div className="jobs-container">
								<div className="job-section-one">
									<label htmlFor="job-type">Job Type</label>

									<select name="job-type" id="job-type">
										<option value="job-type">Remote</option>
										<option value="job-type">Onsite</option>
										<option value="job-type">Hybrid</option>
									</select>
								</div>
								<div className="job-section-one">
									<label htmlFor="job-location">Job Location</label>

									<input
										type="text"
										name="job-location"
										id="job-location"
										placeholder="Pleasure Park, Port Harcourt, Rivers State"
									/>
								</div>
								<div className="job-section-one">
									<label htmlFor="budget">What's your budget?</label>

									<select name="budget" id="budget">
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
							</div>

							<div className="details-correct">
								<h3>Are these details correct?</h3>
								<div className="summary">
									<img src={StandardProject} alt="standard project" />
									<img src={Line} alt="vertical line" id="line" />
									<div className="project-summary">
										<h3>Creedlance</h3>
										<p>
											CreedLance is a kjlnd ln vlk lisnd in s nr dsnl ;sdm ihn
											;sodm insdmo;v ;ojf kf pvkf , ;oj lind om;gg ;msf
											liflm;pkg s kg omgf;s.
										</p>
										<div className="skills-required-container">
											<button>PHP</button>
											<button>Javascript</button>
											<button>Python</button>
											<button>CSS</button>
											<button>UI/UX</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>

					<a href="/receivedsuccessfully" className="btn-approve">
						Yes, submit my project.
					</a>
				</div>
			</section>
		</>
	);
}

export default TrustWorthyWorkerForm2;
