import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import { chatState } from "../../../contexts/ChatProvider";
import { notificationState } from "../../../contexts/NotificationProvider";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import { updateData } from "../../../api/updateData";
import { postData } from "../../../api/postData";
// get day algorithm
function getday(date) {
  dayjs.extend(relativeTime);
  const a = dayjs(Date.now());
  return dayjs(date).from(a);
}

const FollowedNotification = ({
  image,
  name,
  username,
  description,
  createdAt,
  notificationRefs,
  read,
  id,
  senderId,

}) => {
  const { user, token, setSelectedChat } = chatState();
  const navigate = useNavigate();
  const { socket } = notificationState();
  useEffect(() => {
    // Intersection Observer callback
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Notification is in view
          const notificationId = entry.target.id;
          console.log(notificationId);
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

  const filterEl = (el, notRef) => {
    const elExist = notRef?.current.find((element) => {
      return element.id === el.id;
    });
    return elExist;
  };
  const [isFollowing, setIsFollowing] = useState();
  useEffect(() => {
    //check if this new notification is already following me
    if (user) {
      const following =
        user.followers.length > 0
          ? user?.followers.find((id) => id === senderId)
          : false;
      following ? setIsFollowing(true) : setIsFollowing(false);
      console.log(user);
    }
  }, [user]);
  const [following, setFollowing] = useState();
  console.log(isFollowing);
  const handleFollow = () => {
    postData(`/users/${senderId}/follow`).then((res) => {
      if (res.ok) {
        setFollowing(true);
      }
    });
  };

  return (
    <Container
      className="flex items-center gap-3"
      style={{
        background: !read ? "rgb(251 245 228)" : "white",
        cursor: "pointer",
      }}
      id={id}
      ref={(el) => {
        !read &&
          el !== null &&
          !filterEl(el, notificationRefs) &&
          notificationRefs.current.push(el);
      }}
    >
      <div className="flex-1 flex items-center gap-2">
        <Link to="/dashboard">
          <img
            src={image}
            alt=""
            className="h-10 w-10 rounded-full profile__pic object-cover"
          />
        </Link>
        <p
          onClick={() => navigate(`/profile/${username}/worker`)}
          className="flex-1 text-xs line-clamp-2 not__description"
        >
          <b>{name}</b>
          {` ${description} ${getday(createdAt)}`}
        </p>
      </div>
      {!isFollowing && (
        <button
          onClick={() => handleFollow()}
          className={`bg-${following ? "secondary" : "primary"}-500 text-${
            following ? "black" : "white"
          } border-none py-1 px-4 font-light rounded-md follow__btn`}
        >
          {" "}
          {`${following ? "following" : "Follow Back"}`}
        </button>
      )}
    </Container>
  );
};

export default FollowedNotification;

const Container = styled.div`
  padding: 0.5rem 2px;

  .profile__pic {
    border: 1px solid #daa520;
    padding: 2px;
  }

  .follow__btn {
    padding: 0.3rem 0.8rem;
  }

  .not__description {
    margin-top: -1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;
