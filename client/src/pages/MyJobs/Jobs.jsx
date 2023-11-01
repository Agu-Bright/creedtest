import React, { useState } from 'react'
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import JobsBody from "./Pages/JobsBody";

const Jobs = () => {
	const [fixTab, setFixTab] = useState(false)

	return (
		<>
		<AdminNav
			fixTab={fixTab}
			setFixTab={setFixTab}
		/>
		<JobsBody />
		</>
	);
};

export default Jobs;
