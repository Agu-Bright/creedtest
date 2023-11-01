import React from "react";
import styled from "styled-components";
import BgImage from "../../../assets/manage-services-img/service-card-img.png";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { TrashIcon } from "@heroicons/react/24/outline";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { moneyFormat } from "../../../functions/moneyFormat";

const Service = ({ showDeleteModal, service, setId }) => {
	const navigate = useNavigate();
	return (
		<Container style={{ opacity: "1", boxShadow: "0.1px 0.1px 2px gray" }}>
			<img src={service?.photos[0]?.url} />
			<Details>
				<Title onClick={() => navigate(`/services/${service._id}`)}>
					{service.name}
				</Title>
				<Category>{service.category}</Category>
				<Price>
					{`${moneyFormat(Number(service?.minimumPrice))} to ${moneyFormat(
						Number(service?.maximumPrice)
					)}`}
				</Price>
				<Footer>
					<div className="left">
						<div className="rating">
							{/* <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarBorderIcon />
              <StarBorderIcon /> */}
							<Rating
								name="read-only"
								precision={0.5}
								value={service.rating}
								readOnly
								size="small"
							/>
						</div>

						<Link to={`/services/${service._id}/feedback`}>
							See reviews
							<span>({service.reviews.length})</span>
						</Link>
					</div>
				</Footer>
				<TrashIcon
					className="h-5 absolute right-3 bottom-3 cursor-pointer hover:text-red-500 transition duration-75"
					onClick={() => {
						showDeleteModal();
						setId(service._id);
					}}
				/>
			</Details>
		</Container>
	);
};

export default Service;

const Container = styled.div`
	display: flex;
	margin-bottom: 0.7rem;
	background-color: #fff;
	/* border-radius: 4px; */
	box-shadow: 0px 0px 2px #e2e1e1;
	gap: 0.5rem;
	overflow: hidden;
	padding: 0.5rem;

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
		height: 133px;
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
	position: relative;

	> * {
		text-align: left;
	}

	> .title {
		font-size: 0.12rem;
	}

	@media (min-width: 530px) {
		padding-top: 0.5rem;
	}
`;

const Title = styled.p`
	cursor: pointer;
	margin: 0 0 0.1rem !important;
	font-size: 0.875rem !important;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 95%;
	display: block !important;

	@media (min-width: 370px) {
		margin-bottom: 0.12rem !important;
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
	display: block !important;

	@media (min-width: 370px) {
		margin-bottom: 0.15rem !important;
	}

	@media (min-width: 530px) {
		font-size: 0.875em !important;
	}
`;

const Price = styled.p`
	margin: 0 !important;
	font-size: 0.75rem !important;
	display: block !important;

	@media (min-width: 530px) {
		font-size: 0.875em !important;
	}
`;

const Footer = styled.div`
	margin-top: 0.7rem;

	> .left {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 1px !important;
		padding-top: 0.5rem;
	}

	> .left > .rating > .MuiSvgIcon-root {
		color: #ffd700;
		font-size: 0.9em;
	}

	> .left > a {
		font-size: 0.7em;
		color: #000;
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
