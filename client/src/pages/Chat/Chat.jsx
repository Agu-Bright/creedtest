import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  CheckIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import bg from "./bg.png";
import { Avatar } from "@mui/material";
import AccessChats from "./components/AccessChats";
import { chatState } from "../../contexts/ChatProvider";
import GroupChatModal from "./components/GroupChatModal";
import Messages from "./components/Messages";
import { motion } from "framer-motion";

const Chat = () => {
  const { id } = useParams();
  const { user, selectedChat, loading, setLoading } = chatState();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };
  const contacts = [
    {
      name: "Jack",
      typing: false,
      lastMessage: { text: "London bridge is broken down.", time: "03:33" },
    },
    {
      name: "Jamie",
      typing: false,
      lastMessage: { byMe: false, text: "Top boy innit!", time: "11:23" },
    },
    {
      name: "Confidence",
      typing: true,
      lastMessage: {
        byMe: false,
        text: "lorem ipsum dolor sit amet.",
        time: "12:34",
      },
    },
    {
      name: "Fred",
      typing: false,
      lastMessage: {
        byMe: true,
        text: "lorem ipsum dolor sit amet.",
        time: "14:04",
      },
    },
    {
      name: "James",
      typing: true,
      lastMessage: {
        byMe: false,
        text: "lorem ipsum dolor sit amet.",
        time: "14:47",
      },
    },
    {
      name: "Grace",
      typing: false,
      lastMessage: {
        byMe: false,
        text: "lorem ipsum dolor sit amet.",
        time: "09:28",
      },
    },
  ];
  const messages = [
    { text: "hi", time: "12:30", byMe: false },
    { text: "hey", time: "12:31", byMe: true },
    { text: "wanted to ask something", time: "12:31", byMe: false },
    { text: "are you busy?", time: "12:32", byMe: false },
    { text: "a bit", time: "12:33", byMe: true },
    { text: "why?", time: "12:33", byMe: true },
    { text: "oh?", time: "12:33", byMe: false },
    { text: "text me when you're free 👋", time: "12:34", byMe: false },
    { text: "just say it already", time: "12:35", byMe: true },
    { text: "I can listen now", time: "12:35", byMe: true },
    { text: "well...", time: "12:35", byMe: false },
    {
      text: "there's this stuff I have to do... but I don't know how to go about it 🥲",
      time: "12:36",
      byMe: false,
    },
    {
      text: "you're a dev expert and I know that with your help we can do it",
      time: "12:36",
      byMe: false,
    },
    {
      text: "that's why i wanted you to be free before I talked about it",
      time: "12:37",
      byMe: false,
    },
    { text: "hmmm... okay give me a bit", time: "12:37", byMe: true },
  ];

  const [message, setMessage] = useState();
  const [emoji, setEmoji] = useState(false);
  const [fixTab, setFixTab] = useState(false);

  return (
    <>
      <div className="h-full lg:pb-0 lg:h-screen lg:absolute w-full flex flex-col">
        <div className="w-full hidden md:block">
          <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
        </div>
        <div
          id="mike"
          className="h-full w-full flex flex-col z-20 bg-cover mt-0 mb-0 bg-fixed"
          style={{ marginBottom: "0px" }}
        >
          <div
            className={`${
              location.pathname == "/chat/contacts" ? "block" : "hidden"
            } lg:block w-full bg-[#455A64] px-6 py-4 mb-0 font-semibold text-2xl text-white z-40 flex items-center gap-2`}
          >
            <ChevronLeftIcon
              className="h-6 cursor-pointer md:hidden"
              onClick={() => navigate("/dashboard")}
            />{" "}
            Chats
          </div>

          <section className=" h-full lg:pr-6 lg:grid grid-cols-4">
            {/* contacts */}

            <div
              className={`h-full ${
                location.pathname == "/chat/contacts" ? "flex" : "hidden"
              } lg:flex flex-col lg:p-6 bg-zinc-100`}
            >
              <div className="flex justify-between bg-primary-100 p-2 items-center text-zinc-700">
                {user?.photo?.url ? (
                  <img
                    className="object-cover h-10 w-10 rounded-full"
                    src={user?.photo?.url}
                  />
                ) : (
                  <Avatar />
                )}
                {/* <div className="h-14 w-14 bg-zinc-300 rounded-full"></div> */}
                <div className="flex items-center">
                  <PlusIcon
                    className="h-6"
                    onClick={() => navigate("/dashboard/browse/workers")}
                  />
                  {/* <EllipsisVerticalIcon className="h-6" /> */}
                </div>
              </div>

              <AccessChats contacts={contacts} />
            </div>

            {/* messages */}

            <Messages messages={messages} />
          </section>
        </div>
      </div>
      <GroupChatModal open={open} handleClose={handleClose} />

      <style>
        {`
      html{
        height: 100%;
        outline: none;
        background-image: url("${bg}"); 
        background-size:180%; 
        background-attachment:fixed
      }
      `}
      </style>
    </>
  );
};

export default Chat;
