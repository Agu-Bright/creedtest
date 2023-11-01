import React, { useState } from 'react'
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import SettingsBody from './Settings/SettingsBody'


const Settings = () => {
	const [fixTab, setFixTab] = useState(false);

	return (
		<>
		<AdminNav fixTab={fixTab} setFixTab={setFixTab} />
		<SettingsBody />
		</>
	);
};

export default Settings;
