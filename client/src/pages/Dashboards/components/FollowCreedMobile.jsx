import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CreedlanceCard from "./CreedlanceCard";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { fetchData } from "../../../api/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules'

const FollowCreedMobile = ({ title }) => {
	const { userData } = useContext(UserDataContext);

	const user = JSON.parse(userData).user;
	const userId = user?._id;

	const [users, setUsers] = useState(null);

	useEffect(() => {
		user &&
			fetchData("/users/get-users").then((data) =>
				setUsers(
					data
						.filter((item) => item?._id != user?._id)
						.filter((item) => item?._id != userId)
				)
			);
	}, []);

	return (
		<Container>
			<Header>
				<h3>{title}</h3>
			</Header>
			<Swiper
				// speed={1000}
				spaceBetween={35}
				slidesPerView={'auto'}
				modules={[FreeMode]}
				freeMode
			>
        {users?.map(((user, i)=>(
					<SwiperSlide key={i}>
						<CreedlanceCard data={user} />
					</SwiperSlide>
				)))}
			</Swiper>
		</Container>
	);
};

export default FollowCreedMobile;

const Container = styled.div`
	background-color: #fff;
	padding: 1em 0 1em 1em;
	margin-bottom: 0.7rem;

	@media (min-width: 1024px) {
		display: none;
	}

	.swiper-slide {
		width: 65vw;
		/* margin-right: 0.7rem; */
	}
`;
const Header = styled.div`
	padding-bottom: 1em;
	> h3 {
		font-family: intermedium;
	}

	@media (min-width: 370px) {
		> h3 {
			font-size: 1rem;
		}
	}
`;
