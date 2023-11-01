import React from "react";
import styled from "styled-components";
import category_data from "../../../assets/data/CategoryData";
import { Link } from "react-router-dom";
import { BrowseAll } from "./BrowseAll";

export const CategoriesContent = ({ className }) => {
	return (
		<Container className={className}>
			{category_data.map((obj, key) => (
				<li key={key}>
					<div className="image-container">
						<img src={obj.imgUrl} alt={obj.name} />
					</div>
					<div className="text-container">
						<Link key={key} className="name" to={"/browse/services/" + obj.to}>
							{obj.name}
						</Link>
						<p className="description">{obj.description}</p>
					</div>
				</li>
			))}
			<BrowseAll />
		</Container>
	);
};

const Container = styled.ul`
	li {
		align-items: center;
		display: flex;
		flex-direction: row;
		height: max-content;
		padding-bottom: 1em;
		:nth-last-child(1) {
			padding-bottom: 0;
		}
		.image-container {
			height: inherit;
			padding-right: 0.3em;
			img {
				width: 3.5em;
				height: 3.5em;
			}
		}
		.text-container {
			height: max-content;
		}
		.name {
			font-weight: bold;
			margin: 0 0 0.5em 0;
			color: #501f85;
		}
		.description {
			font-size: 0.8em;
			margin: 0;
		}
	}
	&.category {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25em, 30%));
		justify-content: center;
		padding: 0;
		grid-gap: 1.2em;
		list-style: none;
		width: 90%;
		margin: 2em auto;
		@media screen and (max-width: 910px) {
			display: flex;
			flex-direction: column;
		}
	}
	&.service {
		background-color: #ffffff;
		margin: 0;
		padding: 0.5em 0.3em;
		width: 400px;
		border-radius: 0.3em;
		li {
			margin: 0.25em 0;
		}
		.name {
			margin: 0;
		}
	}
`;
