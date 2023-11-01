import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import Details from "./components/Details";
import Contact from "./components/Contact";
import Footer from "../../components/Footer/Footer";
import Profile from "./components/Profile";
import { UserDataContext } from "../../contexts/UserDataContext";
import { fetchData } from "../../api/fetchData";
import { useParams } from "react-router-dom";

const ServiceInfo = () => {
	const { userData } = useContext(UserDataContext);
	const { id } = useParams();

	const [service, setService] = useState(null);

	useEffect(() => {
		fetchData(`/services/${id}/get-a-service`).then(data=>setService(data.service));
	},[id]);

	return (
		<div className="w-full box-border bg-[#EBF2F7] min-h-screen">
			{userData && <AdminNav />}
			{!userData && <Nav />}
			<div className="pt-[60px] xsl:pt-0 lg:pt-[60px]">
				<div className="lg:grid lg:grid-cols-4 lg:w-[95%] xl:w-[90%] max-w-[1300px] mx-auto lg:gap-x-4">
					{/* Left */}
					<div className="col-span-3">
						<Details service={service} />
					</div>
					{/* right */}
					<div className="flex flex-col gap-y-4">
						<Profile service={service} />
						<Contact service={service} />
					</div>
				</div>
			</div>
			<div className="h-14"></div>
			{/* <Footer /> */}
		</div>
	);
};

export default ServiceInfo;
