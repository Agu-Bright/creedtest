import React from "react";
import "./ProposalCard.css";
import proposalImage from "../../assets/Dashboard/proposal.png";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocationIcon from "../../assets/Dashboard/location.svg";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Rating } from "@mui/material";
import {
  ChatBubbleBottomCenterTextIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import ConfirmAwardModal from "./ConfirmAwardModal";
import { moneyFormat } from "../../functions/moneyFormat";
import { chatState } from "../../contexts/ChatProvider";
import avatarImage from "../../assets/Dashboard/avatar.jpeg";
const ProposalCard = ({
  reportBid,
  name,
  budget,
  proposal,
  data,
  image,
  creator,
  id,
  skills,
  user,
  post,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const { token, setSelectedChat } = chatState();
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
      setSelectedChat(data);
      navigate(`/chat/messages/${data?._id}`);
    });
  };

  return (
    <div className="proposal__card">
      {showModal && (
        <ConfirmAwardModal proposal={data} hide={() => setShowModal(false)} />
      )}
      <div className="card__header">
        <img
          src={image || avatarImage}
          className="rounded-full bg-gray-500"
          alt=""
        />
        <div className="header__info">
          <div className="left">
            <Link to="/profile/worker">{name}</Link>
            <p>@{name}</p>
            <div className="rating__box">
              <div className="rating">
                {/* <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon /> */}
                <Rating value={data?.AverageRating} readOnly size="small" />
                <p>{data.AverageRating}</p>
              </div>
              <div className="location">
                <img src={LocationIcon} alt="" />
                <p>{data.createdBy.city}</p>
              </div>
            </div>
          </div>
          <div className="right">
            <h4>{moneyFormat(budget)}</h4>
            <p>7 days ago</p>
          </div>
        </div>
      </div>
      <h4 className="tags">{skills.map(({ title }) => title + ", ")}</h4>
      <p className="description">{proposal}</p>
      <p className="response__time">Replies within an hour</p>

      {user._id === data.project.createdBy && (
        <BtnCon className="flex items-center gap-x-4">
          {post?.acceptedPerson !== id ? (
            <Button
              className="bg-primary-500 rounded text-white flex items-center gap-x-2 sm:text-base"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              <TrophyIcon className="h-4" />
              Award
            </Button>
          ) : (
            <Button
              className=" rounded text-white flex items-center gap-x-2 sm:text-base"
              style={{ background: "#cccac5" }}
            >
              <TrophyIcon className="h-4" />
              Award
            </Button>
          )}
          <Button
            onClick={() => accessChat()}
            className="bg-primary-500 rounded text-white flex items-center gap-x-2 sm:text-base"
          >
            <ChatBubbleBottomCenterTextIcon className="h-4" />
            Chat
          </Button>
        </BtnCon>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          className="report__bid"
          onClick={(e) => {
            e.preventDefault();
            reportBid();
          }}
        >
          Report bid
        </Link>
        {post?.acceptedPerson === id && (
          <div
            style={{
              border: "1px solid black",
              padding: "4px",
              borderRadius: "5px",
            }}
          >
            {" "}
            Assigned Worker
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalCard;

const BtnCon = styled.div`
  margin: 1.5rem auto 1rem;
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;

  @media (min-width: 768px) {
    padding: 0.5rem 1.3rem;
  }
`;
