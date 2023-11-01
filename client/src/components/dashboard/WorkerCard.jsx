import React, { useContext, useEffect, useState } from "react";
import "./WorkerCard.css";
import ProfielImage from "../../assets/Dashboard/worker-card-profile-picture.png";
import avatarImage from "../../assets/Dashboard/avatar.jpeg";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/outline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocationIcon from "../../assets/Dashboard/location.svg";
import VerifiedIcon from "../../assets/Dashboard/verified.png";
import { Link, useNavigate } from "react-router-dom";
import { moneyFormat } from "../../functions/moneyFormat";
import { chatState } from "../../contexts/ChatProvider";
import { UserDataContext } from "../../contexts/UserDataContext";

const WorkerCard = ({ worker }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  const { setSelectedChat } = chatState();
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    if (userData) {
      setToken(JSON.parse(userData).token);
    }
  }, []);

  const accessChat = async () => {
    fetch(
      `/creedlance/accessChat`,
      token
        ? {
            method: "POST",
            body: JSON.stringify({ userId: worker?._id }),
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
    <div className="worker__card">
      <img
        src={worker?.photo?.url || avatarImage}
        className="rounded-full bg-gray-500"
        alt=""
      />
      <div className="details">
        <div className="card__header">
          <div className="top">
            <div className="left">
              <Link
                className="capitalize"
                to={`/profile/${worker?.username}/worker`}
              >
                {worker?.name}
              </Link>
              <div className="handle">
                <p>{worker?.email}</p>
                <CheckBadgeIcon className="h-4 text-primary-500" />
              </div>
              <div className="ratings-box">
                <div className="ratings opacity-50">
                  <StarIcon className="h-4" />
                  <StarIcon className="h-4" />
                  <StarIcon className="h-4" />
                  <StarIcon className="h-4" />
                  <StarIcon className="h-4" />
                  <p className="rating__figure">0.0</p>
                </div>
                <div className="location">
                  <img src={LocationIcon} alt="" />
                  <p>{worker?.state}</p>
                </div>
              </div>
              <h5>{worker?.occupation}</h5>
            </div>
            <div className="right">
              <h6 className="text-right">
                {moneyFormat(worker?.hourlyPay ? worker?.hourlyPay : 0)}
              </h6>
              <p>per hour</p>
              {/* <FavoriteBorderOutlinedIcon /> */}
            </div>
          </div>
        </div>
        <p className="description">{worker?.description}</p>
        <div className="card__footer">
          <p className="tags">{worker?.skills?.skillName}</p>
          <button onClick={() => accessChat()}>Contact</button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
