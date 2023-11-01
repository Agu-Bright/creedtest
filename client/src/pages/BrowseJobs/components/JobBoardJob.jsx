import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";
import { moneyFormat } from "../../../functions/moneyFormat";

const JobBoardJob = ({ showAuthModal, post }) => {
	dayjs.extend(relativeTime);
	const [avgAmount, setAvgAmount] = useState(0);

	useEffect(() => {
		let sum = 0;
		for (let i = 0; i < post?.proposals?.length; i++) {
			sum += Number(post?.proposals[i]?.bidAmount);
		}
		setAvgAmount(sum / post?.proposals?.length);
	}, [post]);
	return (
		<Container>
			<li className={"light"}>
				<div className="content">
					<h3 className="title">{post?.title}</h3>
						<p className="avg">
							<span>Budget: </span>
							{post?.budget}
						</p>
					<div className="stats">
						<p className="avg">
							<span>Average-bid: </span>
							{avgAmount}
						</p>
						<p className="avg">
							<span>Total-bids: </span>
							{post?.proposals?.length} bids
						</p>
						<p className="avg">
							<span>Posted: </span>
							{dayjs(post?.createdAt).fromNow()}
						</p>
					</div>
					<p
						className="description"
						dangerouslySetInnerHTML={{ __html: post?.description }}
					></p>
					<ul className="tags">
						{post?.skills?.map((skill) => (
							<li className="tag">{skill}</li>
						))}
					</ul>
					<button onClick={showAuthModal}>Apply Now</button>
				</div>
			</li>
		</Container>
	);
};

export default JobBoardJob;

const Container = styled.ul`
	width: 100%;
	box-sizing: border-box;
	list-style: none;
	padding-left: 0;

	li.dark {
		background-color: #d9d9d9;
	}
	li.light {
		background-color: #fff;
	}
	li {
		display: flex;
		flex-direction: row;
		padding: 1.2em 1em;
		margin: 1.2em 0;
		border-radius: 4px;
		.content {
			flex: 1;
			.title {
				display: inline-block;
				font-size: 1.2em;
			}
			.posted {
				font-size: 0.75em;
				display: inline-block;
				font-family: inter;
			}
			.description {
				padding: 1em 0;
				font-size: 0.95em;
				line-height: 1.5em;
			}
			.tags {
				display: flex;
				align-items: center;
				gap: 10px;
				flex-wrap: wrap;
			}
			.tag {
				color: #daa520;
				/* background-color: #DAA520; */
				font-size: 0.75em;
				padding: 0.4rem 0.7rem;
				border-radius: 20px;
				border: 1px solid #daa520;
				font-family: intermedium;
			}
			button {
				border: 0;
				outline: 0;
				color: #ffffff;
				background-color: #daa520;
				padding: 0.8em 3.2em;
				margin: 1.5em 0 0;
				width: fit-content;
				margin-left: auto;
				display: block;
				border-radius: 4px;
			}
		}
		.stats {
			display: flex;
			align-items: center;
			gap: 1rem;
			margin-top: 0.4rem;

			p {
				/* margin: 0.3em; */
				font-family: inter;
			}
			.avg {
				font-family: inter;
				font-size: 0.874em;
				span {
					font-family: intermedium;
					color: #484646;
				}
			}
		}
	}
	li:hover {
		box-shadow: 0px 0px 8px lightgray;
	}
	@media screen and (max-width: 1000px) {
		li {
			flex-direction: column;
			.stats {
				padding-top: 1em;
			}
		}
	}
`;
