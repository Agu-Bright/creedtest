import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { motion } from "framer-motion";
import NotificationGroup from "./NotificationGroup";
import FollowedNotification from "./FollowedNotification";
import applicantImage from "../../../assets/dashboard/applicant.png";
import MessageNotification from "./MessageNotification";
import { fetchData } from "../../../api/fetchData";
import { notificationState } from "../../../contexts/NotificationProvider";
import nonnotification from "../../../assets/Dashboard/nonotification.svg";
const DesktopNotification = ({ hide, parentRef }) => {
  const { user, notifications, setNotifications, loading, setLoading, socket } =
    notificationState();
  const menuRef = useRef(null);
  const notificationRefs = useRef([]);

  const [myPropid, setMyPropId] = useState();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target !== parentRef.current
      ) {
        hide();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchData("/notifications/get-My-notifications").then((res) => {
        setNotifications(res.myNotification);
        setLoading(false);
      });
    })();
  }, []);

  const getProposalId = (proposalArray) => {
    if (proposalArray) {
      const myProp = proposalArray.find((prop) => prop.createdBy === user?._id);
      return myProp._id;
    }
  };

  return (
    <Container
      ref={menuRef}
      as={motion.div}
      animate={{
        opacity: [0, 1],
        transition: {
          type: "none",
          duration: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          type: "none",
          duration: 0.1,
        },
      }}
    >
      <TopBar>
        {/* <ArrowBackIosNewOutlinedIcon onClick={hide} /> */}
        <p>Notifications</p>
      </TopBar>
      {loading && (
        <div
          id="mike"
          style={{
            width: "inherit",
            zIndex: 10000,
            overflow: "hidden",
          }}
          className="relative"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: "repeat", duration: 1 }}
            style={{ width: "100%" }}
            className="h-1 bg-primary-500"
          ></motion.div>
        </div>
      )}
      {notifications.length === 0 && !loading && (
        <div className="h-full flex justify-center items-center">
          <div>
            <img className="h-28" src={nonnotification} alt="" />
            <p className="text-center text-gray-600/50 text-sm">
              No notifications yet
            </p>
          </div>
        </div>
      )}

      {notifications.length > 0 && (
        <NotificationList>
          <NotificationGroup>
            {notifications.length > 0 &&
              !loading &&
              notifications.map((notification) => {
                if (notification.type === "follow") {
                  return (
                    <FollowedNotification
                      key={notification._id}
                      notificationRefs={notificationRefs}
                      image={notification?.sender[0]?.photo?.url}
                      name={notification?.sender[0]?.name}
                      username={notification?.sender[0]?.username}
                      senderId={notification?.sender[0]?._id}
                      description="Started following you."
                      createdAt={notification.createdAt}
                      read={notification.read}
                      id={notification._id}
                    />
                  );
                }
                return (
                  <MessageNotification
                    key={notification._id}
                    id={notification._id}
                    notificationRefs={notificationRefs}
                    type={notification.type}
                    image={notification?.sender[0]?.photo?.url}
                    title={notification.title}
                    description={notification.description}
                    createdAt={notification.createdAt}
                    sender={notification.sender}
                    projectId={notification?.project?._id}
                    proposalId={
                      notification.type === "award" &&
                      getProposalId(notification?.project?.proposals)
                    }
                    interview={notification?.interview}
                    read={notification.read}
                    project={notification?.project}
                    interviewApplication={notification?.interviewApplication}
                    postId={notification.post}
                  />
                );
              })}
            {/* {Array(5)
              .fill("")
              .map((_, i) => (
                <FollowedNotification
                  key={i + "desk-today"}
                  image={applicantImage}
                  name="jumboleettle"
                  description="Started following you."
                />
              ))} */}

            {/* <MessageNotification
            type="like"
            image={applicantImage}
            title="Tonye williams and 5 others liked your post"
            description="However, you can pass the dynamic content value as a prop to the child component, and then use that prop within the child component to achieve the desired effect."
          />
          <MessageNotification
            type="dislike"
            image={applicantImage}
            title="Tonye williams and 5 others disliked your post"
            description="However, you can pass the dynamic content value as a prop to the child component, and then use that prop within the child component to achieve the desired effect."
          />
          <MessageNotification
            type="comment"
            image={applicantImage}
            title="Tonye williams and 5 others commented on your post"
            description="However, you can pass the dynamic content value as a prop to the child component, and then use that prop within the child component to achieve the desired effect."
          />
          <MessageNotification
            type="award"
            title="Your were awarded a project"
            description="Tonye awarded you a project"
          />
          <MessageNotification
            type="got-a-proposal"
            title="You have a new proposal"
            description="Tonye williams sent a proposal"
            image={applicantImage}
          />
          <MessageNotification
            type="interview-application"
            title="You have a new applicant"
            description="Tonye williams applied for the interview"
            image={applicantImage}
          />
          <MessageNotification
            type="job-completed"
            title="Congratulations"
            description="You completed a project"
          />
          <MessageNotification
            type="interview-invite"
            title="You have an invite"
            description="Tonye invited you for an interview"
          />
          <MessageNotification
            type="successful"
            title="New post"
            description="Your post was posted successfully"
          />
          <MessageNotification
            type="successful"
            title="New Project"
            description="Your project was posted successfully"
          />
          <MessageNotification
            type="successful"
            title="New Interview"
            description="Your interview was posted successfully"
          /> */}
          </NotificationGroup>
          {/* <NotificationGroup title="Yesterday">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <FollowedNotification
                key={i + "desk-yesterday"}
                image={applicantImage}
                name="jumboleettle"
                description="Started following you."
              />
            ))}
        </NotificationGroup> */}
        </NotificationList>
      )}
    </Container>
  );
};

export default DesktopNotification;

const Container = styled(motion.div)`
  background-color: #fff;
  position: absolute;
  height: 500px;
  width: 400px;
  z-index: 1800;
  display: flex;
  flex-direction: column;
  right: -160px;
  top: 60px;
  line-height: initial;
  box-shadow: 0px 2px 4px #929090;
  border-radius: 8px;

  ::after {
    position: absolute;
    content: "";
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #e7e2e2 transparent;
    top: -20px;
    left: 190px;
  }
`;

const TopBar = styled.div`
  height: 49px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 2000;
  background-color: #fff;

  > p {
    /* text-align: center; */
    margin: 0;
  }

  > .MuiSvgIcon-root {
    position: absolute;
    left: 10px;
  }
`;
const NotificationList = styled.div`
  width: 100%;
  max-width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: #cdccca #fff;
  scrollbar-width: thin;

  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #fff;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #cdccca;
    height: 20px !important;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #989696;
  }
`;
