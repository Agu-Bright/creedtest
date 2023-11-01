import React, { useEffect, useState } from "react";
import "./ProjectCard.css";
import StarIcon from "@mui/icons-material/Star";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { Link, useNavigate } from "react-router-dom";
import { moneyFormat } from "../../functions/moneyFormat";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const ProjectCard = ({
	id,
	title,
	proposals,
	description,
	skills,
	createdAt,
	budget, category
}) => {
	const navigate = useNavigate();
	dayjs.extend(relativeTime);

	const [avgAmount, setAvgAmount] = useState(0);

	useEffect(() => {
		let sum = 0;
		for (let i = 0; i < proposals?.length; i++) {
			sum += Number(proposals[i]?.bidAmount);
		}
		setAvgAmount(sum / proposals?.length);
	}, [proposals]);
	return (
		<Link
			className="project__card block"
			to={"/dashboard/browse/projects/" + id}
		>
			<div className="header">
				<div className="left">
					<h3>{title}</h3>
					<small className="text-black">{budget}, {category}</small>
					{proposals?.length > 0 ? (
						<p>
							average bid:
							<span>{moneyFormat(avgAmount)}</span>
						</p>
					) : null}
				</div>
				<div className="right">
					{proposals?.length > 0 ? (
						<>
							<h3>{moneyFormat(avgAmount)}</h3>
							<p className="tag">average bid</p>
						</>
					) : null}
					{proposals?.length == 0 ? (
						<p className="badge">BE THE FIRST TO BID</p>
					) : null}
				</div>
			</div>
			<div className="card__description">
				<p dangerouslySetInnerHTML={{ __html: description }}></p>
				<div className="tags">
					{skills.map((skill) => (
						<span>{skill}</span>
					))}
				</div>
			</div>
			<div className="card__footer">
				<div className="left">
					<div className="rating">
						<div className="stars">
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<StarIcon />
						</div>
						<p>0.0</p>
					</div>
					{/* <div className="reviews">
						<MessageIcon />
						<span>0</span>
					</div> */}
				</div>
				<div className="right">
					<p>{dayjs(createdAt).fromNow()}</p>
					{/* <BookmarkBorderOutlinedIcon /> */}
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
