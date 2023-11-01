import React, { useState, useEffect } from "react";
import "./DashboardBrowse.css";
import DashboardNav from "../../../components/dashboard_nav/dashboard_nav";
import BrowseBanner from "../../../components/dashboard/BrowseBanner";
import Projects from "./Projects";
import Filter from "./Filter";
import Workers from "./Workers";
import ProjectDetails from "./ProjectDetails";
import Proposals from "./Proposals";
import { AnimatePresence } from "framer-motion";
import Interviews from "./Interviews";
import useResize from "../../../hooks/useResize";
import PickLocation from "../../../components/common/PickLocation";
import BackToTop from "react-easy-back-to-top";
import ServicesContainer from "./ServicesContainer";
import { useParams } from "react-router-dom";
import { fetchData } from "../../../api/fetchData";

const DashboardBrowse = ({ page }) => {
	const [showFilter, setShowFilter] = useState(false);
	const [marginBottom, setMarginBottom] = useState("60px");
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const [fixTab, setFixTab] = useState(false);
	const [location, setLocation] = useState(null);
	const [showPickLocation, setShowPickLocation] = useState(false);
	const [hideNavbar, setHideNavbar] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [filter, setFilter] = useState("");

	useEffect(() => {
		if (showFilter && isMobile) {
			document.querySelector("html").classList.add("modal__open");
		} else {
			document.querySelector("html").classList.remove("modal__open");
		}
	}, [showFilter]);

	useEffect(() => {
		if (showPickLocation) {
			document.querySelector("html").classList.add("modal__open");
		} else {
			document.querySelector("html").classList.remove("modal__open");
		}
	}, [showPickLocation]);

	// detect screen size
	const handleResize = () => {
		if (window.innerWidth <= 450) {
			setMarginBottom("60px");
			setShowFilter(false);
			setIsMobile(true);
		} else if (window.innerWidth > 450 && window.innerWidth < 1024) {
			setShowFilter(false);
			setMarginBottom("0px");
			setIsMobile(true);
		} else {
			setIsMobile(false);
			setShowFilter(true);
			setMarginBottom("0px");
		}
	};

	useResize(handleResize);

	useEffect(() => {
		function toggleNavbar() {
			if (page === "project-details" || page === "proposals") {
				if (window.innerWidth <= 650) {
					setHideNavbar(true);
				} else {
					setHideNavbar(false);
				}
			} else {
				setHideNavbar(false);
			}
		}

		toggleNavbar();
	});

	// remove margin bottom when virtual keyboard appears
	useEffect(() => {
		if ("visualViewport" in window) {
			const VIEWPORT_VS_CLIENT_HEIGHT_RATIO = 0.75;
			window.visualViewport.addEventListener("resize", function (event) {
				if (
					(event.target.height * event.target.scale) / window.screen.height <
					VIEWPORT_VS_CLIENT_HEIGHT_RATIO
				) {
					setKeyboardVisible(true);
				} else setKeyboardVisible(false);
			});

			return () =>
				window.visualViewport.removeEventListener("resize", () => {});
		}
	}, []);

	const { id } = useParams();

	const [post, setPost] = useState(null);
	const [proposals, setProposals] = useState(null);
	proposals && console.log(proposals);

	useEffect(() => {
		if (id) {
			fetchData("/projects/get-a-post/" + id).then((data) =>
				setPost(data.post)
			);
			fetchData("/bid/" + id + "/get-project-proposals").then((data) =>
				setProposals(data.proposals)
			);
		}
	}, [id]);

	useEffect(() => {
		//get this proposal
		if (post?.acceptedPerson) {
			fetchData(
				`/bid/get-a-proposal/${post?.acceptedPerson}/${post?._id}`
			).then((data) => setProposals(data.proposal));
		}
	}, [post]);

	// remove or add marginBottom on scroll
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (typeof window !== undefined) {
				if (window.innerWidth <= 650) {
					if (window.scrollY > lastScrollY) {
						setMarginBottom("0px");
					} else {
						setMarginBottom("60px");
					}

					setLastScrollY(window.scrollY);
				}
			}
		});
		return () => window.removeEventListener("scroll", () => {});
	}, [lastScrollY]);

	const bannerTitle = () => {
		if (page === "workers") {
			return {
				bannerHeading: "Browse workers",
				searchPlaceholder: "Search for occupation",
				showTabsOnMobile: false,
				tabs: [
					{
						name: "Projects",
						route: "/dashboard/browse/projects",
					},
					{
						name: "Workers",
						route: "/dashboard/browse/workers",
					},
					{
						name: "Interviews",
						route: "/dashboard/browse/interviews",
					},
					{
						name: "Services",
						route: "/dashboard/browse/services",
					},
				],
			};
		} else if (page === "projects") {
			return {
				bannerHeading: "Browse projects",
				searchPlaceholder: "Search for Projects / Jobs",
				showTabsOnMobile: false,
				tabs: [
					{
						name: "Projects",
						route: "/dashboard/browse/projects",
					},
					{
						name: "Workers",
						route: "/dashboard/browse/workers",
					},
					{
						name: "Interviews",
						route: "/dashboard/browse/interviews",
					},
					{
						name: "Services",
						route: "/dashboard/browse/services",
					},
				],
			};
		} else if (page === "interviews") {
			return {
				bannerHeading: "Browse interviews",
				searchPlaceholder: "Search for Interviews",
				showTabsOnMobile: false,
				tabs: [
					{
						name: "Projects",
						route: "/dashboard/browse/projects",
					},
					{
						name: "Workers",
						route: "/dashboard/browse/workers",
					},
					{
						name: "Interviews",
						route: "/dashboard/browse/interviews",
					},
					{
						name: "Services",
						route: "/dashboard/browse/services",
					},
				],
			};
		} else if (page === "services") {
			return {
				bannerHeading: "Browse services",
				searchPlaceholder: "Search for Services",
				showTabsOnMobile: false,
				tabs: [
					{
						name: "Projects",
						route: "/dashboard/browse/projects",
					},
					{
						name: "Workers",
						route: "/dashboard/browse/workers",
					},
					{
						name: "Interviews",
						route: "/dashboard/browse/interviews",
					},
					{
						name: "Services",
						route: "/dashboard/browse/services",
					},
				],
			};
		} else if (page === "project-details") {
			return {
				bannerHeading: post?.title,

				searchPlaceholder: "",
				showTabsOnMobile: true, // shows tab on mobile if true
				tabs: [
					{
						name: "Details",
						route: "/dashboard/browse/projects",
						useId: true, // this uses id in the browser router for getting a single project
					},
					{
						name: "Proposals",
						route: "/dashboard/browse/projects/" + id + "/proposals",
					},
				],
			};
		} else if (page === "proposals") {
			return {
				bannerHeading: post?.title,
				searchPlaceholder: "",
				showTabsOnMobile: true, // shows tab on mobile if true
				tabs: [
					{
						name: "Details",
						route: "/dashboard/browse/projects",
						useId: true, //this uses id in the browser router for getting a single project
					},
					{
						name: "Proposals",
						route: "/dashboard/browse/projects/" + id + "/proposals",
					},
				],
			};
		}
	};

	//   console.log(bannerTitle().bannerHeading);
	page && console.log(page);

	return (
		<div className="dashboard__scroll__area">
			{showPickLocation && (
				<PickLocation
					onPick={setLocation}
					hide={() => setShowPickLocation(false)}
				/>
			)}

			<DashboardNav
				hideNavBar={hideNavbar}
				isSearchBar={page !== "project-details"}
				fixTab={fixTab}
				setFixTab={setFixTab}
				showFilter={() => setShowFilter(true)}
				showLocation={() => setShowPickLocation(true)}
			/>

			<BrowseBanner
				backIconRoute={
					page === "project-details" || page === "proposals"
						? "/dashboard/browse/projects"
						: null
				}
				hideNavBar={hideNavbar}
				tabs={bannerTitle().tabs}
				heading={bannerTitle().bannerHeading}
				placeholder={bannerTitle().searchPlaceholder}
				showTabsOnMobile={bannerTitle().showTabsOnMobile}
				showPickLocation={() => setShowPickLocation(true)}
				location={location}
				setLocation={setLocation}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				page={page}
				bool={post?.acceptedPerson}
				projectOwner={post?.createdBy}
			/>

			<div
				className="dashboard-image-background"
				style={{
					marginBottom,
				}}
			>
				<div className="dashboard-container-layout">
					{/* Filter */}
					<AnimatePresence key="w">
						{showFilter &&
						(page === "workers" ||
							page === "projects" ||
							page === "interviews" ||
							page === "services") ? (
							<Filter
								isKeyboardVisible={keyboardVisible}
								page={page}
								setFilter={setFilter}
								setFixTab={setFixTab}
								hide={() => setShowFilter(false)}
							/>
						) : null}
					</AnimatePresence>

					{/* components below changes based on the navigated page  */}

					{/* browse projects */}
					{page === "projects" && (
						<Projects
							searchValue={searchValue}
							filter={filter}
							location={location}
							showFilter={() => setShowFilter(true)}
						/>
					)}

					{/* browse workers */}
					{page === "workers" && (
						<Workers
							searchValue={searchValue}
							location={location}
							filter={filter}
							showFilter={() => setShowFilter(true)}
						/>
					)}

					{/* project details */}
					{page === "project-details" && post && (
						<ProjectDetails
							setFixTab={setFixTab}
							id={post?._id}
							expirationDate={post?.expirationDate}
							budget={post?.budget}
							title={post?.title}
							description={post?.description}
							skills={post?.skills}
							photos={post?.photos}
							createdBy={post?.createdBy}
							assigned={post?.acceptedPerson}
						/>
					)}

					{/* proposals */}
					{page === "proposals" && (
						<Proposals
							setFixTab={setFixTab}
							proposals={proposals}
							post={post}
						/>
					)}

					{/* interviews */}
					{page === "interviews" && (
						<Interviews
							searchValue={searchValue}
							showFilter={() => setShowFilter(true)}
							filter={filter}
              location={location}
              />
              )}

					{/* Services */}
					{page === "services" && (
            <ServicesContainer
            searchValue={searchValue}
            showFilter={() => setShowFilter(true)}
            filter={filter}
            location={location}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default DashboardBrowse;
