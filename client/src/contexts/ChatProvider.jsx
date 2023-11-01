import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState();
  const [selectedChatCompare, setSelectedChatCompare] = useState("");
  const [token, setToken] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [istyping, setIsTyping] = useState("");
  const [state, setState] = useState(false);
  const [message, setMessage] = useState("");
  const [chatTyping, setChatTyping] = useState("");
  const [invisible, setInvisible] = React.useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data?.user);
    setToken(data?.token);
  }, []);

  useEffect(() => {
    if (user) {
      const ENDPOINT = `http://localhost:3500?userId=${user?._id}`;
      setSocket(io(ENDPOINT));
    }
  }, [user]);

  socket && socket.emit("setup", user);
  useEffect(() => {
    socket && socket.on("connected", () => setSocketConnected(true));
  }, [socket]);

  useEffect(() => {
    if (socket) {
      // socket.on("connected", () => {
      //   window.alert("helloohoiho");
      //   setSocketConnected(true);
      // });
      // socket.on("new notification", console.log("new notification "));

      socket.on("helloo", () => console.log("hello"));
      socket.on("typing", ({ user, chat }) => {
        setIsTyping(user);
        setChatTyping(chat);
      });
      socket.on("stop typing", ({ user, chat }) => {
        setIsTyping("");
        setChatTyping("");
      });
      socket.on("message read", (message) => {
        console.log("message read");
        if (selectedChat._id === message.chat) {
          console.log("heyy");
          const msg = messages.find((msg) => msg._id === message._id);
          console.log(msg);
        }
        // setState((prev) => !prev);
        // messages && setMessages([...messages, message]);
      });
      user && socket.emit("setOnline", user);
      // socket.on("is online", (result) => {});
      if (
        location.path !== "/chat/contacts" ||
        location.path !== "/chat/messages"
      ) {
        socket.emit("setOffline", user);
      }
    }
  });

  const accessChat = async (id) => {
    fetch(
      `/creedlance/accessChat`,
      token
        ? {
            method: "POST",
            body: JSON.stringify({ userId: id }),
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

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        loading,
        setLoading,
        setSelectedChatCompare,
        selectedChatCompare,
        messages,
        setMessages,
        socketConnected,
        state,
        setState,
        token,
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        istyping,
        setIsTyping,
        setChatTyping,
        chatTyping,
        invisible,
        accessChat,
        message,
        setMessage,
        posts,
        setPosts,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
