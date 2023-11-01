import React, { useState, useEffect, useContext } from "react";
import "./Proposals.css";
import ProposalCard from "../../../components/dashboard/ProposalCard";
import { motion, AnimatePresence } from "framer-motion";
import { AdminNavContext } from "../../../provider/AdminNav";
import { moneyFormat } from "../../../functions/moneyFormat";
import { UserDataContext } from "../../../contexts/UserDataContext";

const Proposals = ({ setFixTab, proposals, post }) => {
  const [showReportBid, setShowReportBid] = useState(false);
  const [creator, setCreator] = useState(false);
  const { state, dispatch } = useContext(AdminNavContext);

  const [avgAmount, setAvgAmount] = useState(0);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < proposals?.length; i++) {
      sum += Number(proposals[i]?.bidAmount);
    }
    setAvgAmount(sum / proposals?.length);
  }, [proposals]);

  useEffect(() => {
    if (showReportBid) {
      document.querySelector("html").classList.add("modal__open");
    } else {
      document.querySelector("html").classList.remove("modal__open");
    }
  }, [showReportBid]);

  const handleReportBid = (e) => {
    e.preventDefault();
    setShowReportBid(false);
  };

  const handleDrag = (e, info) => {
    if (info.offset.y > 100) {
      setShowReportBid(false);
      setFixTab(false);
    }
  };

  const { userData } = useContext(UserDataContext);
  const user = JSON.parse(userData)?.user;
  useEffect(() => {
    if (post?.createdBy == user?._id) {
      setCreator(true);
    }
    dispatch({
      type: "HIDE_ALL",
    });

    return () => {
      dispatch({
        type: "SHOW_ALL",
      });
    };
  }, []);

  return (
    <div className="proposal__page">
      {/* Report bid component */}
      <AnimatePresence>
        {showReportBid ? (
          <motion.div className="report__bid">
            <div
              className="dismiss__overlay"
              onClick={() => setShowReportBid(false)}
            ></div>
            <motion.div
              className="report__container"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "none" }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 100 }}
              dragElastic={{
                // top: 0,
                bottom: 0.5,
              }}
              dragSnapToOrigin
              onDragEnd={handleDrag}
            >
              <div className="drag__handle"></div>
              <form className="content" onSubmit={handleReportBid}>
                <h3>Report Bid</h3>

                {/* reasons */}
                <label>
                  <input type="radio" name="reason" id="" />
                  <p>Bidder did not read project description</p>
                </label>
                <label>
                  <input type="radio" name="reason" id="" />
                  <p>Unclear or does not provide enough information</p>
                </label>
                <label>
                  <input type="radio" name="reason" id="" />
                  <p>Contains contact information</p>
                </label>

                <div className="buttons">
                  <button onClick={() => setShowReportBid(false)}>
                    Cancel
                  </button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* side component */}
      <div className="side">
        <div className="left">
          <h3>Proposals</h3>
          <p>{proposals?.length}</p>
        </div>
        <div className="right">
          <h3>Avg Bid</h3>
          <p>{moneyFormat(proposals?.length > 0 ? avgAmount : 0)}</p>
        </div>
      </div>

      {/* main component */}
      <div className="proposal__list">
        {proposals?.length > 0 &&
          proposals?.map((proposal) => (
            <ProposalCard
              key={proposal._id}
              image={proposal?.createdBy?.photo?.url}
              name={proposal?.createdBy?.name}
              skills={proposal?.createdBy?.skills}
              budget={proposal.bidAmount}
              proposal={proposal.coverLetter}
              creator={creator}
              id={proposal.createdBy._id}
              data={proposal}
              reportBid={() => {
                setShowReportBid(true);
                setFixTab(true);
              }}
              user={user}
              post={post}
            />
          ))}
        {proposals?.length == 0 && (
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            No proposals yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;
