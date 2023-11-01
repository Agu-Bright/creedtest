import React, { useState } from "react";
import { moneyFormat } from "../../../functions/moneyFormat";
import { MapPinIcon, ClockIcon, EyeIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import { notificationState } from "../../../contexts/NotificationProvider";
import { chatState } from "../../../contexts/ChatProvider";

const Profile = ({ service }) => {
  const navigate = useNavigate();
  const [numberVisible, setNumberVisible] = useState(false);
  const { token, setSelectedChat } = chatState();

  const handlePhone = () => {
    if (numberVisible === false) {
      setNumberVisible(true);
    } else {
      window.location.href = `tel:09000000000`;
    }
  };

  const accessChat = async () => {
    fetch(
      `/creedlance/accessChat`,
      token
        ? {
            method: "POST",
            body: JSON.stringify({ userId: service?.createdBy?._id }),
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

  return (
    <div className="hidden lg:block bg-white p-2 lg:p-4 2xl:p-6">
      <div className="flex gap-x-2">
        <div className="w-[40px]">
          <img
            src={service?.createdBy?.photo?.url || avatarImage}
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "100%",
              backgroundColor: "gray",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h1 className="text-lg font-intersemibold m-0 p-0 max-w-[93%] truncate overflow-hidden">
            {service?.createdBy?.name}
          </h1>
          <p className="m-0 flex items-center gap-x-1 bg-[#EAF2F6] text-xs p-1 px-2 w-fit">
            <EnvelopeIcon className="h-4 w-4 text-yellow-500" />
            Typically replies within a few hours
          </p>
          <p className="m-0 flex items-center gap-x-1 bg-[#EAF2F6] text-xs p-1 px-2 w-fit">
            <CheckCircleIcon className="h-4 w-4 text-yellow-500" />
            2y 9m on creedlance
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-5">
        <Link
          to={`/services/${service?._id}/feedback`}
          className="border border-solid border-[#daa520] text-[#daa520] flex-1 text-center py-2 rounded-md text-base"
        >
          Reviews ({service?.reviews.length})
        </Link>
        <div
          onClick={() => {
            accessChat();
          }}
          style={{ cursor: "pointer" }}
          className="border border-solid border-[#daa520] text-[#daa520] flex-1 text-center py-2 rounded-md text-base"
        >
          Message
        </div>
        <button
          onClick={handlePhone}
          className="border border-solid border-[#daa520] bg-[#daa520] text-white flex-1 text-center py-2 rounded-md text-base"
        >
          {numberVisible
            ? service?.createdBy?.phoneNumber
            : "View phone number"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
