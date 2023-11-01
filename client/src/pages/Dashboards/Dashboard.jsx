import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import DashboardNav from "../../components/dashboard_nav/dashboard_nav";
import { Link } from "react-router-dom";
import postServicesImage from "../../assets/Dashboard/post-services-on-creedlance.png";
import avatarImage from "../../assets/Dashboard/avatar.jpeg";
import PostCard from "./components/PostCard";
import CreatePost from "../Profile/Components/CreatePost";
import ProfileProgress from "./components/ProfileProgress";
import MobileMakePost from "./components/MobileMakePost";
import DesktopMakePost from "./components/DesktopMakePost";
import FollowCreedMobile from "./components/FollowCreedMobile";
import PickLocation from "../../components/common/PickLocation";
import aboutVideo from "../../assets/video/about-us-creedlance-video.mp4";
import saryPostImage from "../../assets/Dashboard/sary-post-image.png";
import { fetchData } from "../../api/fetchData";
import { UserDataContext } from "../../contexts/UserDataContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import CreedlancersToFollow from "./components/CreedlancersToFollow";
import { motion } from "framer-motion";
import Loader from "../../components/MikesComponents/Loader";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  WrenchScrewdriverIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { chatState } from "../../contexts/ChatProvider";

const Dashboard = () => {
  const { socket } = chatState();
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserDataContext);
  const [userId, setUserId] = useState(null);
  const [location, setLocation] = useState(null);
  const [user, setUser] = useState(JSON.parse(userData));

  useEffect(() => {
    setUserId(JSON.parse(userData).user?._id);
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
          <div className="wrapper__right">
            {/* make post on mobile */}
            <MobileMakePost
              showModal={handleCreatePost}
              showLocationPicker={() => {
                setShowLocationPicker(true);
              }}
            />

            {/* complete profile */}
            <ProfileProgress user={JSON.parse(userData).user} />

            {/* work analytics */}
            <WorkAnalytics />

            {/* post services on creedlance */}
            <Link to="/post-service" className="post__services">
              <div>
                <img src={postServicesImage} alt="" />
              </div>
            </Link>

            {/* Creedlancers to follow */}
            <CreedlancersToFollow />
          </div>

          {/* main section (posts) */}
          <div className="wrapper__middle">
            {/* create post */}
            <DesktopMakePost
              showModal={handleCreatePost}
              showLocationPicker={() => {
                setShowLocationPicker(true);
                document.querySelector("html").classList.add("modal__open");
              }}
            />

            {/* posts */}
            <div className="post__list">
              {/* <PostCard
								files={[
									{ type: "image", url: saryImage },
									{ type: "image", url: saryImage },
									{ type: "image", url: saryImage },
									{ type: "image", url: saryImage },
									{ type: "video", url: aboutVideo, poster: saryImage },
								]}
								description={"hello"}
								hideNavBar={() => setHideNavBar(true)}
								showNavBar={() => setHideNavBar(false)}
							/> */}

              {posts?.length > 0 ? (
                <>
                  <FollowCreedMobile title="Creedlancers to follow" />

                  {posts.map((post, i) =>
                    !post.jobs ? (
                      <div key={`${post._id}-${i}`}>
                        <PostCard
                          post={post}
                          id={post._id}
                          files={post?.photos?.map((photo) => {
                            return {
                              type: photo?.type ? photo?.type : "image",
                              url: photo?.url,
                            };
                          })}
                          // { type: "image", url: saryImage },
                          // { type: "video", url: aboutVideo, poster: saryImage },
                          description={post.description}
                          hideNavBar={() => setHideNavBar(true)}
                          showNavBar={() => setHideNavBar(false)}
                        />
                        {/* <hr className="border-2 lg:hidden border-zinc-300" /> */}
                      </div>
                    ) : (
                      <InterestedIn jobs={post.jobs} />
                    )
                  )}

                  {/* <FollowCreedMobile title="Enterprises to follow" /> */}
                </>
              ) : (
                !loading && (
                  <div
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      background: "white",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    No posts yet
                  </div>
                )
              )}
              <Loader loading={loading} />
            </div>
          </div>

          {/* Left section */}
          <div className="hidden lg:block w-64">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Cover image */}
              <div className="h-14 bg-[#ecebeb] w-full">
                {user?.user?.coverPhoto?.url && (
                  <img
                    src={user?.user?.coverPhoto?.url}
                    className="h-full w-full object-cover"
                    alt="cover image"
                  />
                )}
              </div>

              {/* profile photo */}
              <div className="h-12 relative flex justify-center">
                <img
                  src={user?.user?.photo?.url || avatarImage}
                  alt=""
                  className="h-20 w-20 rounded-full object-cover absolute -top-8 border-2 border-solid border-white"
                />
              </div>

              {/* lil info */}
              <div className="text-center pt-2 pb-3 border-b border-t-0 border-l-0 border-r-0 border-solid border-b-gray-200">
                <Link
                  to="/profile/posts"
                  className="text-base font-intermedium"
                >
                  {user?.user?.name}
                </Link>
                <p className="text-gray-500 text-xs font-light px-2 pt-1">
                  {user?.user?.aboutMe}
                </p>
              </div>
              <div className="pt-4">
                <ul className="flex justify-between flex-col gap-2 text-xs text-zinc-500 font-medium capitalize list-none w-full pl-0">
                  <li className="flex justify-between px-2">
                    <div className="flex gap-2 text-zinc-700">
                      <BuildingOffice2Icon className="h-4" /> Account
                    </div>
                    {user?.role == "enterprise"
                      ? "Enterprise Account"
                      : "Creedlancer Account"}{" "}
                  </li>
                  <li className="flex justify-between gap-x-2 px-2">
                    <div className="flex gap-2 text-zinc-700">
                      <PhoneIcon className="h-4" />
                      Phone
                    </div>
                    <span className="max-w-[60%] whitespace-nowrap overflow-hidden text-ellipsis">
                      {user?.user?.phoneNumber}
                    </span>
                  </li>
                  <li className="flex justify-between px-2">
                    <div className="flex gap-2 text-zinc-700">
                      <EnvelopeIcon className="h-4" />
                      Email
                    </div>
                    <span className="max-w-[60%] whitespace-nowrap overflow-hidden text-ellipsis">
                      {user?.user?.email}
                    </span>
                  </li>
                  <li className="flex justify-between px-2">
                    <div className="flex gap-2 text-zinc-700">
                      <WrenchScrewdriverIcon className="h-4" />
                      Occupation
                    </div>
                    <span className="max-w-[60%] whitespace-nowrap overflow-hidden text-ellipsis">
                      {user?.user?.occupation}
                    </span>
                  </li>
                  <li className="flex justify-between px-2">
                    <div className="flex gap-2 text-zinc-700">
                      <MapPinIcon className="h-4" /> Location
                    </div>
                    <span className="max-w-[60%] whitespace-nowrap overflow-hidden text-ellipsis">
                      {user?.user?.city}, {user?.user?.state}
                    </span>
                  </li>
                  <li className="border-t border-solid border-x-0 border-b-0 border-t-gray-200">
                    <Link
                      to={"/settings/profile"}
                      className="flex justify-center gap-2 py-4 mt-4 pr-4 items-center w-full underline text-zinc-700 rounded cursor-pointer"
                    >
                      <PencilIcon className="h-4" /> Edit Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const WorkAnalytics = () => {
  const [postedProjects, setPostedProjects] = useState(0);
  const [myProjects, setMyProjects] = useState(0);
  const [myProposals, setMyProposals] = useState(0);

  useEffect(() => {
    fetchData("/projects/get-posted-projects").then((data) => {
      setPostedProjects(data?.projects.length);
    });
    fetchData("/projects/get-my-jobs").then((data) => {
      setMyProjects(data?.posts.length);
    });
    fetchData("/bid/getMyProposals").then((data) => {
      setMyProposals(data?.proposals.length);
    });
  }, []);
  return (
    <div className="work__analytics">
      <Link to="/posted/projects">
        <h6>Posted Projects</h6>
        <p>{postedProjects}</p>
      </Link>
      <Link to="/jobs/projects">
        <h6>My Jobs</h6>
        <p>{myProjects}</p>
      </Link>
      <Link to="/proposals/projects">
        <h6>My Proposals</h6>
        <p>{myProposals}</p>
      </Link>
    </div>
  );
};

const InterestedIn = ({ jobs }) => {
  return (
    <section className="interested__in">
      <h2>You may be interested in</h2>
      <div className="interest__list">
        {jobs.map((job, i) => (
          <div className="suggested" key={i}>
            <div className="left">
              <img
                src={job?.createdBy?.photo?.url}
                className="bg-zinc-500"
                alt=""
              />
              <p>
                <span className="text-lg capitalize">
                  {job?.occupation} needed
                </span>
                <br />
                {job?.description}
              </p>
            </div>
            <Link to={"/dashboard/browse/projects/" + job._id}>Apply</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
