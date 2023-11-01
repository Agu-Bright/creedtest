import React, { useContext, useEffect, useState } from "react";
import "../Dashboards/Dashboard.css";
import notfound from "./notfound.svg";
import DashboardNav from "../../components/dashboard_nav/dashboard_nav";
import { Link, useNavigate } from "react-router-dom";
import postServicesImage from "../../assets/Dashboard/post-services-on-creedlance.png";
import avatarImage from "../../assets/Dashboard/avatar.jpeg";
import CreatePost from "../Profile/Components/CreatePost";
import ProfileProgress from "../Dashboards/components/ProfileProgress";
import MobileMakePost from "../Dashboards/components/MobileMakePost";
import PickLocation from "../../components/common/PickLocation";
import { fetchData } from "../../api/fetchData";
import { UserDataContext } from "../../contexts/UserDataContext";
import CreedlancersToFollow from "../Dashboards/components/CreedlancersToFollow";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  WrenchScrewdriverIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { chatState } from "../../contexts/ChatProvider";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Btn from "../../components/MikesComponents/Btn";

const NotFound = () => {
  const navigate = useNavigate();
  const { socket } = chatState();
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserDataContext);
  const [userId, setUserId] = useState(null);
  const [location, setLocation] = useState(null);
  const [user, setUser] = useState(JSON.parse(userData));

  useEffect(() => {
    setUserId(JSON.parse(userData)?.user?._id);
  }, [userData]);

  const [fixTab, setFixTab] = useState(false);
  const [showCreatePostform, setShowCreatePostForm] = useState(false);
  const [hideNavBar, setHideNavBar] = useState(false);
  const [postType, setPostType] = useState("text");
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    socket &&
      socket.on("new post", (data) => {
        setPosts((prev) => {
          const uniqueMessages = new Set([data.data.savedPost, ...prev]);
          return [...uniqueMessages];
        });
      });
  });

  useEffect(() => {
    if (showCreatePostform || showLocationPicker) {
      setHideNavBar(true);
      document.querySelector("html").classList.add("modal__open");
    } else {
      setHideNavBar(false);
      document.querySelector("html").classList.remove("modal__open");
    }
  }, [showCreatePostform, showLocationPicker]);

  const handleCreatePost = (type) => {
    setShowCreatePostForm(true);
    setPostType(type);
  };

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.body;
      const bottomThreshold = scrollHeight - clientHeight - 1;
      setIsAtBottom(scrollTop >= bottomThreshold - 10);
    };
    const handleScrollMobile = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const bottomThreshold = scrollHeight - clientHeight - 1;
      setIsAtBottom(scrollTop >= bottomThreshold - 10);
    };

    document.body.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollMobile);

    return () => {
      document.body.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollMobile);
    };
  }, []);

  useEffect(() => {
    let localPosts = [...posts];
    if (isAtBottom) {
      setLoading(true);
      fetchData(`/social/get-all-posts?page=${page + 1}`)
        .then((data) => {
          if (data.posts.length > 0) {
            setPage(page + 1);
          } else {
            setPage(1);
          }
          localPosts.push(...data.posts);
          console.log(data, posts);
          setLoading(false);
        })
        .then(() => {
          fetchData(`/projects/get-all-posts?page=${page + 1}`).then((data) => {
            setLoading(false);
            if (data.posts.length > 0) {
              localPosts.push({
                jobs: [
                  ...data.posts.filter(
                    (post) => post?.createdBy?._id != userId
                  ),
                ].slice(0, 4),
              });
            }
            setPosts([...localPosts]);
          });
        });
    }
  }, [isAtBottom]);
  useEffect(() => {
    setLoading(true);
    let localPosts = [];
    fetchData(`/social/get-all-posts?page=${page}`)
      .then((data) => {
        setLoading(false);

        localPosts.push(...data.posts);
      })
      .then(() => {
        fetchData(`/projects/get-all-posts?page=${page}`).then((data) => {
          setLoading(false);

          localPosts.push({
            jobs: [
              ...data.posts.filter((post) => post?.createdBy?._id != userId),
            ].slice(0, 4),
          });
          setPosts([...localPosts]);
        });
      });

    const fixSidebar = () => {
      if (window.innerWidth >= 1024) {
        const sideBar = document.querySelector(
          ".dashboard > .dashboard__container > .wrapper__right"
        );

        if (document.querySelector("body").scrollTop >= 1250) {
          sideBar.classList.add("sticky");
        } else {
          sideBar.classList.remove("sticky");
        }
      }
    };

    document.querySelector("body").addEventListener("scroll", fixSidebar);

    return () => {
      document.querySelector("body").removeEventListener("scroll", fixSidebar);
    };
  }, []);

  return (
    <div className="dash-scroll-area">
      {showCreatePostform && (
        <CreatePost
          hide={() => setShowCreatePostForm(false)}
          postType={postType}
          location={location}
          showLocationPicker={() => {
            setShowLocationPicker(true);
            document.querySelector("html").classList.add("modal__open");
          }}
        />
      )}
      {showLocationPicker && (
        <PickLocation
          onPick={setLocation}
          hide={() => setShowLocationPicker(false)}
        />
      )}
      <DashboardNav
        hideNavBar={hideNavBar}
        fixTab={fixTab}
        setFixTab={setFixTab}
      />
      <div className="dashboard">
        <main className="dashboard__container">
          {/* right section */}

          {/* add not found here */}
          <div
            className="post__list"
            style={{
              width: "100%",
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ margin: "80px", width: "400px", height: "400px" }}
              alt="not found"
              src={notfound}
            />
            <Stack
              spacing={4}
              direction="column"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="h3"
              >
                oops!! page not found
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "100",
                  color: "gray",
                }}
              >
                The page you are looking for does not exist, we suggerst you go
                back to the dashboard.
              </Typography>
              <Btn
                type={2}
                text={"Dashboard"}
                onClick={() => navigate("/dashboard")}
              />
            </Stack>
          </div>
          {/* Left section */}
        </main>
      </div>
    </div>
  );
};

export default NotFound;
