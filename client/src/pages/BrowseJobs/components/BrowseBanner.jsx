import React, { useState, useEffect } from "react";
import "./BrowseBanner.css";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useDebounce from "../../../hooks/useDebounce";

const BrowseBanner = ({
	tabs,
	heading,
	placeholder,
	backIconRoute,
	searchValue,
	setSearchValue,
	showTabsOnMobile = false,
	showPickLocation,
	hideNavBar = false,
	location,
	setLocation,
}) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(false);
	const [showTabs, setShowTabs] = useState(false);
	const [arrowVisible, setArrowVisible] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	// margin top on mobile (to push it below the top navbar)
	const [marginTop, setMarginTop] = useState("0px");
	const margin = useDebounce(marginTop, 300);

	// detect screen size
	// const handleResize = () => {
	//   if(window.innerWidth <= 450) {
	//     setShowTabs(false);
	//     setIsMobile(true);
	//     setArrowVisible(true)
	//     setMarginTop(hideNavBar ? '30px' : '80px')
	//   }else if (window.innerWidth > 450 && window.innerWidth < 765) {
	//     setMarginTop('10px')
	//     setShowTabs(false);
	//     setIsMobile(true);
	//     setArrowVisible(true)
	//   } else if (window.innerWidth >= 765 && window.innerWidth < 1024) {
	//     setArrowVisible(true)
	//     setMarginTop('20px')
	//   }else {
	//       setMarginTop('0px')
	//       setShowTabs(true)
	//       setIsMobile(false);
	//       setArrowVisible(false)
	//   }
	// }

	// useEffect(() => {
	//   handleResize();

	//   window.addEventListener("resize", handleResize)

	//   return () => window.removeEventListener("resize", handleResize)
	// }, [hideNavBar])

	// useEffect(() => {
	//   if(window.innerWidth <= 450 || hideNavBar) {
	//     setMarginTop('30px')
	//   }
	// }, [hideNavBar])

	// useEffect(() => {
	//   window.addEventListener('scroll', () => {
	//     if(typeof window !== undefined) {
	//       if(window.innerWidth <= 450) {
	//         if(window.scrollY > 30 && window.scrollY > lastScrollY) {
	//           setMarginTop('0px')
	//         }else{
	//           setMarginTop('80px')
	//         }

	//         setLastScrollY(window.scrollY)
	//       }
	//     }
	//   })
	//   return () => window.removeEventListener('scroll', () => {})
	// }, [lastScrollY])

	let activeStyle = {
		color: "#455A64",
		backgroundColor: "#F6E9CB",
		borderRadius: "10px 10px 0px 0px",
	};

	return (
		<div
			className="browse-banner"
			style={{
				paddingTop: margin,
			}}
		>
			<div className="top">
				{/* navigate back on mobile */}
				{arrowVisible && heading !== "Browse projects" ? (
					<ArrowBackIcon
						onClick={() =>
							backIconRoute ? navigate(backIconRoute) : navigate(-1)
						}
					/>
				) : null}

				<h1
					style={{
						marginTop: !placeholder && !isMobile && "6%",
						color: "transparent",
					}}
					className="hidden md:inline-flex"
				>
					{"Yeah"}
				</h1>

				{/* Search */}
				{placeholder && (
					<form className="search" onSubmit={(e) => e.preventDefault()}>
						<div className="search__bar">
							<SearchIcon />
							<input
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								type="text"
								placeholder={placeholder}
							/>
						</div>
						<button className="search__btn" onClick={showPickLocation}>
							Select location
							<MyLocationIcon />
						</button>
					</form>
				)}
					{location && (
					<p className="text-white font-medium">
						Showing results from {location.lga + ", " + location.state} <span className="text-primary-500 cursor-pointer mr-2 underline text-sm" onClick={()=>{setLocation(null)}}>Clear</span>
					</p>
				)}
			</div>
			{(showTabs || showTabsOnMobile) && (
				<div className="bottom">
					{/* <NavLink
            end 
            to={`/dashboard/browse;projects/12/proposals`}
            style={({ isActive }) => isActive ? activeStyle : undefined}
          >
            proposal
          </NavLink> */}
					{tabs?.map((tab, i) => (
						<NavLink
							key={i}
							end
							to={tab.useId ? `${tab.route}/${id}` : `${tab.route}`}
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							{tab.name}
						</NavLink>
					))}
				</div>
			)}
		</div>
	);
};

export default BrowseBanner;
