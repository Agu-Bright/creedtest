import React from "react";
import styled from "styled-components";
import deskImage from "../../../assets/workers/creedlance_desk.png";
import { Link } from "react-router-dom";

export const WhatKind = () => {
  return (
    <Container>
      <article>
        <h1>What kind of work can I do?</h1>
        <img src={deskImage} alt="Desk Image" className="desktop" />
        <p>
          Whatever the job, you can find it on Creedlancer.com. Complete your
          profile so we can match you to the right jobs.
        </p>
        <Link to="/login">
          <button>Get started</button>
        </Link>
      </article>
      <img src={deskImage} alt="Desk Image" />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background: #455a64;
  border-bottom: 3px solid #daa520;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: max-content; // 28.125em
  padding: 1.25em 0 0 3.4375em;
  * {
    margin: 0;
  }
  article {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    height: max-content;
    width: 70%;
    padding: 1em 0 1em 0;
    h1 {
      font-size: 3.75em;
      padding-bottom: 0.9em;
    }
    .desktop {
      display: none;
    }
    p {
      font-size: 1.5em;
      padding-bottom: 1.5em;
    }
    button {
      background-color: #daa520;
      border: 0;
      border-radius: 0.2em;
      color: white;
      font-size: 1.5em;
      outline: 0;
      padding: 0.5em 0.9em;
      width: max-content;
      text-decoration: none;
    }
    @media screen and (max-width: 1400px) {
      width: 100%;
    }
  }
  > img {
    width: 98%;
    padding: 0 0 1em 0;
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 1.25em 1.75em 0 1.75em;
    > img {
      display: none;
    }
    article {
      h1 {
        font-size: 2.1em;
      }
      .desktop {
        display: block;
        width: 30em; // 26.25
        margin: 0 auto 1em auto;
      }
      p {
        font-size: 1em;
      }
      button {
        background-color: #ffffff;
        color: #455a64;
        font-size: 1em;
      }
    }
  }
  @media screen and (max-width: 530px) {
    article .desktop {
      width: 100%;
    }
  }
`;
