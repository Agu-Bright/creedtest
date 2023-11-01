import "./trust_worthy_worker_form1.css";
import React from "react";
import hourlyBasis from "../../../assets/images/hourly-basis.png";
import mileStone from "../../../assets/images/mile-stone.png";

function TrustWorthyWorkerForm1() {
  return (
    <>
      <section className="section-formpost">
        {/* <Nav className="nav-form" /> */}
        <div className="logo"></div>
        <br></br>
        <br></br>
        <div className="formpost-container">
          <div className="formpost-heading">
            <h4>How do you need it done</h4>
            <p>
              our trust worthy Creedlancers will be matched to you based off
              what is specified in your form
            </p>
          </div>

          <form action="/" className="form">
            <div className="form-section-one">
              <div className="form-section-one-a">
                <label htmlFor="category">Category</label>

                {/* <br /> */}
                <select name="category" id="category">
                  <option value="software-engineering">
                    Software Engineering
                  </option>
                  <option value="product-design">Product Design</option>
                  <option value="technical-writing">Technical Writing</option>
                </select>
              </div>
              <div className="form-section-one-a">
                <label htmlFor="subcategory">Subcategory</label>
                {/* <br /> */}
                <select name="subcategory" id="subcategory">
                  <option value="web-development">Web Development</option>
                  <option value="ui/ux">UI/UX Design</option>
                  <option value="ui-research">UI Research</option>
                </select>
              </div>
            </div>
            <div className="form-section-two">
              <label htmlFor="project-name">
                Choose a name for your project
              </label>

              <input
                type="text"
                id="project-name"
                name="project-name"
                placeholder="Creedlance"
                className="project-name"
              />
            </div>
            <div className="form-section-two">
              <label htmlFor="about-project">
                Tell us more about the project
              </label>

              <input
                type="text"
                name="about-project"
                id="about-project"
                placeholder="CreedLance is a kjlnd ln vlk lisnd in s nr  dsnl ;sdm ihn ;sodm insdmo;v  ;ojf kf pvkf , ;oj
lind om;gg ;msf liflm;pkg s kg omgf;s."
              ></input>
            </div>
            <div className="upload-files">
              <button className="btn-upload">
                <span>+ </span> Upload files
              </button>
              <p>
                Drag & drop any images or documents that might be helpful in
                explaining your brief here (Max file size: 25 MB).
              </p>
            </div>
            <div className="skills-required">
              <h6>Which skills are required?</h6>
              <div className="skills-required-container">
                <button>
                  PHP<ion-icon name="close"></ion-icon>
                </button>
                <button>
                  Javascript <ion-icon name="close"></ion-icon>
                </button>
                <button>
                  Python <ion-icon name="close"></ion-icon>
                </button>
                <button>
                  CSS <ion-icon name="close"></ion-icon>
                </button>
                <button>
                  UI/UX <ion-icon name="close"></ion-icon>
                </button>
                <input type="text" placeholder="Enter skills here..." />
              </div>
              <p>
                Suggested skills: MySQL, Web Hosting, Software
                Testing,Engineering, Software Architecture
              </p>
            </div>
            <div className="pay-worker">
              <h5>How do you want to pay your worker?</h5>

              <div className="space-between-project-type"></div>
                  <select name="budget" id="budget" className="pay_worker_select">
                    <option value="per-milestone" className="option_font_family">Pay per milestone </option>
                    <option value="per-hour" className="option_font_family">Pay per hour</option>
                  </select>
              
              <div className="pay">
                <div className="pay-basis">
                  <img src={hourlyBasis} alt="Hourly Basis" />
                  <div className="pay-container">
                    <h6>Pay on an hourly basis</h6>
                    <p>
                      Hire on an hourly basis and pay only for hours worked.
                      Best for one-off tasks.
                    </p>
                  </div>
                </div>
                <div className="pay-basis">
                  <img src={mileStone} alt="Milestone" />
                  <div className="pay-container">
                    <h6>Pay per mile stone</h6>
                    <p>
                      Agree on a price and release payment per progress made.
                      Best for ongoing projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <a href="/trustworthy_worker_form2" className="btn-nextpage">
            Next
          </a>
        </div>
        <div className="postajob-footer">
          <div className="postajob-footer-job-container">
            <div className="postajob-footer-one">
              <p>© 2022 CreedLance® Global Inc.</p>
            </div>
            <div className="postajob-footer-two">
              <ul className="postajob-footer-nav">
                <a href="/">
                  <li>Terms of Service</li>
                </a>
                |
                <a href="/">
                  <li>Privacy Policy</li>
                </a>
                |
                <a href="/">
                  <li>CA Notice at Collection</li>
                </a>
                |
                <a href="/">
                  <li>Cookie Settings</li>
                </a>
                |
                <a href="/">
                  <li>Accessibility</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrustWorthyWorkerForm1;
