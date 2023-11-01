import { useContext, useEffect, useState } from "react";
import Btn from "../../../components/MikesComponents/Btn";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { postData } from "../../../api/postData";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import { Link } from "react-router-dom";
import { updateData } from "../../../api/updateData";

const BrowseSimilarItem = ({ data }) => {
	const { userData } = useContext(UserDataContext);

	const user = JSON.parse(userData)?.user;

	const { username,_id, name, occupation,photo } = data;

	const [following, setFollowing] = useState(false);

	const [followers, setFollowers] = useState(null);
	const handleFollow = () => {
		if (!following) {
			postData(`/users/${_id}/follow`).then((res) => {
				if (res.ok) {
					setFollowing(true);

					let localFollowers = followers;

					localFollowers.push(_id);

					setFollowers([...localFollowers]);
				}
			});
		} else {
			updateData(`/users/${_id}/unfollow`).then((res) => {
				if (res.ok) {
					setFollowing(false);
					let localFollowers = followers;
					localFollowers.splice(localFollowers.indexOf(_id), 1);
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
		!following && (
			<li className="flex justify-between items-center gap-2 lg:p-2">
				<div className="flex gap-2 w-full max-w-xs">
					<div className="w-20 h-14">
						<img className="h-14 w-14 block bg-zinc-300 rounded-full object-cover" src={photo?.url||avatarImage} />
					</div>
					<div className="flex justify-between flex-col lg:h-14 w-full">
						<Link
							to={`/profile/${username}/posts`}
							className="flex w-full justify-between pr-2"
						>
							<h4 className="text-lg  text-zinc-800 font-semibold capitalize">
								{name}
							</h4>
						</Link>
						<div className="text-xs -mt-2 mb-2">
							{occupation}, {followers?.length} followers
						</div>
						<button
							onClick={handleFollow}
							className={`w-full ${
								following ? "bg-zinc-100" : "bg-primary-500 text-white"
							} rounded py-1 lg:hidden`}
						>
							{following ? "Unfollow" : "Follow"}
						</button>
						<hr className="hidden lg:block" />
					</div>
				</div>
				<button
					onClick={handleFollow}
					className={` ${
						following ? "bg-zinc-100" : "bg-primary-500 text-white"
					} rounded py-2 px-6 h-max hidden lg:block w-40`}
				>
					{following ? "Unfollow" : "Follow"}
				</button>
			</li>
		)
	);
};

export default BrowseSimilarItem;
