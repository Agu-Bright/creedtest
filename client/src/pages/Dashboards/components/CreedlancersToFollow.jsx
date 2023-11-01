import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { fetchData } from "../../../api/fetchData";
import { postData } from "../../../api/postData";
import { updateData } from "../../../api/updateData";

const CreedlancersToFollow = () => {
	const { userData } = useContext(UserDataContext);

	const user = JSON.parse(userData).user;
	const userId = user?._id;

	const [users, setUsers] = useState(null);
	const [totalUsers, setTotalUsers] = useState(null);
	const [counter, setCounter] = useState(4);

	

	useEffect(() => {
		user &&
			fetchData("/users/get-users/").then((data) => {
				let localUsers = data
					.filter((item) => item?._id != user?._id)
					.filter((item) => item?._id != userId);

				setUsers([...localUsers]);
			});
	}, []);
	return (
		<div className="follow__creedlancers">
			<h2>Creedlancers to follow</h2>
			<div className="creedlancer__list" style={{height:'170px', overflow:'hidden'}}>
				{users?.map((data) => (
					<UserTile user={user} data={data} />
				))}
			</div>
		</div>
	);
};

const UserTile = ({ data, user, }) => {
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
		!following && (
			<div className="creedlance__entity">
				<h6 className="capitalize">
					{data.name} <br />{" "}
					<small className="text-zinc-500">{data.occupation}</small>
				</h6>
				<button onClick={handleFollow}>
					<AddCircleOutlinedIcon />
					Follow
				</button>
			</div>
		)
	);
};

export default CreedlancersToFollow;
