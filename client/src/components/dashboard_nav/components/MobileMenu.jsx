import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink, Link, useNavigate } from "react-router-dom";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import userIcon from "../../../assets/admin-nav-images/user-icon.png";
import gridIcon from "../../../assets/admin-nav-images/grid-icon.png";
import caseIcon from "../../../assets/admin-nav-images/case-icon.png";
import manageServiceIcon from "../../../assets/admin-nav-images/manage-service-icon.png";
import manageProjectIcon from "../../../assets/admin-nav-images/manage-project-icon.png";
import myWorkersIcon from "../../../assets/admin-nav-images/my-workers-icon.png";
import myProposalsIcon from "../../../assets/admin-nav-images/my-proposal-icon.png";
import myInterviewsIcon from "../../../assets/admin-nav-images/my-interviews-icon.png";
import helpCenterIcon from "../../../assets/admin-nav-images/help-center-icon.png";
import profilePic from "../../../assets/admin-nav-images/profile-pic.png";
import socialProfileIcon from "../../../assets/admin-nav-images/social-profile.png";
import { AdminNavContext } from "../../../provider/AdminNav";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { LoaderContext } from "../../../contexts/LoaderContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { postData } from "../../../api/postData";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";

const MobileMenu = ({ unlockScroll }) => {
  const { dispatch } = useContext(AdminNavContext);
  const { setLoading } = useContext(LoaderContext);
  const { showModal } = useContext(ModalContext);
  const { userData, checkStorage } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const signOut = () => {
    postData("/users/logout").then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          localStorage.removeItem("user");
          checkStorage();
          setLoading(false);
          document.querySelector("html").classList.remove("modal__open");
          navigate("/login");
          showModal("Logged Out!", true);
        });
      } else {
        res.json().then((res) => {
          showModal(res.message, false);
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    if (userData) {
      setUser(JSON.parse(userData).user);
    }
  }, []);

  return (
    <motion.div
      className="mobile__nav"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ type: "none" }}
      onClick={() => {
        unlockScroll();
        dispatch({ type: "SHOW_ALL" });
      }}
    >
      <div className="profile__box">
        <div className="top">
          <img
            src={user?.photo?.url || avatarImage}
            style={{ background: "gray", objectFit: "cover" }}
            alt=""
          />
          <h4>{user?.name}</h4>
          <p>{user?.followers?.length} followers</p>
        </div>
        <div className="bottom">
          <ChatOutlinedIcon />
          <Link to="/chat/contacts">Messages</Link>
        </div>
      </div>
      <div className="link__group">
        <NavLink
          to="/profile/client"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
        >
          <PersonOutlinedIcon />
          Profile
        </NavLink>
        <NavLink
          to="/dashboard"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
        >
          <GridViewOutlinedIcon />
          Dashboard
        </NavLink>
        <NavLink
          to="/post-service"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
        >
          <PostAddIcon color="red" sx={{ color: "red !important" }} />
          Post A Service
        </NavLink>
        <NavLink
          to="/posted/projects"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
          onClick={() => setShowMobileMenu(false)}
        >
          <Inventory2OutlinedIcon />
          Posted Projects
        </NavLink>
        <NavLink
          to="/settings/profile"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
        >
          <SettingsOutlinedIcon />
          Account Settings
        </NavLink>
      </div>
      <div className="h-3" />
      <div className="h-[1px] bg-gray-100" />
      <div className="link__group">
        <NavLink
          to="/manage-services/my-services"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
        >
          <img src={manageServiceIcon} alt="" />
          Manage Service
        </NavLink>
        <NavLink
          to="/assigned/projects"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
          onClick={() => setShowMobileMenu(false)}
        >
          <img src={myWorkersIcon} alt="" />
          My Workers
        </NavLink>
        <NavLink
          to="/jobs/interviews"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
          onClick={() => setShowMobileMenu(false)}
        >
          <img src={myInterviewsIcon} alt="" />
          My Interviews
        </NavLink>
        <NavLink
          to="/proposals/projects"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
          onClick={() => setShowMobileMenu(false)}
        >
          <img src={myProposalsIcon} alt="" />
          My Proposals
        </NavLink>
        <NavLink
          to="/help-center"
          style={({ isActive }) =>
            isActive ? { color: "#DAA520" } : undefined
          }
        >
          <img src={helpCenterIcon} alt="" />
          Help Center
        </NavLink>
      </div>
      <div className="h-10" />
      <button
        onClick={signOut}
        style={{ color: "#d43c3c" }}
        className="w-full box-border h-10 text-sm font-intermedium border border-solid border-red-400 bg-white text-red-800 rounded-md flex items-center justify-center gap-x-1 active:opacity-50"
      >
        Log out
        <ArrowRightOnRectangleIcon
          style={{ stroke: "#db1111" }}
          className="h-5 w-5 text-red-400"
        />
      </button>
      <div className="h-16" />
    </motion.div>
  );
};

export default MobileMenu;
