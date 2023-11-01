import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { postData } from "../../../api/postData";
import { updateData } from "../../../api/updateData";

const Follower = ({ data, userId }) => {
	const { userData } = useContext(UserDataContext);

	const user = JSON.parse(userData);

	const { _id, name, occupation, photo, username } = data;

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
		if (data?.followers?.includes(user?.user?._id)) {
			setFollowing(true);
		}
	}, []);
	return (
		<li key={name}>
			<div className="flex gap-2 p-2">
				<div className="w-14">
					{photo?.url ? (
						<img
							src={photo?.url}
							className="h-12 w-12 block object-cover bg-zinc-300 rounded-full"
						/>
					) : (
						<div className="h-12 w-12 block bg-zinc-300 rounded-full"></div>
					)}
				</div>
				<div className="flex justify-between flex-col h-14 w-full">
					<div className="flex w-full justify-between pr-2">
						<Link
							to={`/profile/${userId != _id ? username + "/" : ""}posts`}
							className="text-lg  text-zinc-800 font-semibold capitalize"
						>
							{name}
						</Link>
						{_id != userId && (
							<button onClick={handleFollow}>
								{following ? "Unfollow" : "Follow"}
							</button>
						)}
					</div>
					<div className="text-xs -mt-2 mb-2">
						<div className="flex items-center gap-0.5">{occupation}</div>
					</div>
					<hr className="block" />
				</div>
			</div>
		</li>
	);
};

export default Follower;
