import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../api/fetchData";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import Follower from "./Components/Follower";
import { LoaderContext } from "../../contexts/LoaderContext";
const Followers = () => {
	const { id } = useParams();
	const { setLoading } = useContext(LoaderContext);
	const { userData } = useContext(UserDataContext);
	const [isFollowers, setIsFollowers] = useState(true);
	const [user, setUser] = useState(null);
	const [userId, setUserId] = useState(null);
	const [followers, setFollowers] = useState(null);

	useEffect(() => {
		if (userData) {
			if (id) {
				fetchData(`/users/${id}/get-user-username`).then((data) => {
					setUser(data);
				});
			} else {
				setUser(JSON.parse(userData)?.user);
			}
			setUserId(JSON.parse(userData)?.user?._id);
		}
	}, [userData]);

	useEffect(() => {
		if (user) {
			setFollowers();
			setLoading(true);
			fetchData(
				`/users/${user?._id}/${isFollowers ? "my-followers" : "get-following"}`
			).then((data) => {
				setLoading(false);
				setFollowers(data.userFollowers);
			});
		}
	}, [user, isFollowers]);

	const navigate = useNavigate();
	return (
		<div key={isFollowers} id="mike">
			<nav className="bg-zinc-100 flex items-center justify-between p-4">
				<ChevronLeftIcon onClick={() => navigate(-1)} className="h-6" />
				<div className="w-6"></div>
			</nav>
			<section>
				<ul className="flex gap-4 text-lg p-2">
					<li>
						<button
							onClick={() => !isFollowers && setIsFollowers(true)}
							className={`border-b-4 px-2 pb-1 outline-transparent ${
								isFollowers ? "border-primary-500" : ""
							}`}
						>
							Followers
						</button>
					</li>
					<li>
						<button
							onClick={() => isFollowers && setIsFollowers(false)}
							className={`border-b-4 px-2 pb-1 outline-transparent ${
								!isFollowers ? "border-primary-500" : ""
							}`}
						>
							Following
						</button>
					</li>
				</ul>
				<ul className="grid clb lg:overflow-auto justify-between grid-cols-1 lg:grid-cols-3 lg:gap-2 text-xs lg:text-base text-zinc-800 h-full w-full pb-16 lg:pb-6">
					{followers?.map((data) => (
						<Follower data={data} userId={userId} />
					))}
				</ul>
			</section>
		</div>
	);
};

export default Followers;
