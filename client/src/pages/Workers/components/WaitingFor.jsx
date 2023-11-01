import React from "react";
import styled from "styled-components";
import Image from "../../../assets/workers/flag.png";
import { Link } from "react-router-dom";

export const WaitingFor = () => {
  return (
    <Container>
      <article>
        <h2>So what are you waiting for?</h2>
        <p>Search for the right job and write your best bid proposal now.</p>
        <img src={Image} alt="flag" className="desktop" />
        <Link to="/browse/jobs">
          <button>Search Jobs</button>
        </Link>
      </article>
      <img src={Image} alt="flag" />
    </Container>
  );
};

const Container = styled.div`
  background: #ebcb7a;
  color: white;
  display: flex;
  flex-direction: row;
  padding: 3em 2em;
  align-items: center;
  article {
    flex: 1;
    height: max-content;
    h2 {
      font-size: 2.125em;
    }
    p {
      font-size: 1.5em;
    }
    .desktop {
      display: none;
    }
    button {
      background: #af841a;
      border: 0;
      border-radius: 0.2em;
      color: inherit;
      font-size: 1.375em;
      font-weight: bold;
      outline: 0;
      padding: 0.55em 1.5em;
    }
  }
  img {
    max-width: 271px;
    width: 100%;
  }
  @media screen and (max-width: 900px) {
    padding: 1.5em 2em;
    article {
      h2 {
        font-size: 1.3em;
      }
      p {
        font-size: 1em;
      }
      button {
        font-size: 1.2em;
      }
      .desktop {
        margin: 0 auto;
      }
    }
  }
  @media screen and (max-width: 580px) {
    padding: 1em 1.3em;
    > img {
      display: none;
    }
    article .desktop {
      display: block;
      padding: 0 0 1em 0;
    }
  }
`;
