import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReplyForm from "./ReplyForm";
import SeeMore from "./SeeMore";
import { fetchData } from "../../../api/fetchData";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { IconButton } from "@mui/material";

function formatDate(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}/${month}/${year}`;
}

const Reply = ({ reply, review }) => {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [repReply, setRepReply] = useState("");
  const [likes, setLikes] = useState(null);
  const [unlike, setUnlike] = useState(null);
  const [isLiked, setIsLiked] = useState("");
  const [isUnliked, setIsUnliked] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetchData(`/services/get-reply/${reply._id}`);
      setLikes(res.reply.likes);
      setUnlike(res.reply.unLike);
      setIsLiked(res.reply.likes.find((item) => item === user._id));
      setIsUnliked(res.reply.unLike.find((item) => item === user._id));
    })();
  }, []);

  const reactToReply = async (id, action) => {
    await fetchData(`/services/${id}/likeReply?action=${action}`).then(
      (res) => {
        setLikes(res.likes);
        setIsLiked(res.likes.find((item) => item === user._id));
        setIsUnliked(res.unLikes.find((item) => item === user._id));
        setUnlike(res.unLikes);
      }
    );
  };

  return (
    <div key={reply?._id} className="w-[85%] lg:w-[80%] ml-auto">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              src={reply?.createdBy?.photo?.url}
              sx={{
                backgroundColor: "goldenrod",
                color: "white",
                width: 26,
                height: 26,
                fontSize: "14px",
              }}
            />
            <p className="m-0 p-0 font-intermedium text-gray-700">
              {reply?.createdBy?.name}
            </p>
          </div>
        </div>
        <p className="m-0 p-0 font-inter text-base">
          {" "}
          <SeeMore content={reply.text} />
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2 pl-2">
        <p className="p-0 m-0 text-gray-400 text-sm">
          {formatDate(new Date(reply?.createdAt))}
        </p>
        {/* <button className="text-sm bg-inherit border-none font-intermedium text-gray-400">
          Like ({reply?.likes.length})
        </button>
        <button className="text-sm bg-inherit border-none font-intermedium text-gray-400">
          Dislike ({reply?.unLike.length})
        </button> */}
        <div>
          <IconButton
            sx={{ padding: "3px" }}
            onClick={() => reactToReply(reply?._id, "like")}
          >
            {isLiked ? (
              <>
                <ThumbUpAltIcon sx={{ color: "goldenrod" }} />
              </>
            ) : (
              <>
                <ThumbUpOffAltIcon />
              </>
            )}
            <p style={{ color: "gray", fontSize: "0.6em" }}>
              ({likes?.length || 0})
            </p>
          </IconButton>
          <IconButton
            sx={{ padding: "3px" }}
            onClick={() => reactToReply(reply?._id, "unlike")}
          >
            {isUnliked ? (
              <ThumbDownAltIcon sx={{ color: "goldenrod" }} />
            ) : (
              <>
                <ThumbDownOffAltIcon />
              </>
            )}

            <p style={{ color: "gray", fontSize: "0.6em" }}>
              ({unlike?.length || 0})
            </p>
          </IconButton>
        </div>
        {/* <button
          className="text-sm bg-inherit border-none font-intermedium text-gray-400"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply ({reply?.replies?.length})
        </button> */}
        <IconButton
          sx={{ padding: "3px" }}
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          <InsertCommentIcon />

          <p style={{ color: "gray", fontSize: "0.6em" }}>
            ({reply?.replies?.length || 0})
          </p>
        </IconButton>
      </div>
      {showReplyForm && (
        <ReplyForm
          id={reply._id}
          setRepReply={setRepReply}
          reply={true}
          reviewId={review}
        />
        // <Replies/>
      )}
    </div>
  );
};

export default Reply;
