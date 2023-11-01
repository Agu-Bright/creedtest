import React, { useEffect } from "react";
import DashboardProgress from "../../../assets/Dashboard/progress_bar.png";
import X_icon from "../../../assets/Dashboard/X.png";
const DashboardAccprogressMobile = ({ user }) => {
	
	return (
		<div className="DasboardAcc_progress-mobile">
			<img className="Xicon" src={X_icon} alt="" srcset="" />
			<div className="DashboardAc_progress_container">
				<span>Finish setting up your account</span>
				<span>65% done</span>
				<span>
					only creedlancers with complete profiles will be shown on the browse
					workers page
				</span>
				<img className="dashboard-progress" src={DashboardProgress} alt="" />
				<a href="#">Go to profile</a>
			</div>
		</div>
	);
};

export default DashboardAccprogressMobile;
