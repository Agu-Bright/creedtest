import React, { useContext } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  UserIcon,
  BellIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import styled from "styled-components";
import { AdminNavContext } from "../../../provider/AdminNav";
import { notificationState } from "../../../contexts/NotificationProvider";
const BottomTab = ({
  setFixTab,
  showSearch,
  setShowSearch,
  showNotification,
  showMenu,
  setShowMobileMenu,
}) => {
  const location = useLocation();
  const { dispatch } = useContext(AdminNavContext);
  const { length: notificationCount } = notificationState();

  return (
    <Container
      as={motion.div}
      initial={{ y: "100%" }}
      animate={{ y: "0.7%" }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${isActive ? "text-primary-500" : "text-black"}`
          }
        >
          {/* <HomeIcon className='tab__icon' /> */}
          {location.pathname.includes("/dashboard") ? (
            <HomeIconSolid className="tab__icon__solid" />
          ) : (
            <HomeIcon className="tab__icon" />
          )}
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/"
          onClick={(e) => {
            e.preventDefault();
            setFixTab && setFixTab(true);
            setShowSearch(!showSearch);
          }}
          className={({ isActive }) =>
            `${isActive ? "text-primary-500" : "text-black"}`
          }
        >
          <MagnifyingGlassIcon className="tab__icon" />
          <span>Search</span>
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `${isActive ? "text-primary-500" : "text-black"}`
          }
        >
          {location.pathname.includes("/jobs") ? (
            <BriefcaseIconSolid className="tab__icon__solid" />
          ) : (
            <BriefcaseIcon className="tab__icon" />
          )}
          <span>Jobs</span>
        </NavLink>
        <NavLink
          to="/"
          onClick={(e) => {
            e.preventDefault();
            showNotification();
          }}
          className={({ isActive }) =>
            `${isActive ? "text-primary-500 relative" : "text-black relative"}`
          }
        >
          {notificationCount > 0 && (
            <p className="text-white bg-yellow-500 px-1 h-5 min-w-[0.7rem] z-10 -top-[0.5rem] flex justify-center items-center m-0 absolute text-xs rounded-full right-2 font-bold">
              {notificationCount}
            </p>
          )}
          <BellIcon className="tab__icon" />
          <span>Notification</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${isActive ? "text-primary-500" : "text-black"}`
          }
        >
          {location.pathname.includes("/profile") ? (
            <UserIconSolid className="tab__icon__solid" />
          ) : (
            <UserIcon className="tab__icon" />
          )}
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${showMenu ? "text-primary-500" : "text-black"}`
          }
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: showMenu ? "SHOW_ALL" : "SHOW_BOTTOM_TAB_ONLY" });
            setShowMobileMenu(!showMenu);
          }}
        >
          <Bars3Icon className="tab__icon" />
          <span>Menu</span>
        </NavLink>
      </div>
    </Container>
  );
};

export default BottomTab;

const Container = styled(motion.div)`
  position: fixed;
  bottom: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100vw;
  z-index: 1800;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.5rem;

    > a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      width: 15.6%;

      .tab__icon {
        height: 1.5em;
        stroke-width: 2;
      }

      .tab__icon__solid {
        height: 1.5rem;
      }

      span {
        font-size: 0.6em;
      }
    }
  }

  @media screen and (min-width: 651px) {
    display: none;
  }
`;
