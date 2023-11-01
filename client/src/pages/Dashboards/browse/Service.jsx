import React from "react";
import styled from "styled-components";
import BgImage from "../../../assets/manage-services-img/service-card-img.png";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { moneyFormat } from "../../../functions/moneyFormat";
import { CameraIcon } from "@heroicons/react/24/solid";

const Service = ({ service, className = "" }) => {
	// console.log(service);
	return (
		<Container to={"/services/" + service?._id} className={className}>
			{service?.photos[0]?.url && <img src={service?.photos[0]?.url} />}
			{!service?.photos[0]?.url && (
				<div className="h-full aspect-square bg-zinc-300 text-zinc-500 flex justify-center items-center">
					<CameraIcon className="h-6" />
				</div>
			)}
			<Details>
				<Header>
					<Title>{service?.name}</Title>
					<Price>
						{`${moneyFormat(Number(service?.minimumPrice))} to ${moneyFormat(
							Number(service?.maximumPrice)
						)}`}
					</Price>
				</Header>
				<Category>{service?.category}</Category>
				<Footer>
					<div className="left">
						<div className="rating">
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<StarBorderIcon />
							<StarBorderIcon />
						</div>
						<Link to="/manage-services/my-services">
							See reviews
							<span>({service?.reviews?.length})</span>
						</Link>
					</div>
				</Footer>
			</Details>
		</Container>
	);
};

export default Service;

const Container = styled(Link)`
	display: flex;
	margin-bottom: 0.7rem;
	background-color: #fff;
	/* border-radius: 4px; */
	box-shadow: 0px 0px 2px #e2e1e1;
	gap: 0.5rem;
	overflow: hidden;
	padding: 0.5rem;
	cursor: pointer;
	color: #121212;

	> img {
		height: 70px !important;
		width: 70px;
		object-fit: cover;
	}

	@media (min-width: 370px) {
		> img {
			height: 80px !important;
			width: 80px;
			object-fit: cover;
		}
	}

	@media (min-width: 530px) {
		min-height: 133px;
		padding: 0;

		> img {
			height: 133px !important;
			width: 133px !important;
			object-fit: cover;
		}
	}
`;

const Details = styled.div`
	flex: 1;

	@media (min-width: 530px) {
		padding-top: 0.5rem;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 0.7rem;
`;

const Title = styled.p`
	margin: 0 0 0.1rem !important;
	font-size: 0.875rem !important;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 95%;
	font-family: intersemibold;

	@media (min-width: 370px) {
		margin-bottom: 0.2rem !important;
	}

	@media (min-width: 530px) {
		font-size: 1em !important;
	}
`;

const Category = styled.p`
	margin: 0 0 0.1rem !important;
	font-size: 0.75rem !important;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 95%;
	font-family: inter;

	@media (min-width: 370px) {
		margin-bottom: 0.4rem !important;
	}

	@media (min-width: 530px) {
		font-size: 0.875em !important;
	}
`;

const Price = styled.p`
	margin: 0 !important;
	font-size: 0.75rem !important;
	font-family: intermedium;

	@media (min-width: 530px) {
		font-size: 0.875em !important;
	}
`;

const Footer = styled.div`
	margin-top: 0.7rem;

	> .left {
		/* display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px; */
	}

	> .left > .rating > .MuiSvgIcon-root {
		color: #ffd700;
		font-size: 0.9em;
	}

	> .left > a {
		font-size: 0.7em;
		color: #000;
		font-family: intermedium;
	}

	@media (min-width: 370px) {
		> .left {
			gap: 1rem;
		}

		> .left > .rating > .MuiSvgIcon-root {
			font-size: 1em;
		}
	}

	@media (min-width: 530px) {
		> .left > .rating > .MuiSvgIcon-root {
			font-size: 1.2em;
		}

		> .left > a {
			font-size: 0.75em;
		}
	}
`;
