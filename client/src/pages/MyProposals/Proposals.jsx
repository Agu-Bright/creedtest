import React, { useState } from 'react'
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import ProposalsBody from "./Pages/ProposalsBody";

const Proposals = () => {
	const [fixTab, setFixTab] = useState(false);

	return (
		<>
		<AdminNav fixTab={fixTab} setFixTab={setFixTab} />
		<ProposalsBody />
		</>
	);
};

export default Proposals;
