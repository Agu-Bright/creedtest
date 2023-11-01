import React, { useEffect, useState } from "react";
import "./Project.css";
import ProjectCard from "../../../components/dashboard/ProjectCard";
import MobileFilterBar from "../../../components/dashboard/MobileFilterBar";
import ResultBar from "../../../components/dashboard/ResultBar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchData } from "../../../api/fetchData";
import Loader from "../../../components/MikesComponents/Loader";
import { chatState } from "../../../contexts/ChatProvider";
const Projects = ({ showFilter, searchValue, filter, location }) => {
  dayjs.extend(relativeTime);
  const { socket } = chatState();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    socket &&
      socket.on("new project", (data) => {
        console.log(data);
        posts &&
          setPosts((prev) => {
            console.log("setting posts");
            const uniquePosts = new Set([data.data.newProject, ...prev]);
            return [...uniquePosts];
          });
      });
  });

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
    if (isAtBottom) {
      setLoading(true);
      fetchData(
        `/projects/get-all-posts?page=${page + 1}${filter}${
          searchValue ? "&search=" + searchValue : ""
        }${
          location ? "&jobLocation=" + `${location.lga}, ${location.state}` : ""
        }`
      ).then((data) => {
        setPage(page + 1);
        setPosts([...posts, ...data.posts.reverse()]);
        setLoading(false);
      });
    }
  }, [isAtBottom]);

  useEffect(() => {
    setPage(1);
    setLoading(true);
    fetchData(
      `/projects/get-all-posts?page=${page}${filter}${
        searchValue ? "&search=" + searchValue : ""
      }${
        location ? "&jobLocation=" + `${location.lga}, ${location.state}` : ""
      }`
    ).then((data) => {
      setPosts([...data.posts.reverse()]);
      setLoading(false);
    });
  }, [searchValue, filter, location]);

  return (
    <div className="browse__projects">
      <div className="browse__projects__container">
        {/* Mobile filter bar */}
        <MobileFilterBar showFilter={showFilter} />

        {/* Result bar */}
        <ResultBar />

        {/* projects list */}
        <div className="project__list">
          {posts && posts.length > 0
            ? posts.map(
                ({
                  _id,
                  title,
                  proposals,
                  description,
                  skills,
                  budget,
                  createdAt,
                  category,
                }) => (
                  <ProjectCard
                    key={_id}
                    id={_id}
                    proposals={proposals}
                    title={title}
                    description={description}
                    skills={skills}
                    budget={budget}
                    createdAt={createdAt}
                    category={category}
                  />
                )
              )
            : !loading && (
                <div
                  style={{
                    padding: "8px",
                    background: "white",
                    border: "2px solid gray",
                    margin: "16px 0px",
                  }}
                  className="w-full p-6 bg-white border"
                >
                  No posts yet
                </div>
              )}
          <Loader loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
