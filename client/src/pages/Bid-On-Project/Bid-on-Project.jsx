import React, { useState } from "react";
import "./Bid-on-Project.css";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import project from "./../../assets/images/Project-img.png";

function Bid_on_project() {
  const [fixTab, setFixTab] = useState(false);

  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  return (
    <>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <div className="place-bid-top-bar">
        <div className="flex">
          <div className="text-part">
            <h1>Place a bid on this project</h1>
            <p>
              You wont be able to edit this bid after posting it. Be careful
            </p>
          </div>

          <bid1 />
          <bid2 />
        </div>
      </div>

      <div className="place-bid-form">
        <div className="form-part">
          <div className="p-mobile">
            You wont be able to edit this bid after posting it. Be careful
          </div>
          <div className="input-flex">
            <div>
              <label for="Bid-amt">Bid Amount</label>
              <div className="place-bid-form-input-container1">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  name="Bid-amt"
                  type={"number"}
                  required
                />
                <div className="naira-symbol"> NGN</div>
              </div>
            </div>
            <div>
              <label for="Bid-amt">The project will be delivered in</label>
              <div className="place-bid-form-input-container1">
                <input
                  name="Bid-amt"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  type={"number"}
                  required
                />
                <div className="naira-symbol"> Days</div>
              </div>
            </div>
          </div>

          <div className="place-bid-form-textarea-container1">
            <label for="proposal">Describe your proposal</label>
            <div className="red-txt">Minimum amount of words: 100</div>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              name="proposal"
              required
              placeholder="I have read through your requirements and i beleive that ....."
            ></textarea>
          </div>

          <button className="Send-button-10"> Submit proposal</button>
        </div>

        <div className="project-img-part">
          <p>Build me an Nft site</p>
          <img src={project}></img>
        </div>
      </div>
    </>
  );
}

export default Bid_on_project;
