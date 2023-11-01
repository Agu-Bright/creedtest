import React from 'react';
import './CreateAcc.css';
import creedlancepic from '../../assets/creating-account-img/Designer-girl-bro1.svg';
import enterprisepic from '../../assets/creating-account-img/Business-merger-pana1.svg';
import Nav from "../../components/nav/Nav";
import { Link } from 'react-router-dom';
const CreateAcc = () => {
  return (
    <>
    <Nav />
    
       <div className='creatAcc'>

        <div className="createAcc-container">
          <div className="acc-header">
            <h1>Create your Account</h1>
          </div>
          <div className="acc-content">
            <div className="creedlnace-Acc choice__card">
                <span>Creedlance Account</span>
                <img src={creedlancepic} alt="" />
                <span>For all kinds of workers and certified professionals</span>
                <Link to="/register">Register as a Creedlancer</Link>
                <span>to learn more click <a href="/">here</a></span>
            </div>
            <div className="enterprise-Acc choice__card">
            <span>Enterprise Account</span>
                <img src={enterprisepic} alt="" />
                <span>For Registered companies and business only</span>
                <Link to="/enterprise-signup">Register as an Enterprise</Link>
                <span>to learn more click <a href="/">here</a></span>
            </div>
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
                <Link to="/">
                  <li>Privacy</li>
                </Link>
                <Link to="/">
                  <li>Terms & Conditions</li>
                </Link>
                <Link to="/">
                  <li>About Us</li>
                </Link>
                <Link to="/">
                  <li>Contact Us</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
       </div>
    </>
  )
}

export default CreateAcc