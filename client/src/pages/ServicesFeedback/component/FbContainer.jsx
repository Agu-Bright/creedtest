import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Feedback from "./Feedback";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import { ModalContext } from "../../../contexts/ModalContext";
import NoReview from "./NoReview";
import { makeStyles } from "@mui/styles";
import { styled as muiStyled } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  largeRating: {
    fontSize: "10em",
  },
}));

const LargeRating = muiStyled(Rating)(({ theme }) => ({
  fontSize: "10rem", // Adjust the font size to increase the size
}));

const FbContainer = ({ loading, reviews, setReviews, id, service }) => {
  const classes = useStyles();
  const { showModal } = useContext(ModalContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [loadingS, setLoadingS] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    setLoadingS(true);
    fetch(
      `/creedlance/services/create-update-service-review/${id}`,
      user
        ? {
            method: "POST",
            body: JSON.stringify({ rating, review: text }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        : {}
    ).then(async (res) => {
      const data = await res.json();
      if (data.success) {
        setLoadingS(false);
        setText("");
        setRating(0);
        setReviews(data.newService);
        showModal(`Review Sent`, true);
      } else {
        console.log(data);
        showModal(`${data.message}`, false);
        setLoadingS(false);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handlesubmit(e);
    }
  };

  return (
    <div className="bg-white">
      {loading && (
        <div
          id="mike"
          style={{
            width: "inherit",
            zIndex: 10000,
            overflow: "hidden",
            margin: "0 5px",
            borderRadius: "10px",
          }}
          className="relative lg:mb-1 lg:py-0"
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
      <div className="p-4">
        <h1 className="m-0 p-0">
          Feedback about {""}
          <Link
            className="text-[#daa520] underline underline-offset-2"
            to={`/services/${service?._id}`}
          >
            {service?.name}
          </Link>
        </h1>
        {/* <div className="flex flex-row gap-4 flex-wrap mt-5 lg:mt-8 border-solid border-transparent border-b-[1px] border-b-gray-200 pb-3">
          <div className="bg-green-100 text-green-600 px-4 py-1 flex flex-col items-center justify-center w-28 rounded">
            <span className="font-interbold text-xl mt-1 text-green-500">
              12
            </span>
            <p className="m-0 p-0 font-inter text-xl flex items-center gap-2">
              <span className="text-xl">😊 </span>
              <span className="font-inter text-base text-green-400">
                Excellent
              </span>
            </p>
          </div>
          <div className="bg-yellow-100 text-yellow-600 px-4 py-1 flex flex-col items-center justify-center w-28 rounded">
            <span className="font-interbold text-xl mt-1 text-yellow-500">
              12
            </span>
            <p className="m-0 p-0 font-inter text-xl flex items-center gap-2">
              <span className="text-xl">🙂 </span>
              <span className="font-inter text-base text-yellow-400">
                Average
              </span>
            </p>
          </div>
          <div className="bg-red-100 text-red-600 px-4 py-1 flex flex-col items-center justify-center w-28 rounded">
            <span className="font-interbold text-xl mt-1 text-red-500">12</span>
            <p className="m-0 p-0 font-inter text-xl flex items-center gap-2">
              <span className="text-xl">🙁 </span>
              <span className="font-inter text-base text-red-400">Poor</span>
            </p>
          </div>
        </div> */}
        <Stack direction="column" sx={{ marginTop: "5px" }}>
          <Typography>Review this service</Typography>
          <div>
            <Rating
              name="size-large"
              size="large"
              precision={0.5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              sx={{ fontSize: "2em" }}
              readOnly={false}
              className={classes.largeRating}
            />

            <span>({rating})</span>
          </div>

          <ReplyForm>
            <input
              type="text"
              placeholder="Type a review about this service"
              value={text}
              required={true}
              onChange={(e) => setText(e.target.value)}
              // onKeyPress={(e) => handleKeyPress(e)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            {loadingS ? (
              <CircularProgress size={22} sx={{ color: "#daa520" }} />
            ) : (
              <button onClick={(e) => handlesubmit(e)}>
                <PaperAirplaneIcon className="h-6 text-black" />
              </button>
            )}
          </ReplyForm>
        </Stack>
        <hr style={{ height: "0.12px", color: "gray" }} />
      </div>
      {reviews && (
        <div className="p-4">
          {reviews.map((review) => (
            <Feedback
              key={review._id}
              review={review}
              setReviews={setReviews}
            />
          ))}
          {/* <Feedback reaction="poor" />
          <Feedback reaction="average" /> */}
        </div>
      )}
      {reviews && !reviews.length && !loading && <NoReview />}
    </div>
  );
};

export default FbContainer;

const ReplyForm = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  input {
    flex: 1;
    border-radius: 20px !important;
    padding: 0.3rem 0.5rem;
    border: 1.25px solid lightgray;
  }

  > button {
    padding: 0 !important;
    margin: 0 !important;
    background-color: transparent !important;
  }

  @media (min-width: 768px) {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;

    input {
      padding: 0.5rem;
    }
  }
`;
