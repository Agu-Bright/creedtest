import React, { useContext, useEffect, useRef, useState } from "react";
import "./dashboard_nav.css";
import avatarImage from "../../assets/Dashboard/avatar.jpeg";
import bell_icon from "./../../assets/admin-nav-images/bell-icon.png";
import messages_icon from "./../../assets/admin-nav-images/messages-icon.png";
import breifcase_icon from "./../../assets/admin-nav-images/breifcase-icon.png";
import workers_icon from "./../../assets/admin-nav-images/workers-icon.png";
import dropdown_icon from "./../../assets/admin-nav-images/dropdown-icon.png";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "../../assets/admin-nav-images/profile-pic.png";
import useResize from "../../hooks/useResize";
import useDebounce from "../../hooks/useDebounce";
import BottomTab from "./components/BottomTab";
import AccountInformationMenu from "./components/AccountInformationMenu";
import DesktopNotification from "./components/DesktopNotification";
import MobileNotification from "./components/MobileNotification";
import MobileSearchBar from "./components/MobileSearchBar";
import styled from "styled-components";
import MobileMenu from "./components/MobileMenu";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { AdminNavContext } from "../../provider/AdminNav";
import SearchBySlider from "./components/SearchBySlider";
import TopTab from "./components/TopTab";
import { UserDataContext } from "../../contexts/UserDataContext";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";
import { chatState } from "../../contexts/ChatProvider";
import { notificationState } from "../../contexts/NotificationProvider";
import { jobState } from "../../contexts/JobProvider";

