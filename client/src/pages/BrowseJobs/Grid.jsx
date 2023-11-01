import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

import service_data from "../../assets/data/ServicesData";
// import { GridChild } from "./GridChild";
import Service from "./Service";
import { fetchData } from "../../api/fetchData";
import Loader from "../../components/MikesComponents/Loader";

export const Grid = ({
	showFilter,
	searchValue,
	showAuthModal,
	filter,
	location,
}) => {
	const [services, setServices] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isAtBottom, setIsAtBottom] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.body;
			const bottomThreshold = scrollHeight - clientHeight - 1;
			setIsAtBottom(scrollTop >= bottomThreshold - 10);
		};
		const handleScrollMobile = () => {
			const { scrollTop, scrollHeight, clientHeight } =
				document.documentElement;
			const bottomThreshold = scrollHeight - clientHeight - 1;
			setIsAtBottom(scrollTop >= bottomThreshold - 10);
		};

		document.body.addEventListener("scroll", handleScroll);
		window.addEventListener("scroll", handleScrollMobile);

		return () => {
			document.body.removeEventListener("scroll", handleScroll);
			window.removeEventListener("scroll", handleScrollMobile);
		};
	}, []);

	useEffect(() => {
		if (isAtBottom) {
			console.log(page);
			setLoading(true);
			fetchData(
				`/services/get-all-services/?page=${page + 1}${filter}${
					searchValue ? "&search=" + searchValue : ""
				}${location ? "&location=" + `${location.lga}, ${location.state}` : ""}`
			).then((data) => {
				setPage(page + 1);
				setServices([...services, ...data.services.reverse()]);
				setLoading(false);
			});
		}
	}, [isAtBottom]);
	useEffect(() => {
		setPage(1);
		setLoading(true);
		fetchData(
			`/services/get-all-services?page=${page}${filter}${
				searchValue ? "&search=" + searchValue : ""
			}${location ? "&location=" + `${location.lga}, ${location.state}` : ""}`
		).then((data) => {
			setLoading(false);
			setServices(data.services);
		});
	}, [searchValue, filter, location]);
	return (
		<Fragment>
			<Container>
				{services?.map((service) => (
					// <GridChild key={key} obj={obj} />
					<Service
						key={service?._id}
						showAuthModal={showAuthModal}
						service={service}
					/>
				))}
				<div className="col-span-2">
					<Loader loading={loading} />
				</div>
			</Container>
		</Fragment>
	);
};

const Container = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 0 0.8em;
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	width: 100%;

	@media screen and (max-width: 1050px) {
		grid-template-columns: 1fr;
		padding: 0 0.7rem;
		grid-gap: 0 !important;
	}
	@media screen and (max-width: 470px) {
		margin-left: 0;
		margin-right: 0;
		padding: 0;
	}
	@media screen and (max-width: 400px) {
		margin-left: 0.2em;
		margin-right: 0.2em;
		grid-template-columns: 1fr;
	}
	@media screen and (max-width: 320px) {
		grid-template-columns: 1fr;
	}
`;
