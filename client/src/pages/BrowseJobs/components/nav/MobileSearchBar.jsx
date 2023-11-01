import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useNavigate } from "react-router-dom";

const MobileSearchBar = ({ showFilter, showLocation }) => {
	const navigate = useNavigate();

	return (
		<Container
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					duration: 0.1,
					type: "none",
				},
			}}
			exit={{
				// y: "-90%",
				opacity: 0,
				transition: {
					duration: 0.3,
					type: "none",
				},
			}}
		>
			<ArrowBackIosNewOutlinedIcon onClick={() => navigate(-1)} />
			<a href="#" className="w-full">
				<input type="search" placeholder="Search" />
			</a>
			<TuneIcon onClick={showFilter} />
			<MyLocationIcon onClick={showLocation} />
		</Container>
	);
};

export default MobileSearchBar;

const Container = styled(motion.div)`
	height: 60px;
	display: flex;
	align-items: center;
	background-color: #000;
	z-index: 10;
	position: fixed;
	padding: 0 2%;
	gap: 0.7rem;
	width: auto;
	max-width: 100vw;
	margin: 0;
	inset: 0;

	.MuiSvgIcon-root {
		color: white;
		font-size: 1.3em;
		margin: 0;
	}

	input {
		flex: 1;
		background-color: #f9f9f9;
		border: none;
		height: 63%;
		padding: 0.7rem;
		border-radius: 4px;
		margin: 0;
		font-family: inter;
		width: 100%;
	}

	@media screen and (min-width: 370px) {
		.MuiSvgIcon-root {
			font-size: 1.4em;
		}
	}
	@media screen and (min-width: 451px) {
		height: 63px;
	}
	@media screen and (min-width: 861px) {
		display: none;
	}
`;