function AdminNav({
  fixTab = false,
  setFixTab,
  hideNavBar,
  isSearchBar = false,
  showFilter,
  showLocation,
}) {
  const { totalProject, totalInterview, assignedProjects, assignedInterviews } =
    jobState();
  const { invisible } = chatState();
  const { length: notificationCount } = notificationState();
  const { userData } = useContext(UserDataContext);
  const notificationTriggerRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountInfoMenu, setShowAccountInfoMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBottomTab, setShowBottomTab] = useState(true);
  const showTabs = useDebounce(showBottomTab, 200);
  const [showDesktopNotifications, setShowDesktopNotifications] =
    useState(false);
  const [showMobileNotifications, setShowMobileNotifications] = useState(false);
  const [showSearchTab, setShowSearchTab] = useState(false);
  const scrollDifference = useRef(0);

  const { state, dispatch } = useContext(AdminNavContext);

  const lockScroll = () =>
    document.querySelector("html").classList.add("modal__open");

  const unlockScroll = () =>
    document.querySelector("html").classList.remove("modal__open");

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!userData) {
      // navigate("/login");
    } else {
      setUser(JSON.parse(userData).user);
    }
  }, []);

  useEffect(() => {
    if (showSearch || showAccountInfoMenu || showMobileMenu) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [
    showSearch,
    showAccountInfoMenu,
    showMobileMenu,
    showMobileNotifications,
  ]);

  const handleDrag = (e, info) => {
    if (info.offset.y > 100) {
      setShowSearch(false);
      setFixTab && setFixTab(false);
    }
  };

  const controlMobileTabs = () => {
    setShowMobileMenu(false);
    scrollDifference.current = window.scrollY - lastScrollY;

    if (typeof window !== undefined) {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        setShowBottomTab(false);
      }

      if (window.scrollY > 5 && window.scrollY > lastScrollY) {
        setShowBottomTab(false);
      } else {
        if (
          window.scrollY <= 45 ||
          (scrollDifference.current < 0 &&
            Math.abs(scrollDifference.current) >= 50)
        ) {
          // alert(scrollDifference.current)
          setShowBottomTab(!hideNavBar);
        }
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }

    // top search bar tab
    if (isSearchBar) {
      if (
        window.innerWidth < 861 &&
        document.querySelector("html").scrollTop >= 474
      ) {
        setShowSearchTab(true);
      } else {
        setShowSearchTab(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("scroll", controlMobileTabs, false);

      // clean up function
      return () => {
        window.removeEventListener("scroll", controlMobileTabs);
      };
    }
  }, [lastScrollY, hideNavBar]);

  useEffect(() => {
    if (hideNavBar) {
      setShowBottomTab(false);
    } else {
      setShowBottomTab(true);
    }
  }, [hideNavBar]);

  useEffect(() => {
    if (fixTab) {
      setShowBottomTab(true);
    }
  }, [fixTab]);

  // useResize(() => {
  //     if(window.innerWidth <= 650) {
  //         setShowBottomTab(true)
  //     }
  // })

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="black" />
      </Helmet>
      <AnimatePresence key="y">
        {!state.hideAll && !state.hideTopTab && showTabs ? (
          showSearchTab ? (
            <MobileSearchBar
              showFilter={showFilter}
              showLocation={showLocation}
            />
          ) : (
            <TopTab />
          )
        ) : null}
      </AnimatePresence>

      <div className="admin_first_nav">
        <Link to="/dashboard" className="admin_nav_logo"></Link>
        <div className="admin_nav_primary_links">
          <li>
            <img className="admin_nav_icons" src={breifcase_icon} />
            <Link to="/jobs" className="admin_nav_icon_links">
              {" "}
              My jobs
            </Link>
          </li>
          <li>
            <img className="admin_nav_icons" src={workers_icon} />
            <Link
              to="/dashboard/browse/workers"
              className="admin_nav_icon_links"
            >
              Find Workers
            </Link>
          </li>
          <li>
            <img className="admin_nav_icons" src={messages_icon} />
            <Link to="/chat/contacts" className="admin_nav_icon_links">
              {" "}
              Messages
            </Link>
          </li>
          <li className="relative">
            {notificationCount > 0 && (
              <p className="text-white bg-yellow-500 px-1 h-5 min-w-[0.7rem] z-10 top-[0.4rem] flex justify-center items-center m-0 absolute text-xs rounded-full left-2 font-bold">
                {notificationCount}
              </p>
            )}
            <img className="admin_nav_icons" src={bell_icon} />{" "}
            <Link
              ref={notificationTriggerRef}
              to="/"
              className="admin_nav_icon_links"
              onClick={(e) => {
                e.preventDefault();
                setShowDesktopNotifications(!showDesktopNotifications);
              }}
            >
              {" "}
              Notification
            </Link>
            {/* Desktop Notification */}
            <AnimatePresence key="x">
              {showDesktopNotifications ? (
                <DesktopNotification
                  parentRef={notificationTriggerRef}
                  hide={() => setShowDesktopNotifications(false)}
                />
              ) : null}
            </AnimatePresence>
          </li>
        </div>
        <Link to="/postjob" className="admin_nav_post-job">
          Post a job
        </Link>
        <Profile
          className="static hover:bg-gray-100 transition duration-200"
          onClick={() => setShowAccountInfoMenu(!showAccountInfoMenu)}
        >
          <img
            src={user?.photo?.url || avatarImage}
            style={{ background: "gray", objectFit: "cover" }}
            alt=""
          />
          <div>
            <span className="text-sm font-intersemibold max-w-[10vw] text-ellipsis whitespace-nowrap">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500 max-w-[10vw] text-ellipsis whitespace-nowrap">
              {user?.state}
            </span>
          </div>
        </Profile>

        <div className="absolute right-0 h-[65px] px-3 lg:hidden">
          <Link to="/chat/contacts" className="h-full flex items-center">
            <ChatBubbleOvalLeftEllipsisIcon className="h-8" />
          </Link>
        </div>
      </div>
      <div className="admin_second_nav">
        <div className="admin_second_nav_link-container">
          <Link className="admin_second_nav_links" to="/dashboard">
            Dashboard
          </Link>
          <DropDown className="admin_second_nav_links projects__dropdown">
            Browse Jobs <MagnifyingGlassIcon className="h-4 ml-1 mt-[0.5px]" />
            <div>
              <Link to="/dashboard/browse/projects">Browse Projects</Link>
              {/* <Link to="/dashboard/browse/workers">Browse Workers</Link> */}
              <Link to="/dashboard/browse/interviews">Browse Interviews</Link>
            </div>
          </DropDown>
          <Link
            className="admin_second_nav_links"
            to="/dashboard/browse/services"
          >
            Browse Services
          </Link>
          <DropDown className="admin_second_nav_links projects__dropdown">
            Posted Jobs
            <div>
              <Link
                style={{ display: "flex", justifyContent: "space-between" }}
                to="/posted/projects"
              >
                Posted Projects{" "}
                <div style={{ color: "goldenrod" }}>
                  {" "}
                  ({totalProject ? totalProject : "0"})
                </div>
              </Link>
              <Link
                style={{ display: "flex", justifyContent: "space-between" }}
                to="/posted/interviews"
              >
                Posted Interviews{" "}
                <div style={{ color: "goldenrod" }}>
                  {" "}
                  ({totalInterview ? totalInterview : "0"})
                </div>
              </Link>
              <Link
                style={{ display: "flex", justifyContent: "space-between" }}
                to="/assigned/projects"
              >
                Assigned Projects{" "}
                <div style={{ color: "goldenrod" }}>
                  ({assignedProjects ? assignedProjects : "0"})
                </div>
              </Link>
              <Link
                style={{ display: "flex", justifyContent: "space-between" }}
                to="/assigned/interviews"
              >
                Assigned Interviews{" "}
                <div style={{ color: "goldenrod" }}>
                  {" "}
                  ({assignedInterviews ? assignedInterviews : "0"})
                </div>
              </Link>
            </div>
          </DropDown>
          <Link className="admin_second_nav_links" to="/jobs/interviews">
            My Interviews
          </Link>
          <Link className="admin_second_nav_links" to="/proposals">
            My Proposals
          </Link>
          <Link to={"/Help-center"} className="admin_second_nav_links">
            Help Center
          </Link>
        </div>
      </div>

      {/* bottom tab */}
      <AnimatePresence key="t">
        {!state.hideAll && !state.hideBottomTab && showTabs ? (
          <BottomTab
            showMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
            setFixTab={setFixTab}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            showNotification={() => setShowMobileNotifications(true)}
          />
        ) : null}
      </AnimatePresence>

      {/* Search by component */}
      <AnimatePresence key="u">
        {showSearch ? (
          <SearchBySlider
            handleDrag={handleDrag}
            setShowSearch={setShowSearch}
          />
        ) : null}
      </AnimatePresence>

      {/* mobile navigation menu */}
      <AnimatePresence key="v">
        {showMobileMenu ? <MobileMenu unlockScroll={unlockScroll} /> : null}
      </AnimatePresence>

      {/* Account information menu */}
      <AnimatePresence key="w">
        {showAccountInfoMenu ? (
          <AccountInformationMenu
            setShowAccountInfoMenu={setShowAccountInfoMenu}
            unlockScroll={unlockScroll}
          />
        ) : null}
      </AnimatePresence>

      {/* Mobile Notification */}
      <AnimatePresence key="x">
        {showMobileNotifications ? (
          <MobileNotification hide={() => setShowMobileNotifications(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default AdminNav;

const DropDown = styled.div`
  cursor: pointer;
  position: relative;
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    background-color: #37474f;
    top: 2rem;
    width: fit-content;
    left: -1rem;
    border-radius: 4px;
    padding: 1rem 0.7rem 1rem;
    z-index: 100;
    transition: 0.4s;

    a {
      display: block;
      color: #fff;
      white-space: nowrap;
      margin-bottom: 0.6rem;
      padding-left: 0.5rem;
      border-left: 2px solid transparent;

      :hover {
        color: #daa520;
        border-left-color: #daa520;
      }
    }

    /* :hover {
            pointer-events: all;
            opacity: 1;
        } */
  }

  :hover {
    > div {
      pointer-events: all;
      opacity: 1;
    }
  }
`;

const Profile = styled.div`
  display: none;
  line-height: initial;
  cursor: pointer;

  > img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  > div {
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 63px;
  }

  @media screen and (min-width: 1001px) {
    height: 63px;
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content !important;
    margin-right: 2.5%;
    padding: 0 0.5rem;
  }
`;
