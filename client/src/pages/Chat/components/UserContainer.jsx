import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { chatState } from "../../../contexts/ChatProvider";

const UserContainer = ({
  photo,
  name,
  email,
  id,
  setSearch,
  handleFunction,
  group,
}) => {
  const { token, setSelectedChat, setChats, setMessage } = chatState();
  const accessChat = async () => {
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
      setChats((prev) => [data, ...prev]);
      setSelectedChat(data);
      setSearch("");
    });
  };

  return (
    <>
      <div
        onClick={
          group
            ? { handleFunction }
            : () => {
                accessChat();
              }
        }
        className="flex gap-2 p-2"
        style={{ cursor: "pointer" }}
      >
        <div className="w-14">
          <Avatar src={photo?.url} alt={photo?.public_id} />
        </div>
        <div className="flex justify-between flex-col h-14 w-full">
          <div className="flex w-full justify-between pr-2">
            <h4 className="text-lg  text-zinc-800 font-semibold capitalize">
              {name}
            </h4>
          </div>
          <div className="text-xs -mt-2 mb-2">{email}</div>
          <hr className="block" />
        </div>
      </div>
    </>
  );
};

export default UserContainer;
