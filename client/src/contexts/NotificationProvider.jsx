import React, { createContext, useContext, useEffect, useState } from "react";
const ENDPOINT = "http://localhost:3500";
import io from "socket.io-client";
import { chatState } from "./ChatProvider";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const { socket, user, token } = chatState();
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState();
  const [selectedChatCompare, setSelectedChatCompare] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = React.useState("");

  useEffect(() => {
    if (socket) {
      socket.emit("setup", user);
      socket.emit("notification", user._id);
      socket.on("new notification", (length) => setLength(length));
    }
  });

  //fetch notification count

  const createNotification = async (notification) => {
    fetch(
      `/creedlance/notifications/create-notification`,
      token
        ? {
            method: "POST",
            body: JSON.stringify(notification),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    ).then(async (res) => {
      const data = await res.json();
      console.log(data);
      hide;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        createNotification,
        user,
        loading,
        setLoading,
        socket,
        selectedChatCompare,
        setSelectedChatCompare,
        token,
        notifications,
        setNotifications,
        count,
        setCount,
        length,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const notificationState = () => {
  return useContext(NotificationContext);
};

export default NotificationProvider;
