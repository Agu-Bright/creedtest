import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "@heroicons/react/20/solid";
import { chatState } from "../../../contexts/ChatProvider";
import {
  getSender,
  getSenderImage,
  formatTimestamp,
  getSenderRole,
  getSenderOnline,
  getSenderId,
} from "../config/ChatLogics";
import { Avatar, CircularProgress } from "@mui/material";
import { fetchData } from "../../../api/fetchData";
import image from "../assets/nochat.svg";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import animationData from "./animations/typing.json";
import FileUploadModal from "./fileUploadModal";
import "./typing.css";

const Messages = () => {
  const messageREf = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const newMessageRef = useRef([]);
  const {
    loading,
    setLoading,
    socket,
    selectedChatCompare,
    setSelectedChatCompare,
    messages,
    setMessages,
    socketConnected,
    token,
    user,
    selectedChat,
    istyping,
    setState,
    chatTyping,
    message,
    setMessage,
  } = chatState();

  //states
  const [emoji, setEmoji] = useState(false);
  const [typing, setTyping] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Automatically scroll to the bottom when messages change
    if (messages && messageREf.current) {
      messageREf.current.scrollTop = messageREf.current?.scrollHeight;
    }
  }, [messages]);

  const isMobile = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    if (isMobile && !selectedChat) {
      navigate("/chat/contacts");
    }
  }, [isMobile]);

  //fetchMessages
  const fetchMessages = async (id) => {
    if (!id) return;
    setMessage("");
    setLoading(true);
    await fetchData(`/message/${id}`)
      .then((res) => {
        setMessage("");
        setEmoji(false);
        setMessages(res.messages);
        setLoading(false);
        socket.emit("join chat", id);
      })
      .catch((err) => {
        // showModal(err, false);
        setLoading(false);
      });
  };
  // create notification
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
      const { data } = await res.json();
      // socket.emit("notification", data.receiver);
    });
  };

  const handleSendMessage = async (data, file) => {
    setIsOpen(false);
    console.log(data);
    // if (!message || !data) {
    //   return;
    // }
    socket &&
      selectedChat &&
      socket.emit("stop typing", { chat: selectedChat._id, user: user?._id });
    console.log("time to set new message");
    let newMessage;
    if (!data) {
      newMessage = {
        content: message,
        createdAt: date,
        sender: {
          _id: user?._id,
        },
        loading: true,
      };
    } else {
      newMessage = {
        photos: [file],
        createdAt: date,
        sender: {
          _id: user?._id,
        },
        loading: true,
      };
    }

    setMessages([...messages, newMessage]);
    setMessage("");
    setEmoji(false);

    if (!data) {
      fetch(
        `/creedlance/message`,
        token && {
          method: "POST",
          body: JSON.stringify({
            content: newMessage.content,
            chatId: selectedChat._id,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(async (res) => {
        setMessage("");
        const data = await res.json();
        setMessages([...messages, data]); //BUG..
        socket && socket.emit("new message", data);
        setState((prev) => !prev);
        //will move this to the backend
        createNotification({
          receiver:
            data.chat?.users[1]._id === user?._id
              ? data.chat?.users[0]._id
              : data.chat?.users[1]._id,
          type: "message",
          title: `${data.sender?.name} messaged you`,
          description: data?.content,
        });
      });
    } else {
      fetch(
        `/creedlance/message/upload`,
        token && {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(async (res) => {
        setMessage("");
        const data = await res.json();
        setMessages([...messages, data]); //BUG..
        socket && socket.emit("new message", data);
        setState((prev) => !prev);
        //will move this to the backend
        createNotification({
          receiver:
            data.chat?.users[1]._id === user?._id
              ? data.chat?.users[0]._id
              : data.chat?.users[1]._id,
          type: "message",
          title: `${data.sender?.name} messaged you`,
          description: "image",
        });
      });
    }
  };
  const typingHandler = (e) => {
    setMessage(e.target.value);

    // if (!socketConnected) return console.log("no socket connected");

    if (!typing && user) {
      setTyping(true);
      socket.emit("typing", { chat: selectedChat._id, user: user?._id });
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 5000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", { chat: selectedChat._id, user: user?._id });
        setTyping(false);
      }
    }, timerLength);
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    fetchMessages(id);

    setSelectedChatCompare(selectedChat);
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    if (socket) {
      socket.on("message recieved", (newMessageRecieved) => {
        // if (newMessageRecieved && id !== newMessageRecieved?.chat?._id) {
        //   //give notification
        //   setState((prev) => !prev);
        // } else if (id === newMessageRecieved?.chat?._id) {
        //   // messages && setMessages([...messages, newMessageRecieved]);
        //   setState((prev) => !prev);
        // }
        console.log(newMessageRecieved);
        const filterMessages = (oldMessages, newInMessage) => {
          const messageAvailable = oldMessages.find(
            (message) => message._id === newInMessage._id
          );
          console.log(messageAvailable);
          return messageAvailable;
        };
        if (newMessageRecieved?.chat._id !== id) {
          console.log("there should be no notification");
          setState((prev) => !prev);
        } else {
          messages &&
            setMessages((prev) => {
              if (id === newMessageRecieved.chat._id) {
                const uniqueMessages = new Set([
                  ...messages,
                  newMessageRecieved,
                ]);
                return [...uniqueMessages];
              }
            });
          console.log(messages);
        }
      });
    }
    socket &&
      socket.on("unread message", (message) => {
        setState((prev) => !prev);

        setMessages([...messages, message]);
      });
  });

  useEffect(() => {
    // Intersection Observer callback
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // message in view
          const messageId = entry.target.id;
          console.log(messageId);
          // mark as read
          socket &&
            socket.emit("read message", {
              newMessage: messageId,
              user: user?._id,
              chat: selectedChat,
            });
          observer.unobserve(entry.target); // Stop observing once it's in view
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    newMessageRef.current.forEach((ref) => {
      observer.observe(ref);
    });

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  });

  const filterEl = (el, msgRef) => {
    const elExist = msgRef?.current.find((element) => {
      return element.id === el.id;
    });
    return elExist;
  };
  const [upload, setUpload] = useState("");
  const [formData, setFormData] = useState();

  //FILE UPLOAD
  const handlefileupload = async (e) => {
    e.preventDefault();
    //set the conent of the form to the formdata
    const formData = new FormData(e.currentTarget);
    formData.append("additionalData", id);
    message && formData.append("message", message);
    const file = formData.get("message_file");
    setFormData(formData);
    console.log(file);
    setUpload(file);
    const url = URL.createObjectURL(file);
    console.log(url);
    setIsOpen(true);
    setUpload(url);
    //send file through api call
    // handleSendMessage(formData, file);
  };

  const handleChange = async () => {
    document.getElementById("submit").click();
  };

  //no selected chat
  if (!selectedChat) {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        className={`${
          location.pathname != "/chat/contacts" ? "flex" : "hidden"
        } col-span-3 px-0 lg:px-10 lg:flex flex-col h-full`}
      >
        <div className="flex flex-col gap-2 items-center mt-20 w-full lg:mx-auto">
          <img src={image} className="h-40 md:h-64" alt="" />
          <p className={`lg:max-w-sm text-xs md:text-base text-center`}>
            Select a chat to Start a conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className={`${
        location.pathname != "/chat/contacts" ? "flex" : "hidden"
      } lg:pt-6  col-span-3 px-0 lg:px-10 lg:flex flex-col h-full`}
    >
      <div className="flex gap-2 justify-between lg:bg-primary-100 border-b lg:border-none p-2 items-center text-zinc-200 md:text-zinc-700 bg-[#455A64]">
        <ChevronLeftIcon
          onClick={() => navigate(-1)}
          className="h-6 text-zinc-200 w-8 lg:hidden cursor-pointer"
        />
        <div className="w-10 lg:hidden ">
          {!selectedChat.isGroupChat ? (
            <Avatar src={`${getSenderImage(user, selectedChat.users)}`} />
          ) : (
            <Avatar />
          )}{" "}
        </div>
        <div className="w-14 hidden lg:block">
          {!selectedChat.isGroupChat ? (
            <Avatar src={`${getSenderImage(user, selectedChat.users)}`} />
          ) : (
            <Avatar />
          )}
        </div>{" "}
        <div className="flex justify-center flex-col h-14 w-full">
          <h4
            className="lg:text-lg text-zinc-100 md:text-zinc-800 font-semibold capitalize"
            onClick={() =>
              navigate(
                `/profile/${getSenderId(user, selectedChat.users)}/worker`
              )
            }
            style={{ cursor: "pointer" }}
          >
            {getSender(user, selectedChat.users)}
          </h4>
          <p
            className="text-xs"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            {getSenderOnline(user, selectedChat.users) ? (
              <>
                <span class="status-text">Online</span>
                <span class="dot online"></span>
              </>
            ) : (
              <>
                <span class="status-text">offline</span>
                <span class="dot offline"></span>
              </>
            )}
          </p>
          <p className="text-xs hidden lg:block">
            {getSenderRole(user, selectedChat.users)}
          </p>
        </div>
      </div>
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

      <div className="h-full relative">
        <ul
          className="flex flex-col mt-2 lg:mt-8 w-full absolute top-0 bottom-0 clb overflow-auto lg:pr-2 text-sm lg:text-base px-2"
          ref={messageREf}
        >
          {messages &&
            !loading &&
            messages.map(
              ({
                _id,
                content,
                createdAt,
                sender,
                readBy,
                loading,
                chat,
                photos,
              }) => {
                if (!loading && id !== chat?._id) return "";
                return (
                  <>
                    <li
                      key={_id}
                      id={_id}
                      ref={(el) => {
                        !loading &&
                          !readBy[0] &&
                          sender._id !== user?._id &&
                          el !== null &&
                          !filterEl(el, newMessageRef) &&
                          newMessageRef.current.push(el);
                      }}
                      className={`w-max px-3 py-2 max-w-[70vw] break-words lg:max-w-md rounded flex flex-col ${
                        sender?._id === user?._id
                          ? " self-end bg-primary-100"
                          : "bg-zinc-200"
                      }`}
                    >
                      <div className="pb-2 font-medium">{content} </div>
                      {photos &&
                        !loading &&
                        photos.map((photo) => (
                          <img src={photo?.secure_url} alt="photo" />
                        ))}
                      {photos && loading && <img src={photos[0]} alt="photo" />}
                      <div className="flex flex-col justify-end items-end text-zinc-700 text-xs">
                        {formatTimestamp(createdAt)}
                        <span>
                          {loading && (
                            <>
                              {" "}
                              <CircularProgress
                                size={10}
                                sx={{ color: "#daa520" }}
                              />{" "}
                            </>
                          )}
                          {sender?._id === user?._id && !loading && readBy ? (
                            <>
                              <DoneAllIcon
                                className="h-3.5"
                                sx={{
                                  color: readBy[0] ? "#daa520" : "black",
                                }}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </span>
                      </div>
                    </li>
                  </>
                );
              }
            )}
          {/* <div
            style={{ border: "1px solid black", width: "auto", height: "auto" }}
          >
            <img
              style={{
                width: "200px",
                height: "200px",
                border: "0.2px solid green",
              }}
              src="#"
            />
          </div> */}

          <div style={{ marginBottom: "15px" }}>
            <p>
              {istyping &&
              istyping !== user?._id &&
              chatTyping === selectedChat?._id ? (
                <div style={{ marginBottom: "15px" }}>
                  <div class="chat-bubble">
                    <div class="typing">
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ visibility: "hidden" }}>not typing</div>
                </>
              )}
            </p>
          </div>
        </ul>
      </div>

      {/* keyboard */}
      <div className="p-2 mb-0 lg:bg-transparent bg-[#455A64] w-full flex items-center gap-2 lg:gap-4">
        <div className="w-6 relative hidden md:block">
          <FaceSmileIcon
            onClick={() => setEmoji(!emoji)}
            className="cursor-pointer h-6 text-yellow-500"
          />
          {emoji && (
            <div className="absolute bottom-[170%]">
              <EmojiPicker
                searchDisabled={true}
                onEmojiClick={(data) => {
                  setMessage(message + data.emoji);
                }}
              />
            </div>
          )}
        </div>

        <FileUploadModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          img={upload}
          typingHandler={typingHandler}
          handleKeyPress={handleKeyPress}
          handleSendMessage={handleSendMessage}
          formData={formData}
        />

        <form
          className="w-6 relative cursor-pointer"
          onSubmit={handlefileupload}
        >
          <PaperClipIcon
            // onClick={handleChange}
            className="h-6 lg:text-zinc-500 text-zinc-200 cursor-pointer"
          />
          <input
            type="file"
            onChange={handleChange}
            name="message_file"
            className="opacity-0 top-0 left-0 h-full w-full cursor-pointer absolute"
            // multiple="multiple"
          />

          <button
            id="submit"
            type="submit"
            style={{ visibility: "hidden", display: "none" }}
          >
            submit
          </button>
        </form>
        <textarea
          rows={1}
          type="text"
          value={message}
          className="border rounded-md p-2 w-full text-sm lg:text-base"
          placeholder={"Type message"}
          onChange={typingHandler}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <div
          className="p-2 rounded bg-primary-100 "
          onClick={() => handleSendMessage()}
        >
          <PaperAirplaneIcon className="h-4 text-primary-500 sm:bg-[200%]" />
        </div>
      </div>
    </main>
  );
};

export default Messages;
