import { Avatar, Rating } from "@mui/material";
import React, { useState, useEffect } from "react";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import { fetchData } from "../../../api/fetchData";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { IconButton } from "@mui/material";
import SeeMore from "./SeeMore";
import { fontSize } from "@mui/system";
function formatDate(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}/${month}/${year}`;
}
const Feedback = ({ review, setReviews }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(null);
  const [unlike, setUnlike] = useState(null);
  const [isLiked, setIsLiked] = useState("");
  const [isUnliked, setIsUnliked] = useState("");

  const { user } = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    (async () => {
      const res = await fetchData(`/services/get-review/${review._id}`);
      setLikes(res.review.likes);
      setUnlike(res.review.unLike);
      setIsLiked(res.review.likes.find((item) => item === user._id));
      setIsUnliked(res.review.unLike.find((item) => item === user._id));
    })();
  }, []);

  const reactToReview = async (id, action) => {
    await fetchData(`/services/${id}/likeReview?action=${action}`).then(
      (res) => {
        setLikes(res.likes);
        setIsLiked(res.likes.find((item) => item === user._id));
        setIsUnliked(res.unLikes.find((item) => item === user._id));
        setUnlike(res.unLikes);
      }
    );
  };

  return (
    <div className="lg:w-[70%]">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              sx={{
                backgroundColor: "goldenrod",
                color: "white",
                width: 26,
                height: 26,
                fontSize: "14px",
              }}
              src={review.createdBy?.photo?.url}
            />
            <p className="m-0 p-0 font-intermedium text-gray-700">
              {review?.createdBy?.name}
            </p>
          </div>
          {/* {reaction === "excellent" && (
            <p className="p-0 m-0 text-xl h-8 w-8 bg-green-200 flex items-center justify-center rounded-lg">
              😊
            </p>
          )}
          {reaction === "average" && (
            <p className="p-0 m-0 text-xl h-8 w-8 bg-yellow-200 flex items-center justify-center rounded-lg">
              🙂
            </p>
          )}
          {reaction === "poor" && (
            <p className="p-0 m-0 text-xl h-8 w-8 bg-red-200 flex items-center justify-center rounded-lg">
              🙁
            </p>
          )} */}
          <Rating value={review?.rating} readOnly size="small" />
        </div>

        <p className="m-0 p-0 font-inter text-base">
          <SeeMore content={review.text} />
          {/* {review?.text} */}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2 pl-2">
        <p className="p-0 m-0 text-gray-400 text-sm">
          {formatDate(new Date(review.createdAt))}
        </p>
        {/* <button
          style={{ color: isLiked ? "goldenrod" : "gray" }}
          onClick={() => reactToReview(review?._id, "like")}
          className="text-sm bg-inherit border-none font-intermedium text-400"
        >
          Like({likes?.length || 0})
        </button> */}
        <div>
          <IconButton
            sx={{ padding: "3px" }}
            onClick={() => reactToReview(review?._id, "like")}
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
            onClick={() => reactToReview(review?._id, "unlike")}
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
          style={{ color: isUnliked ? "goldenrod" : "gray" }}
          onClick={() => reactToReview(review?._id, "unlike")}
          className="text-sm bg-inherit border-none font-intermedium text-400"
        >
          Dislike({unlike?.length || 0})
        </button> */}
        {/* <button
          className="text-sm bg-inherit border-none font-intermedium text-gray-400"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </button> */}
        <IconButton
          sx={{ padding: "3px" }}
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          <InsertCommentIcon />

          <p style={{ color: "gray", fontSize: "0.6em" }}>
            ({review?.replies?.length || 0})
          </p>
        </IconButton>
      </div>
      <div>
        {showReplyForm && <ReplyForm id={review._id} setReviews={setReviews} />}

        {review.replies.map((reply) => (
          <Reply key={reply?._id} reply={reply} review={review?._id} />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
