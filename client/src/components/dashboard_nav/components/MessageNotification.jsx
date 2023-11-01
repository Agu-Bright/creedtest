import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { chatState } from "../../../contexts/ChatProvider";
import { postData } from "../../../api/postData";
import { fetchData } from "../../../api/fetchData";
import Announcement from "./Announcement";
import moment from "moment";
import Confirm from "./Confirm";
import { notificationState } from "../../../contexts/NotificationProvider";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import ClientReview from "./ClientReview";
import PostModal from "./PostModal";
// get day algorithm
function getday(date) {
  dayjs.extend(relativeTime);
  const a = dayjs(Date.now());
  return dayjs(date).from(a);
}

function timeAgo(date) {
  const mainDate = Date.parse(date);
  const now = new Date();
  const diff = Math.abs(mainDate - now);

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(weeks / 4);
  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

const MessageNotification = ({
  type,
  image,
  title,
  description,
  createdAt,
  sender,
  projectId,
  proposalId,
  interview,
  read,
  notificationRefs,
  id,
  project,
  interviewApplication,
  postId,
}) => {
  const navigate = useNavigate();
  const { user, token, setSelectedChat } = chatState();
  const { socket, notifications, setNotifications } = notificationState();
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [clientReview, setClienReview] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);

  const accessChat = async () => {
    fetch(
      `/creedlance/accessChat`,
      token
        ? {
            method: "POST",
            body: JSON.stringify({ userId: sender[0]?._id }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    ).then(async (res) => {
      const data = await res.json();
      setSelectedChat(data);
      navigate(`/chat/messages/${data?._id}`);
    });
  };

  const handleAction = () => {
    console.log(type);
    switch (type) {
      case "got-a-proposal":
        navigate(`/dashboard/browse/projects/${projectId}/proposals`);
        break;

      case "interview-application":
        navigate(`/applicants/${interview}`);
        break;

      case "interview-invite":
        (async () => {
          await fetchData(
            `/interviews/${interviewApplication}/invite-an-applicant?confirm=true`
          );
          navigate("/jobs/interviews");
        })();
        break;

      case "message":
        accessChat();
        break;

      case "project-sumbitted":
        setOpenConfirm(true);
        break;

      case "job-completed":
        setClienReview(true);
        break;

      case "award":
        navigate("/jobs/projects");
        break;

      case "like":
        setOpenPostModal(true);
        break;

      case "comment":
        setOpenPostModal(true);
        break;
    }
  };

  const filterEl = (el, notRef) => {
    const elExist = notRef?.current.find((element) => {
      return element.id === el.id;
    });
    return elExist;
  };

  useEffect(() => {
    // Intersection Observer callback
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Notification is in view
          const notificationId = entry.target.id;
          // mark as read
          socket && socket.emit("mark as read", { id, user: user?._id });

          observer.unobserve(entry.target); // Stop observing once it's in view
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    notificationRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  };

  const handeleStyle = (string) => {
    //get the string you want to style
    const styleString = string.substring("for the interview".length);
    return (
      <span style={{ color: "#daa520", fontWeight: "600" }}>
        {truncateString(styleString, 20)}
      </span>
    );
  };

  return (
    <Container
      onClick={handleAction}
      style={{
        background: !read ? "rgb(251 245 228)" : "white",
      }}
      id={id}
      ref={(el) => {
        !read &&
          el !== null &&
          !filterEl(el, notificationRefs) &&
          notificationRefs.current.push(el);
      }}
    >
      {type === "message" ||
      type === "got-a-proposal" ||
      type === "reply" ||
      type === "interview-application" ? (
        <Link to="/dashboard">
          <img
            src={image || avatarImage}
            alt=""
            className="h-[46px] w-[46px] rounded-full profile__pic object-cover"
          />
        </Link>
      ) : type === "like" || type === "dislike" || type === "comment" ? (
        <Link to="/dashboard" className="avatar__list">
          {sender.map((item) => (
            <div className="profile__pic__con" data-content={sender.length}>
              <img
                src={item.photo?.url || avatarImage}
                alt=""
                className="h-10 w-10 rounded-full"
              />
            </div>
          ))}
        </Link>
      ) : type === "successful" ? (
        <TaskAltOutlinedIcon />
      ) : type === "dislike" ? (
        <ThumbUpOutlinedIcon />
      ) : type === "comment" ? (
        <ChatOutlinedIcon />
      ) : type === "award" ? (
        <EmojiEventsOutlinedIcon />
      ) : type === "job-completed" ? (
        <MilitaryTechOutlinedIcon />
      ) : type === "interview-invite" ? (
        <InsertInvitationOutlinedIcon />
      ) : (
        <BusinessCenterOutlinedIcon />
      )}
      <div className="not-details">
        <p className="not-title">{title}</p>
        {type !== "interview-application" &&
          type !== "got-a-proposal" &&
          type !== "like" && <p className="not-description">{description}</p>}
        {type === "interview-application" && (
          <p className="not-description">
            for the interview {handeleStyle(description)}
          </p>
        )}
        {type === "got-a-proposal" && (
          <p className="not-description">
            for the project {handeleStyle(description)}
          </p>
        )}
        {type === "like" && (
          <p className="not-description">
            {sender.length === 1
              ? `${sender[0].name} liked your post`
              : `${sender[sender.length - 1].name} and ${
                  sender.length - 1
                } others liked your post`}
          </p>
        )}

        <div className="not-footer">
          {/* <p className="price">₦1000 - ₦10,0000000000000000</p> */}
          <p className="time"> {timeAgo(new Date(createdAt))}</p>
        </div>
      </div>
      <Announcement
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        projectId={projectId}
        proposalId={proposalId}
      />
      <Confirm
        isOpen={openConfirm}
        setIsOpen={setOpenConfirm}
        sender={sender[0]}
        project={project}
      />
      <ClientReview
        isOpen={clientReview}
        setIsOpen={setClienReview}
        sender={sender[0]}
        project={project}
      />
      {openPostModal && (
        <PostModal
          isOpen={openPostModal}
          setIsOpen={setOpenPostModal}
          postId={postId}
        />
      )}
    </Container>
  );
};

export default MessageNotification;

const Container = styled.div`
  display: flex;
  padding: 0.5rem 2px;
  width: 100%;
  align-items: flex-start;
  cursor: pointer;
  box-sizing: border-box;
  max-width: 100vw;
  margin: 2px 0px;

  .avatar__list {
    display: flex;
    width: 46px !important;
    box-sizing: border-box;
    margin-right: 9px;

    > .profile__pic__con {
      padding: 0;
      height: 1.9rem;
      width: 1.9rem;
      position: relative;
      border: 1px solid #daa520;
      border-radius: 50%;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-sizing: border-box;
      }
    }

    > .profile__pic__con:not(:first-child) {
      margin-left: -23px;
    }

    .profile__pic__con:last-child::after {
      content: attr(data-content);
      height: 1.75rem;
      width: 1.75rem;
      border-radius: 50%;
      background-color: #00000068;
      position: absolute;
      inset: 0;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-size: 0.875rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .profile__pic {
    border: 1px solid #daa520;
    padding: 2px;
    box-sizing: border-box;
    margin-right: 8px;
  }

  > .MuiSvgIcon-root {
    font-size: 2.9rem;
    /* color: #abaaaa; */
    color: #daa520;
    stroke: #fff;
    stroke-width: 1;
    box-sizing: border-box;
    margin-right: 7px;
  }

  > .not-details {
    flex: 1;
    max-width: calc(100vw - 63px);
    position: relative;
    color: #121212;
    box-sizing: border-box !important;

    @media screen and (min-width: 1024px) {
      max-width: calc(400px - 76px);
    }
  }

  > .not-details > p {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 96%;
    position: relative;
    padding: 0;
    box-sizing: border-box;
  }

  > .not-details > .not-title {
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.3em;
    box-sizing: border-box;
  }

  > .not-details > .not-description {
    font-size: 0.75rem;
    box-sizing: border-box;
  }

  > .not-details > .not-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 85%;
    gap: 10px;
    margin-top: 0.3rem;
    box-sizing: border-box;
  }

  > .not-details > .not-footer > p {
    font-size: 0.75rem;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
  }

  > .not-details > .not-footer > p.price {
    flex-shrink: 1;
    max-width: 90%;
    box-sizing: border-box;
  }

  > .not-details > .not-footer > p.time {
    flex-shrink: 0;
    box-sizing: border-box;
  }

  :hover {
    background-color: #ebe6e6;
  }
`;
