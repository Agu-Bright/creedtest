import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import PinDropIcon from "@mui/icons-material/PinDrop";
import profilePic from "../../../assets/admin-nav-images/profile-pic.png";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../contexts/UserDataContext";

const DesktopMakePost = ({ showModal, showLocationPicker }) => {
	const navigate = useNavigate();

	const { userData } = useContext(UserDataContext);

	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(JSON.parse(userData).user);
	}, [userData]);
	return (
		<div
			className="top__search desktop__top__search"
			style={{ alignItems: "center" }}
		>
			<Link to="/profile/posts">
				<img
					src={user?.photo?.url||avatarImage}
					style={{ height: "50px", width: "50px", background: "gray", objectFit:'cover', borderRadius:'100%' }}
					alt=""
				/>
			</Link>
			<div className="right">
				<p style={{ marginBottom: "0px" }} onClick={() => showModal()}>
					Start a Post, {user?.name}?
				</p>
				{/* <div className="bottom">
          <button onClick={() => showModal('photo')}>
            <PhotoLibraryIcon />
            Photos
          </button>
          <button onClick={() => showModal('video')}>
            <SmartDisplayIcon />
            Videos
          </button>
          <button onClick={showLocationPicker}>
            <PinDropIcon />
            Location
          </button>
        </div> */}
			</div>
		</div>
	);
};

export default DesktopMakePost;
