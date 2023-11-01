import React from "react";
import styled from "styled-components";
import Image from "../../../assets/workers/serene.png";
import { Link } from "react-router-dom";

export const GettingWork = () => {
  return (
    <Container>
      <article>
        <h2>
          Getting a Job has never been <span>EASIER</span>
        </h2>
        <img src={Image} alt="serene" className="desktop" />
        <ol>
          <li>
            <p>Create a creedlancer account</p>
          </li>
          <li>
            <p>Complete your profile</p>
          </li>
          <li>
            <p>Bid on projects or submit interview applications</p>
          </li>
        </ol>
        <Link to="/login">
          <button>Work &amp; Earn Money</button>
        </Link>
      </article>
      <img src={Image} alt="serene" />
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 3px solid #daa520;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2em 0 1em 3.4375em;
  article {
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 2.25em;
      margin: 0;
      width: 70%;
      padding-bottom: 1.7em;
    }
    .desktop {
      display: none;
    }
    ol {
      list-style: none;
      padding: 0 0 1.5em 0;
      li {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: min-content;
        padding: 0.7em 0;
        ::before {
          background-image: url("list_marker.png");
          content: "";
          display: inline-block;
          height: 1.875em;
          width: 1.875em;
          background-repeat: no-repeat;
          background-size: cover;
        }
        p {
          font-size: 1.5em;
          height: 100%;
          margin: 0;
          padding: 0 0 0 0.2em;
          width: calc(100% - 1.875em);
        }
      }
    }
    button {
      background-color: #fafafa;
      border: 0;
      border-radius: 0.2em;
      box-shadow: 0 3px 0.5625em 0 rgba(0, 0, 0, 0.25);
      color: #daa520;
      font-size: 1.25em;
      font-weight: bold;
      outline: 0;
      padding: 0.5em 0.9em;
      width: max-content;
    }
  }
  > img,
  .desktop {
    width: 100%;
    max-width: 36.5em;
    margin: 0 auto;
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 2em 1.5em;
    justify-items: center;
    border: 0;
    > img {
      display: none;
    }
    article {
      .desktop {
        display: block;
      }
      h2 {
        margin: 0 auto;
        font-size: 1.3em;
      }
      ol li p,
      button {
        font-size: 1em;
      }
      button {
        margin: 0 auto;
      }
    }
  }
  @media screen and (max-width: 500px) {
    article {
      h2 {
        width: 100%;
      }
      ol li p,
      button {
        word-break: break-word;
      }
    }
  }
`;
