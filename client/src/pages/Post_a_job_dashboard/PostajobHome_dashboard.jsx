import "./postajob-home_dashboard.css";
import workerImage from "../../assets/images/beer-manufacturing.svg";
import employees from "../../assets/images/employees.png";
import interview_img from "../../assets/images/New-employee.gif"
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function PostajobHomeDashboard() {
  const [fixTab, setFixTab] = useState(false);

  return (
    <>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <section className="section-job">
        <div className="job-heading">
          <h3>How do you want it?</h3>
        </div>
        <br></br>
        <div className="group-container">
        <div className="job-container">
            <div className="card-workers">
              <div className="workers-image">
                <img src={employees} alt="Employees" />
              </div>
              <div className="workers-writeup" id="workers-writeup">
                <h4>Creedlance Work-Force (<b className="bold_recommended_gold">Recommended</b>) </h4>
                <p>
                  Our work force comprises of, Individuals and enterprises
                  nation-wide. Your project will be posted on our platform and
                  you will get Bids and applications from such individuals and
                  enterprises. You will be the one to evaluate and pick the best
                  worker based of, budget, history etc.
                </p>

                <Link to="/Postjob_creedlancers">
                  
                  <button className="btn-post">Post your Job</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="job-container">
            <div className="card-workers">
              <div className="workers-image">
                <img src={interview_img} alt="Employees" />
              </div>
              <div className="workers-writeup" id="workers-writeup">
                <h4>interview a worker (<b className="bold_recommended_gold">New!</b>) </h4>
                <p>
                  This option allows you to post an interview, by setting
                  the date and time of the mentioned interview also the description and other formalities, when your interview is posted
                  you will receive different applications including cv from workers(creedlancers), in your category of 
                  work.. 
                </p>

                <Link to="/create/interview/">
                  <button className="btn-post">Post an interview</button>
                </Link>
              </div>
            </div>
          </div>


          <div className="job-container">
            <div className="card-workers">
              <div id="workers-image">
                <img src={workerImage} alt="" />
              </div>
              <div className="workers-writeup">
                <h4>Award your project to Our trustworthy workers (<b className="bold_recommended_gold">Premium!</b>)</h4>
                <p>
                  Our trust worthy workers are trustworthy individuals or
                  enterprises, which creedlance has hand picked as competent
                  enough to handle your project. But their services cost more
                  than the average creedlancer on our work force. If you need
                  your Job or project done in the best and most efficient way
                  possible, irrespective of cost, then this is for you.
                </p>

                <Link href="/trustworthy_worker_form1">
                  
                  <button className="btn-post1">
                    Get a trustworthy worker
                  </button>
                </Link>
              </div>
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

export default PostajobHomeDashboard;
