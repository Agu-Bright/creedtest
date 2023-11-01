import React, { useContext, useEffect, useState } from "react";
import profilePic from "../../../assets/admin-nav-images/profile-pic.png";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { height, width } from "@mui/system";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";

const MobileMakePost = ({ showModal, showLocationPicker }) => {
	const navigate = useNavigate();

	const { userData } = useContext(UserDataContext);

	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(JSON.parse(userData).user);
	}, [userData]);
	return (
		<div className="top__search" style={{ alignItems: "center" }}>
			<Link to="/profile/posts">
				<img
					src={user?.photo?.url || avatarImage}
					style={{
						background: "gray",
						objectFit: "cover",
						borderRadius: "100%",
						width: "50px",
						height: "50px",
					}}
					alt=""
				/>
			</Link>
			<div className="right">
				<p
					onClick={() => showModal()}
					style={{ margin: "0px", height: "50px", paddingBlock: "15px" }}
				>
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

export default MobileMakePost;
