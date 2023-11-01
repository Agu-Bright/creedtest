import { useEffect, useState } from "react";
import Progress from "./Progress";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ProfileProgress = ({ user }) => {
	const [percentage, setPercentage] = useState(20);
	const checkFunc = (vals) => {
		let localPercentage = 0;
		vals?.forEach((val, i) => {
			if (typeof val != "object" && val) {
				localPercentage += 10;
			} else if (typeof val == "object" && val?.length > 0) {
				localPercentage += 10;
			}
		});
		setPercentage(percentage + localPercentage);
	};
	useEffect(() => {
		user &&
			percentage == 20 &&
			checkFunc([
				user?.skills,
				user?.aboutMe,
				user?.availability,
				user?.coverLetter,
				user?.qualifications,
				user?.education,
				user?.experiences,
				user?.photo?.url,
			]);
	}, [user]);
	return (
		<div className="profile__progress relative">
			<XMarkIcon className="absolute top-2 right-4 h-6 lg:hidden" />
			<h2>Finish setting up your account</h2>
			<div className="progress__container">
				<div className="progress">
					<Progress percentage={percentage} />
				</div>
			</div>
			<p>
				Only creedlancers with complete profiles will be shown on the browse
				workers page
			</p>
			<Link to="/profile">Go to profile</Link>
		</div>
	);
};

export default ProfileProgress;
