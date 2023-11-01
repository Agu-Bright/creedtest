import React from "react";
import Nav from "../../components/nav/Nav";
import VerifiedImage from "./../../assets/images/Verified-rafiki-1.png";
import "./Posted_successfully.css";
import { Link } from "react-router-dom";

function PostedSuccessfully() {
  return (
    <>
      <section className="section-job min-h-screen">
        <div className="success-container">
          <img src={VerifiedImage} alt="verfied rafiki" />
          <p>
            Your project has been posted successfully please login or register
            to view applicants.
          </p>
          <br></br>
          <p className="warning-note">
            Note: navigating to any other page other than login or signup will
            delete your posted project
          </p>
          <div className="btn-register">
            <Link to='/login' className="the-button">Log in</Link>

            <Link to='/register' className="the-button">Sign up</Link>
          </div>
        </div>
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

export default PostedSuccessfully;
