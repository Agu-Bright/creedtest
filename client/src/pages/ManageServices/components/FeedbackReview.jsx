import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import David from "../../../assets/manage-services-img/david.png";
import { ModalContext } from "../../../contexts/ModalContext";
import {
  ArrowUturnLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import FBReply from "./FBReply";
import { Rating, Avatar, CircularProgress } from "@mui/material";

export default function FeedbackReview(props) {
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const { showModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const resetReviews = (id, res) => {
    props.setreviews((prev) => {
      const update = prev.map((item) => {
        if (item._id === id) {
          item.replies.unshift(res);
        }
        return item;
      });
      return update;
    });
  };

  useEffect(() => {
    props.id && setId(props.id);
  }, [props.id]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    fetch(
      `/creedlance/services/review-reply/${id}`,
      user
        ? {
            method: "POST",
            body: JSON.stringify({ text }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        : {}
    ).then(async (res) => {
      const data = await res.json();
      if (data.success) {
        setLoading(false);
        setText("");
        resetReviews(id, data.reply);
        showModal(`Reply Sent`, true);
      } else {
        showModal(`${data.error.message}`, false);
        setLoading(false);
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
    <Container>
      <div className="feedback">
        <div className="feedback-customer">
          <div className="feedback-customer-profile">
            <div>
              <Avatar
                sx={{ width: 50, height: 50, margin: "1px !important" }}
                src={props.img}
                alt="avatar"
              />
            </div>
            <div className="feedback-customer-name">
              <h4>{props.customer}</h4>
              <p>{props.customeremail}</p>
            </div>
          </div>
          <div className="feedback-date-time">
            {/* <ul>
              <li>Tue 04</li>
              <li>16:11</li>
            </ul> */}
            {props.createdAt}
          </div>
        </div>
        <div className="feedback-review">
          <Rating value={props.review} readOnly />
          {/* <p>{props.review}</p> */}
        </div>
        <div className="feedback-additional-summary">
          <h5>{props.summary}</h5>
          <p>{props.additionalsummary}</p>
        </div>
        <ReplyForm>
          <input
            type="text"
            placeholder="Type a reply"
            value={text}
            required={true}
            onChange={(e) => setText(e.target.value)}
            // onKeyPress={(e) => handleKeyPress(e)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#daa520" }} />
          ) : (
            <button onClick={(e) => handlesubmit(e)}>
              <PaperAirplaneIcon className="h-6 text-black" />
            </button>
          )}
        </ReplyForm>
        {props.reply.length > 0 && (
          <RepliesContainer>
            {props.reply.map((item) => (
              <FBReply
                img={item.createdBy?.photo?.url}
                customer={item.createdBy.name}
                customeremail={item.createdBy.email}
                // review={item.text}
                summary={props.summary}
                additionalsummary={item.text}
              />
            ))}
          </RepliesContainer>
        )}
      </div>
    </Container>
  );
}

const RepliesContainer = styled.div`
  padding-left: 10%;
  max-width: 100%;
`;

const ReplyForm = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 3.5rem !important;
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

const Container = styled.div`
  .feedback {
    display: flex;
    flex-direction: column;
    .feedback-customer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .feedback-customer-profile {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 10px;
        .feedback-customer-profile-picture {
          height: auto;
          > img {
            borderradius: 50%;
            height: 48px;
            width: 48px;
          }
        }
        .feedback-customer-name {
          padding-top: 0.3rem;
          text-align: left;

          h4 {
            font-size: 0.9rem;
            font-family: inter;
            color: #4f4f4f;
            margin-bottom: 0.5rem;
          }
          p {
            font-size: 0.75rem;
            margin: 0;
            color: #9cabb5;
          }
        }
      }
      .feedback-date-time {
        font-size: 0.8rem;
        ul {
          display: flex;
          flex-direction: row;
          gap: 15px;
          li {
            list-style: none;
            font-size: 0.8rem;
          }
        }
      }
    }
    .feedback-review {
      background-color: pink;
      padding: 0.3rem;
      font-family: interbolder;
      width: fit-content;
      border-radius: 5px;
      opacity: 0.5;
      font-size: 0.6rem;
      margin: 0 3.5rem 1rem;
      color: red;
      p {
        margin: 0;
      }
    }
    .feedback-additional-summary {
      margin-left: 3.5rem;
      text-align: left;
      h5 {
        margin: 0.3rem 0 0.6rem 0;
        font-family: inter;
        font-size: 0.875rem;
        color: #475661;
      }
      p {
        font-size: 0.875rem;
        color: #475661;
        line-height: 1.4rem;
        font-family: inter;
      }
    }
  }
`;
