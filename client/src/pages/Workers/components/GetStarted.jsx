import React from "react";
import styled from "styled-components";
import Image from "../../../assets/workers/startup_life.png";
import { Link } from "react-router-dom";

export const GetStarted = () => {
  return (
    <Container>
      <section>
        <img src={Image} alt="Start Up" />
        <button>
          <Link to="/postajob_home">Post a Project</Link>
        </button>
      </section>
      <section>
        <h3>How do I get started?</h3>
        <img src={Image} alt="Start Up" className="desktop" />
        <ol>
          <li>
            <h4>Complete your profile</h4>
            <p>
              Select your skills and expertise Upload a professional profile
              photo Go through the Verification Center checklist
            </p>
          </li>
          <li>
            <h4>Browse jobs that suit you</h4>
            <p>
              We have jobs available for all skills. Maximize your job
              opportunities by optimizing your filters. Save your search and get
              alerted when relevant jobs are available.
            </p>
          </li>
          <li>
            <h4>Write your best bid</h4>
            <p>
              Put your best foot forward and write the best pitch possible. Read
              the project and let the clients know you understand their brief.
              Tell them why you're the best person for this job. Writing a new
              brief for each project is more effective than using the same one!
            </p>
          </li>
          <li>
            <h4>Get awarded and earn</h4>
            <p>
              Get ready to work once you get hired. Deliver high quality work
              and earn the agreed amount. Note: you will be rated for every job
              you do, the lesser the rating the less likely you get employed
              again
            </p>
          </li>
        </ol>
      </section>
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 3px solid #daa520;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: max-content;
  padding: 1.25em;
  * {
    margin: 0;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      width: 100%;
      max-width: 30.5em;
      margin: 0 auto;
    }
    button {
      background-color: #daa520;
      border: 0;
      border-radius: 0.2em;
      color: #ffffff;
      font-size: 1.5em;
      margin: 0 auto;
      outline: 0;
      padding: 0.5em 0.9em;
      width: max-content;
      a {
        color: #fff;
      }
    }
    .desktop {
      display: none;
    }
    h3 {
      font-size: 2.25em;
      margin: 0.6em;
    }
    ol {
      margin: 0;
      li {
        ::marker {
          font-size: 1.5em;
        }
        h4 {
          font-size: 1.5625em;
          padding: 1.2em 0 0.85em 0;
        }
        p {
          font-size: 1.5em;
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    border-bottom: 0;
    section {
      padding: 0 0.5em;
      :nth-child(1) {
        display: none;
      }
      .desktop {
        display: block;
      }
      h3 {
        font-size: 1.3em;
      }
      ol {
        padding: 0 0 0 0.5em;
        li {
          h4,
          p,
          ::marker {
            font-size: 1em;
          }
        }
      }
    }
  }
  @media screen and (max-width: 280px) {
    section {
      padding: 0;
    }
  }
`;
