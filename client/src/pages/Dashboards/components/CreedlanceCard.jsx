import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import image from "../../../assets/images/team-pic.png";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { updateData } from "../../../api/updateData";
import { Link } from "react-router-dom";
import { postData } from "../../../api/postData";

const CreedlanceCard = ({ data }) => {
	const { userData } = useContext(UserDataContext);

	const user = JSON.parse(userData)?.user;

	const [following, setFollowing] = useState(false);

	const [followers, setFollowers] = useState(null);
	const handleFollow = () => {
		if (!following) {
			postData(`/users/${data?._id}/follow`).then((res) => {
				if (res.ok) {
					setFollowing(true);

					let localFollowers = followers;

					localFollowers.push(data?._id);

					setFollowers([...localFollowers]);
				}
			});
		} else {
			updateData(`/users/${data?._id}/unfollow`).then((res) => {
				if (res.ok) {
					setFollowing(false);
					let localFollowers = followers;
					localFollowers.splice(localFollowers.indexOf(data?._id), 1);
					setFollowers([...localFollowers]);
				}
			});
		}
	};

	useEffect(() => {
		setFollowers(data?.followers);
		if (data?.followers?.includes(user?._id)) {
			setFollowing(true);
		}
	}, []);

	return (
		<Container>
			<Link to={`/profile/${data?.username}/posts`}>
				<img
					src={data?.photo?.url||avatarImage}
					className="h-80 bg-zinc-500 object-cover w-80 md:w-full"
					alt=""
				/>
			</Link>
			<div className="details">
				<Link to={`/profile/${data?.username}/posts`}>
					<p className="name capitalize">{data?.name}</p>
				</Link>
				<div className="flex items-center gap-x-2">
					<p className="text-sm m-0 text-gray-600 whitespace-nowrap max-w-[76%] overflow-hidden text-ellipsis">
						{data?.occupation}
					</p>
					<span className="font-interbolder">·</span>
					<p className="text-sm text-gray-600 m-0 leading-none whitespace-nowrap">
						{data?.state}
					</p>
				</div>
				<button
					id="mike"
					onClick={handleFollow}
					className={`flex items-center justify-center gap-x-1 ${
						following ? "bg-zinc-400" : "bg-primary-500"
					}`}
				>
					<UserPlusIcon className="h-[19px]" />
					{following ? "Unfollow" : "Follow"}
				</button>
			</div>
		</Container>
	);
};

export default CreedlanceCard;

const Container = styled.div`
	min-height: 50vh;
	max-height: 50vh;
	width: 65vw;
	display: flex;
	flex-direction: column;
	margin-bottom: 0.5rem;
	box-shadow: 0px 0px 2px lightgray;
	background: #fff;
	border-radius: 6px;
	overflow: hidden;

	img {
		width: 100%;
		height: calc(50vh - 105px);
		object-fit: cover;
	}

	.details {
		padding: 0.5rem;
		height: 105px;
	}

	p.name {
		font-family: intermedium;
		/* margin-bottom: 0.5rem; */
	}

	button {
		color: #fff;
		width: 100%;
		padding: 0.6rem 0;
		border: none;
		border-radius: 6px;
		margin-top: 0.5rem;
	}

	@media (min-width: 370px) {
		width: 70vw;

		p.name {
			font-size: 1rem;
		}

		button {
			padding: 0.6rem 0;
			font-size: 1rem;
		}

		img {
			/* height: 35.3vh; */
		}
	}
`;
