import React, { useEffect, useState } from "react";
import "./Workers.css";
import FilterBar from "../../../components/dashboard/MobileFilterBar";
import ResultBar from "../../../components/dashboard/ResultBar";
import WorkerCard from "../../../components/dashboard/WorkerCard";
import { fetchData } from "../../../api/fetchData";
import Loader from "../../../components/MikesComponents/Loader";

const Workers = ({ showFilter, searchValue, filter, location }) => {
	const [workers, setWorkers] = useState(null);
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
			setLoading(true);
			fetchData(
				`/users/get-users?page=${page + 1}${filter}${
					searchValue ? "&search=" + searchValue : ""
				}${location ? `&city=${location.lga}&state=${location.state}` : ""}`
			).then((data) => {
				setPage(page + 1);
				setWorkers([...workers, ...data]);
				setLoading(false);
			});
		}
	}, [isAtBottom]);

	useEffect(() => {
		setPage(1);
		setLoading(true);
		fetchData(
			`/users/get-users?page=${page}${filter}${
				searchValue ? "&search=" + searchValue : ""
			}${location ? `&city=${location.lga}&state=${location.state}` : ""}`
		).then((workers) => {
			setLoading(false);
			setWorkers([...workers]);
		});
	}, [searchValue, filter,location]);

	return (
		<div className="browse__workers">
			<div className="browse__workers__container">
				{/* Mobile filter bar */}
				<FilterBar showFilter={showFilter} />

				{/* Result bar */}
				<ResultBar />

				<div className="workers__list">
					{workers?.map((worker) => (
						<>
							<WorkerCard worker={worker} />
						</>
					))}
					<Loader loading={loading} />
				</div>
			</div>
		</div>
	);
};

export default Workers;
