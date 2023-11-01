import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profilePic from "../../../assets/admin-nav-images/profile-pic.png";
import userIcon from "../../../assets/admin-nav-images/user-icon.png";
import gridIcon from "../../../assets/admin-nav-images/grid-icon.png";
import caseIcon from "../../../assets/admin-nav-images/case-icon.png";
import manageServiceIcon from "../../../assets/admin-nav-images/manage-service-icon.png";
import manageProjectIcon from "../../../assets/admin-nav-images/manage-project-icon.png";
import postServiceIcon from "../../../assets/admin-nav-images/post-a-service.png";
import socialProfileIcon from "../../../assets/admin-nav-images/social-profile.png";
import { LoaderContext } from "../../../contexts/LoaderContext";
import { ModalContext } from "../../../contexts/ModalContext";
import { postData } from "../../../api/postData";
import { UserDataContext } from "../../../contexts/UserDataContext";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";


const AccountInformationMenu = ({ setShowAccountInfoMenu, unlockScroll }) => {
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
    <div className="account__info__menu">
      <div
        className="dismiss__overlay"
        onClick={() => setShowAccountInfoMenu(false)}
      ></div>
      <div className="account__info__container">
        <div
          className="dismiss__overlay"
          onClick={() => setShowAccountInfoMenu(false)}
        ></div>
        <motion.div
          className="menu"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ type: "none" }}
        >
          <h3>ACCOUNT INFORMATION</h3>
          <div className="link__group">
            <NavLink
              to="/dashboard"
              onClick={() => unlockScroll()}
              style={({ isActive }) =>
                isActive ? { color: "#DAA520" } : undefined
              }
            >
              <img src={gridIcon} alt="" />
              Dashboard
            </NavLink>
            <NavLink
              to="/profile/posts"
              onClick={() => unlockScroll()}
              style={({ isActive }) =>
                isActive ? { color: "#DAA520" } : undefined
              }
            >
              <img src={userIcon} alt="" />
              Profile
            </NavLink>
            {/* <NavLink
            to='/profile/worker'
            onClick={() => unlockScroll()}
            style={({ isActive }) => isActive ? {color: "#DAA520"} : undefined}
          >
            <img src={caseIcon} alt="" />
            Worker Profile
          </NavLink>
          <NavLink 
            to="/profile/social"
            onClick={() => unlockScroll()}
            style={({ isActive }) => isActive ? {color: "#DAA520"} : undefined}
          >
            <img src={socialProfileIcon} alt="" />
            Social Profile
          </NavLink> */}
          </div>
          <div className="link__group">
            <NavLink
              to="/post-service"
              onClick={() => unlockScroll()}
              style={({ isActive }) =>
                isActive ? { color: "#DAA520" } : undefined
              }
            >
              <img src={postServiceIcon} alt="" />
              Post A Service
            </NavLink>
            <NavLink
              to="/manage-services/my-services"
              onClick={() => unlockScroll()}
              style={({ isActive }) =>
                isActive ? { color: "#DAA520" } : undefined
              }
            >
              <img src={manageServiceIcon} alt="" />
              Manage Service
            </NavLink>
            <NavLink
              to="/jobs/projects"
              onClick={() => unlockScroll()}
              style={({ isActive }) =>
                isActive ? { color: "#DAA520" } : undefined
              }
            >
              <img src={manageProjectIcon} alt="" />
              Manage Projects
            </NavLink>
          </div>
          <footer>
            {user && (
              <div className="profile__box">
                <img
                  src={user.photo?.url||avatarImage}
                  style={{ background: "gray", objectFit: "cover" }}
                  alt=""
                />
                <div className="right">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
            )}
            <div className="auth">
              <button onClick={signOut}>Sign out</button>
              <NavLink to="/settings/profile">Account Setting</NavLink>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountInformationMenu;
