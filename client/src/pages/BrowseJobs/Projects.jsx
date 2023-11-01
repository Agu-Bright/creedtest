import React, { useEffect, useState } from "react";
import "./Workers.css";
import FilterBar from "../../components/dashboard/MobileFilterBar";
import ResultBar from "../../components/dashboard/ResultBar";
import JobBoardJob from "./components/JobBoardJob";
import { fetchData } from "../../api/fetchData";
import Loader from "../../components/MikesComponents/Loader";

const Workers = ({
	showFilter,
	showAuthModal,
	searchValue,
	filter,
	location,
}) => {
	// dayjs.extend(relativeTime);

	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isAtBottom, setIsAtBottom] = useState(false);
	const [page, setPage] = useState(1);
	console.log("I am in the project page");

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
				`/projects/get-all-posts?page=${page + 1}${filter}${
					searchValue ? "&search=" + searchValue : ""
				}${
					location ? "&jobLocation=" + `${location.lga}, ${location.state}` : ""
				}`
			).then((data) => {
				setPage(page + 1);
				setPosts([...posts, ...data.posts.reverse()]);
				setLoading(false);
			});
		}
	}, [isAtBottom]);

	useEffect(() => {
		setPage(1);

		setLoading(true);
		fetchData(
			`/projects/get-all-posts?page=${page}${filter}${
				searchValue ? "&search=" + searchValue : ""
			}${
				location ? "&jobLocation=" + `${location.lga}, ${location.state}` : ""
			}`
		).then((data) => {
			setPosts([...data.posts.reverse()]);
			setLoading(false);
		});
	}, [searchValue, filter, location]);
	return (
		<div className="browse__workers">
			<div className="browse__workers__container">
				{/* Mobile filter bar */}
				<FilterBar showFilter={showFilter} />

				{/* Result bar */}
				<ResultBar />

				<div className="workers__list">
					{posts?.map((post) => (
						<JobBoardJob post={post} showAuthModal={showAuthModal} />
					))}
					<Loader loading={loading} />
				</div>
			</div>
		</div>
	);
};

export default Workers;
