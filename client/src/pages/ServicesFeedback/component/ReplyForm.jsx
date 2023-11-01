import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { CircularProgress } from "@mui/material";
import { ModalContext } from "../../../contexts/ModalContext";
import { fetchData } from "../../../api/fetchData";
import Reply from "./Reply";
const ReplyForm = ({ id, setReviews, reply, reviewId, setRepReply }) => {
  const { showModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [text, setText] = useState("");
  const [replies, setReplies] = useState([]);

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handlesubmit(e);
    }
  };

  const handleReviewReset = (id, res) => {
    setReviews((prev) => {
      const update = prev.map((item) => {
        if (item._id === id) {
          item.replies.unshift(res);
        }
        return item;
      });
      return update;
    });
  };
  const handleSetReplies = (id, res) => {
    setReviews((prev) => {
      const update = prev.map((item) => {
        if (item._id === id) {
          item.replies.unshift(res);
        }
        return item;
      });
      return update;
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    fetch(
      reply
        ? `/creedlance/services/reply-reply/${id}/${reviewId}`
        : `/creedlance/services/review-reply/${id}`,
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
        !reply && handleReviewReset(id, data.reply);
        reply && setReplies((prev) => [data.reply, ...prev]);
        showModal(`Reply Sent`, true);
      } else {
        showModal(`${data.message}`, false);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (reply) {
      (async () => {
        setReplyLoading(true);
        await fetchData(`/services/get-reply-replies/${id}`)
          .then((res) => {
            setReplies(res.replies);
            setReplyLoading(false);
          })
          .catch((err) => console.log(err));
      })();
    }
  }, [reply]);

  return (
    <>
      <Container>
        <input
          type="text"
          placeholder="Type a reply"
          value={text}
          required={true}
          onChange={(e) => setText(e.target.value)}
          // onKeyPress={(e) => handleKeyPress(e)}
          onKeyDown={(e) => handleKeyPress(e)}
        />{" "}
        <button>
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#daa520" }} />
          ) : (
            <button onClick={(e) => handlesubmit(e)}>
              <PaperAirplaneIcon className="h-6 text-black" />
            </button>
          )}{" "}
        </button>
      </Container>
      {replyLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "5px 0 5px 0",
          }}
        >
          <CircularProgress size={22} sx={{ color: "#daa520" }} />
        </div>
      )}
      {replies && !loading && replies.length > 0 && (
        <>
          {replies.map((reply) => (
            <Reply key={reply?._id} reply={reply} review={reply?._id} />
          ))}
        </>
      )}
    </>
  );
};

export default ReplyForm;

const Container = styled.div`
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
    border: none;
  }

  @media (min-width: 768px) {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;

    input {
      padding: 0.5rem;
    }
  }
`;
