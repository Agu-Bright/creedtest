import React, { useEffect, useState } from "react";
import "./Interview2.css";
import { Link, useParams } from "react-router-dom";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import Profile_pic from "./../../assets/browse-service/Rectangle-501.png";
import int_img1 from "./../../assets/browse-service/Rectangle-522.png";
import int_img2 from "./../../assets/browse-service/Rectangle-521.png";
import int_img3 from "./../../assets/browse-service/Rectangle-520.png";
import dayjs from "dayjs";

import { fetchData } from "../../api/fetchData.js";

function Interview2() {
	const [fixTab, setFixTab] = useState(false);
	const { id } = useParams();
	const [interview, setInterview] = useState(null);

	useEffect(() => {
		id
			? fetchData("/interviews/get-interview/" + id).then((data) =>
					setInterview(data.interview)
			  )
			: "";
	}, [id]);
	return (
		<>
			<AdminNav fixTab={fixTab} setFixTab={setFixTab} />
			<div className="interview-details-container1">
				<div className="int_profile-section">
					<h1 className="heading">{interview?.title}</h1>
					<Link to={"/application/" + interview?._id}>
						<button className="Apply-button">Apply</button>
					</Link>
					<p>
						{interview?.location} ({interview?.natureOfInterview}){" "}
						{interview?.numberOfVacancies} Applicants
					</p>
					<div className="int-flex">
						<img className="object-cover" src={interview?.createdBy?.photo?.url}></img>
						<div className="int-txt-part">
							<div className="time_and_range">
								<div className="time">
									{dayjs(interview?.date).format("DD/MM/YYYY")}
								</div>
								<div className="range">{interview?.budget}</div>
							</div>
							<div className="icon-text-cont">
								<i class="fa fa-suitcase">
									<b className="icon-text">{interview?.natureOfInterview}</b>
								</i>
							</div>
							<div className="icon-text-cont">
								<i class="fa fa-archive">
									<b className="icon-text">
										{" "}
										{interview?.numberOfVacancies} Open position
									</b>
								</i>
							</div>
						</div>
					</div>
					<div className="btn-flex">
						<button className="follow-btn">
							Follow <i class="fa fa-plus" aria-hidden="true"></i>
						</button>
						<Link to={"/profile/worker"}>
							<button className="View-profile">
								View profile <i class="fa fa-user" aria-hidden="true"></i>
							</button>
						</Link>
					</div>
					<br></br>
				</div>

				<div className="about-the-company">
					<h2>About the company</h2>
					<p>{interview?.companyDescription}</p>
				</div>

				<div className="Job-responsibilities">
					<h2>Job Responsibilities</h2>
					{interview?.jobResponsibilities.map((responsibility) => (
						<li>{responsibility}</li>
					))}
				</div>
				<div className="Job-responsibilities">
					<h2>Job Requirements</h2>
					{interview?.jobRequirements.map((requirement) => (
						<li>{requirement}</li>
					))}
				</div>

				<div className="img-container">
					{interview?.photos?.map((photo) => (
						<img className="aspect-square object-contain bg-zinc-500/50" src={photo.url}></img>
					))}
				</div>
				<br></br>
			</div>
		</>
	);
}

export default Interview2;
