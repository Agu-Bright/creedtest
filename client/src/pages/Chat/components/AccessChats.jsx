import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { chatState } from "../../../contexts/ChatProvider";
import { fetchData } from "../../../api/fetchData";
import { Avatar } from "@mui/material";
import { CircularProgress } from "@mui/material";
import UserContainer from "./UserContainer";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  getSender,
  getSenderImage,
  formatTimestamp,
  truncateString,
} from "../config/ChatLogics";

const AccessChats = () => {
  const {
    chats,
    setChats,
    user,
    setSelectedChat,
    selectedChat,
    istyping,
    state,
    chatTyping,
  } = chatState();
  const navigate = useNavigate();
  const [loggedUser, setLoggeduser] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const [searchTimeout, setSearchTImeout] = useState(null);

  const fetchChats = async () => {
    setLoadingChats(true);
    await fetchData("/myChats")
      .then((res) => {
        setChats(res.results.filter((chat) => chat.latestMessage));
        setLoadingChats(false);
      })
      .catch((err) => {
        // showModal(err, false);
        setLoadingChats(false);
      });
  };

  const filterUsers = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return chats.filter((item) =>
      regex.test(getSender(loggedUser?.user, item.users))
    );
  };

  const searchUsers = async (e) => {
    clearTimeout(searchTimeout);
    setSearch(e.target.value);
    // debounce method
    setSearchTImeout(
      setTimeout(() => {
        const searchResult = filterUsers(e.target.value);
        setSearchResult(searchResult);
      }, 500)
    );
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      searchUsers(e);
    }
  };

  useEffect(() => {
    setLoggeduser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  }, [state, selectedChat]);

  return (
    <>
      <div className="relative my-6">
        {loading ? (
          <CircularProgress
            size={22}
            sx={{ color: "#daa520" }}
            className="h-5 text-gray-500 absolute top-2 left-2 "
          />
        ) : (
          <MagnifyingGlassIcon className="h-5 text-zinc-500 absolute top-2 left-2 " />
        )}
        <input
          value={search}
          onChange={(e) => {
            searchUsers(e);
          }}
          type="text"
          placeholder="Search or start a new conversation"
          className="border w-full rounded-md p-2 pl-8 placeholder:text-zinc-700"
          onKeyDown={(e) => handleKeyPress(e)}
        />
      </div>
      <div className="h-full relative ">
        {!search && chats && (
          <ul className="flex lg:absolute top-0 bottom-0 clb lg:overflow-auto flex-col lg:gap-2 text-xs lg:text-base text-zinc-800 h-full w-full pb-16 lg:pb-6">
            {chats.map((chat) => (
              <li key={chat._id} style={{ cursor: "pointer" }}>
                <div
                  onClick={() => {
                    setSelectedChat(chat);
                    navigate(`/chat/messages/${chat._id}`);
                  }}
                  style={{
                    backgroundColor: selectedChat === chat ? "#f9efd5" : "",
                    borderRadius: "7px",
                  }}
                  className="flex gap-2 p-2"
                >
                  <div className="w-14">
                    {!chat.isGroupChat && loggedUser ? (
                      <Avatar
                        src={`${getSenderImage(loggedUser.user, chat?.users)}`}
                      />
                    ) : (
                      <Avatar />
                    )}
                  </div>
                  <div className="flex justify-between flex-col h-14 w-full">
                    <div className="flex w-full justify-between pr-2">
                      <h4 className="text-lg  text-zinc-800 font-semibold capitalize">
                        {!chat.isGroupChat
                          ? getSender(loggedUser?.user, chat.users)
                          : chat.chatName}
                      </h4>
                      {chat?.latestMessage && (
                        <p className="text-zinc-600">
                          {formatTimestamp(chat?.latestMessage?.createdAt)}
                        </p>
                      )}
                    </div>
                    <div className="text-xs -mt-2 mb-2">
                      {istyping &&
                      istyping !== user?._id &&
                      chatTyping === chat._id ? (
                        "Typing..."
                      ) : (
                        <>
                          <div className="flex items-center gap-0.5">
                            {chat?.latestMessage &&
                              chat?.latestMessage.sender?._id === user?._id && (
                                <DoneAllIcon
                                  className="h-3.5"
                                  sx={{
                                    color: chat.latestMessage.readBy[0]
                                      ? "#daa520"
                                      : "black",
                                  }}
                                />
                              )}
                            {chat?.latestMessage &&
                              truncateString(chat?.latestMessage?.content, 30)}
                            {chat?.latestMessage?.sender?._id === user?._id ? (
                              <></>
                            ) : (
                              <>
                                {!chat.latestMessage?.readBy[0] && (
                                  <p
                                    style={{
                                      borderRadius: "10px",
                                      background: "#699b69",
                                      color: "white",
                                      padding: "4px",
                                      font: "0.5em",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    New Message
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <hr className="block" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {search && searchResult.length > 0 && (
          <>
            <ul className="flex lg:absolute top-0 bottom-0 clb lg:overflow-auto   flex-col lg:gap-2 text-xs lg:text-base text-zinc-800 h-full w-full pb-16 lg:pb-6">
              {searchResult.map((chat) => (
                <li key={chat._id} style={{ cursor: "pointer" }}>
                  <div
                    onClick={() => {
                      setSelectedChat(chat);
                      navigate(`/chat/messages/${chat._id}`);
                    }}
                    style={{
                      backgroundColor: selectedChat === chat ? "#f9efd5" : "",
                      borderRadius: "7px",
                    }}
                    className="flex gap-2 p-2"
                  >
                    <div className="w-14">
                      {!chat.isGroupChat && loggedUser ? (
                        <Avatar
                          src={`${getSenderImage(
                            loggedUser.user,
                            chat?.users
                          )}`}
                        />
                      ) : (
                        <Avatar />
                      )}
                    </div>
                    <div className="flex justify-between flex-col h-14 w-full">
                      <div className="flex w-full justify-between pr-2">
                        <h4 className="text-lg  text-zinc-800 font-semibold capitalize">
                          {!chat.isGroupChat
                            ? getSender(loggedUser?.user, chat.users)
                            : chat.chatName}
                        </h4>
                        {chat?.latestMessage && (
                          <p className="text-zinc-600">
                            {formatTimestamp(chat?.latestMessage?.createdAt)}
                          </p>
                        )}
                      </div>
                      <div className="text-xs -mt-2 mb-2">
                        {istyping &&
                        istyping !== user?._id &&
                        chatTyping === chat._id ? (
                          "Typing..."
                        ) : (
                          <>
                            <div className="flex items-center gap-0.5">
                              {chat?.latestMessage &&
                                chat?.latestMessage.sender?._id ===
                                  user._id && (
                                  <DoneAllIcon
                                    className="h-3.5"
                                    sx={{
                                      color: chat.latestMessage.readBy[0]
                                        ? "#daa520"
                                        : "black",
                                    }}
                                  />
                                )}
                              {chat?.latestMessage &&
                                truncateString(
                                  chat?.latestMessage?.content,
                                  30
                                )}
                              {chat?.latestMessage?.sender._id === user._id ? (
                                <></>
                              ) : (
                                <>
                                  {!chat.latestMessage?.readBy[0] && (
                                    <p
                                      style={{
                                        borderRadius: "10px",
                                        background: "#699b69",
                                        color: "white",
                                        padding: "4px",
                                        font: "0.5em",
                                        marginLeft: "5px",
                                      }}
                                    >
                                      New Message
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <hr className="block" />
                    </div>
                  </div>
                </li>
              ))}{" "}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default AccessChats;
