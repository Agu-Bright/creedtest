import React from "react";
import "./Receivedsuccessfully.css";
import Nav from "../../components/nav/Nav";
import VerifiedImage from "../../assets/images/Verified-rafiki-1.png";

function ReceivedSuccessfully() {
  return (
    <>
      <section className="section-job">
        <Nav />
        <div className="main-container">
          <div className="received-container">
            {/* <div className="received-image"> */}
            <img src={VerifiedImage} alt="Verified Rafiki" />

            {/* </div> */}
            <div className="form-box">
              <form action="/" className="received-form">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                />

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                />

                <label htmlFor="number">Your Phone Number</label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  placeholder="Your phone number"
                />

                <a href="/postedsuccessfully">
                  <button>Submit</button>
                </a>
              </form>
            </div>
          </div>

          <p>
            Your project details has been Received successfully, please provide
            your contact information so our customer care will get in touch with
            you shortly
          </p>
        </div>
        <br></br>
        <div className="post-a-job-footer">
          <div className="post-a-job-footer-container">
            <div className="post-a-job-footer-copyright">
              <p>
                ©2022,<span>Creedlance</span> ...Connecting the people...
              </p>
            </div>
            <div className="post-a-job-footer-nav">
              <ul className="post-a-job-footer-links">
                <a href="/">
                  <li>Privacy</li>
                </a>
                <a href="/">
                  <li>Terms & Conditions</li>
                </a>
                <a href="/">
                  <li>About Us</li>
                </a>
                <a href="/">
                  <li>Contact Us</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReceivedSuccessfully;
