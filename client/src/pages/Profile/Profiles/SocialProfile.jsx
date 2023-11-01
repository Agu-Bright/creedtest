import { Fragment, useContext, useEffect, useState } from "react";

import { PlusIcon } from "@heroicons/react/24/solid";
import {
	BuildingOffice2Icon,
	MapPinIcon,
	WrenchScrewdriverIcon,
	PencilIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import PostCard from "../Components/post-card/PostCard";
import { fetchData } from "../../../api/fetchData";
import CreatePost from "../Components/CreatePost";
import PickLocation from "../../../components/common/PickLocation";
import BrowseSimilar from "../Components/BrowseSimilar";
import { SocialPostContext } from "../../../contexts/SocialPostContext";

const SocialProfile = ({ user, outwards, userId }) => {
	const { dummyPost } = useContext(SocialPostContext);

	const [showCreatePostForm, setShowCreatePostForm] = useState(false);
	const [showLocationPicker, setShowLocationPicker] = useState(false);
	const [hideNavBar, setHideNavBar] = useState(false);
	const [location, setLocation] = useState(null);
	const [posts, setPosts] = useState(null);

	const fetchPosts = () =>
		user &&
		fetchData(`/social/${user?._id}/get-user-posts`).then((data) =>
			setPosts([...data.userPosts.reverse()])
		);

	useEffect(() => {
		fetchPosts();
	}, [user]);

	useEffect(() => {
		fetchPosts();
	}, [dummyPost]);

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
	}, [user]);

	useEffect(() => {
		if (showCreatePostForm || showLocationPicker) {
			setHideNavBar(true);
			document.querySelector("html").classList.add("modal__open");
		} else {
			setHideNavBar(false);
			document.querySelector("html").classList.remove("modal__open");
		}
	}, [showCreatePostForm, showLocationPicker]);
	return (
		<>
			{showLocationPicker && (
				<PickLocation
					onPick={setLocation}
					hide={() => setShowLocationPicker(false)}
				/>
			)}
			{showCreatePostForm && (
				<CreatePost
					hide={() => setShowCreatePostForm(false)}
					postType={"text"}
					showLocationPicker={() => {
						setShowLocationPicker(true);
						document.querySelector("html").classList.add("modal__open");
					}}
					location={location}
					fetchPosts={fetchPosts}
				/>
			)}
			<div id="mike" className="max-w-7xl mx-auto lg:my-0 pb-10 lg:mt-0">
				<section className="grid lg:grid-cols-5 gap-10 py-10">
					<div className="lg:col-span-2 px-6">
						<ul
							style={{ position: "sticky", top: 0 }}
							className="flex flex-col gap-10 lg:sticky top-10"
						>
							<li className="shadow rounded p-6">
								<h2 className="text-sm mb-4 capitalize">About</h2>
								<ul className="flex justify-between flex-col gap-2 text-xs lg:text-base text-zinc-500 font-medium capitalize">
									<li className="flex justify-between">
										<div className="flex gap-2 text-zinc-700">
											<BuildingOffice2Icon className="h-6" /> Account
										</div>
										{user?.role == "enterprise"
											? "Enterprise Account"
											: "Creedlancer Account"}{" "}
									</li>
									<li className="flex justify-between">
										<div className="flex gap-2 text-zinc-700">
											<WrenchScrewdriverIcon className="h-6" />
											Occupation
										</div>
										{user?.occupation}
									</li>
									<li className="flex justify-between">
										<div className="flex gap-2 text-zinc-700">
											<MapPinIcon className="h-6" /> Location
										</div>
										{user?.city}, {user?.state}
									</li>
									{!outwards && (
										<li className="border-t">
											<Link
												to={"/settings/profile"}
												className="flex justify-center gap-2 py-4 mt-4 items-center w-full bg-zinc-100 text-zinc-700 rounded cursor-pointer"
											>
												<PencilIcon className="h-5" /> Edit
											</Link>
										</li>
									)}
								</ul>
							</li>
							{!outwards && (
								<li>
									<button
										onClick={() => setShowCreatePostForm(true)}
										className="py-4 flex items-center justify-center gap-2 w-full bg-primary-500 text-white rounded-md"
									>
										<PlusIcon className="h-6" /> Create Post
									</button>
								</li>
							)}
							{outwards && users && (
								<li>
									<BrowseSimilar title={"creedlancers"} data={users} />
								</li>
							)}
						</ul>
					</div>
					<ul className="w-screen lg:w-auto lg:col-span-3 flex flex-col gap-[3px] lg:gap-2 text-sm bg-zinc-100 lg:bg-white">
						{dummyPost && (
							<li>
								<PostCard
									dummy={true}
									post={dummyPost}
									id={dummyPost._id}
									description={dummyPost.description}
									files={dummyPost?.photos?.map((photo) => {
										return {
											type: photo?.type ? photo?.type : "image",
											url: photo?.url,
										};
									})}
									hideNavBar={() => setHideNavBar(true)}
									showNavBar={() => setHideNavBar(false)}
								/>
							</li>
						)}
						{posts &&
							(posts.length > 0 ? (
								posts.map((post) => (
									<li key={post._id}>
										<PostCard
											post={post}
											id={post._id}
											description={post.description}
											files={post?.photos?.map((photo) => {
												return {
													type: photo?.type ? photo?.type : "image",
													url: photo?.url,
												};
											})}
											hideNavBar={() => setHideNavBar(true)}
											showNavBar={() => setHideNavBar(false)}
										/>
										{/* <hr className="border-2 lg:hidden border-zinc-300" /> */}
									</li>
								))
							) : (
								<li className="text-zinc-600 w-full rounded p-4 text-center font-medium border">
									No posts yet
								</li>
							))}
					</ul>
				</section>
			</div>
		</>
	);
};

export default SocialProfile;
