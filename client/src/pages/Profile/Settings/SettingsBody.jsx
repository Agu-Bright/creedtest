import React, { useEffect, useState, useContext } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { UserDataContext } from "../../../contexts/UserDataContext";
import Profile from "./Profile";
import Logins from "./Logins";
import Passwords from "./Passwords";
import Account from "./Account";

const SettingsBody = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [swipe, setSwipe] = useState(null);

	const navLinks = [
		{ title: "profile", href: "/settings/profile" },
		{ title: "Email / Number", href: "/settings/logins" },
		{ title: "password", href: "/settings/password" },
		{ title: "account", href: "/settings/account" },
	];

	useEffect(() => {
		swipe
			? pathname == "/settings/profile"
				? swipe.slideTo(0, 500)
				: pathname == "/settings/logins"
				? swipe.slideTo(1, 500)
				: pathname == "/settings/password"
				? swipe.slideTo(2, 500)
				: pathname == "/settings/account"
				? swipe.slideTo(3, 500)
				: swipe.slideTo(0, 500)
			: "";
	}, [pathname, swipe]);
	
	useEffect(()=>{

	}, [])

	
	return (
		<div
			id="mike"
			className=" lg:grid grid-cols-5 lg:py-10 lg:px-20 text-zinc-800 mt-[68px] lg:mt-0"
		>
			<nav className="lg:border-r mb-10">
				<ul className="flex justify-between lg:flex-col lg:gap-4 capitalize text-xs lg:text-base">
					{navLinks.map(({ title, href }) => (
						<li
							key={title}
							className={
								pathname == href
									? "border-b-4 lg:border-b-0 lg:border-l-4 transition-all border-primary-500 text-primary-500"
									: "border-b-4 border-transparent"
							}
						>
							<Link className="px-4 " to={href}>
								{title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<main className="col-span-4 px-6 lg:px-10">
				<Swiper
					autoHeight={true}
					onSwiper={(swiper) => setSwipe(swiper)}
					spaceBetween={20}
					onSlideChange={(swiper) =>
						swiper
							? swiper.activeIndex == 0
								? navigate("/settings/profile")
								: swiper.activeIndex == 1
								? navigate("/settings/logins")
								: swiper.activeIndex == 2
								? navigate("/settings/password")
								: swiper.activeIndex == 3
								? navigate("/settings/account")
								: ""
							: ""
					}
				>
					<SwiperSlide className="h-max">
						<Profile />
					</SwiperSlide>
					<SwiperSlide className="h-max">
						<Logins />
					</SwiperSlide>
					<SwiperSlide className="h-max">
						<Passwords />
					</SwiperSlide>
					<SwiperSlide className="h-max">
						<Account />
					</SwiperSlide>
				</Swiper>
			</main>
		</div>
	);
};

export default SettingsBody;
