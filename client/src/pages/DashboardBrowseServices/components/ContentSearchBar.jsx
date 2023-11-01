import React, { useRef, useContext } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

import { SearchContext } from "./SearchContext";
import { ModalContext } from "../../../hooks/ModalContext";

export const ContentSearchBar = ({ className }) => {
  const inputJobRef = useRef();
  const inputLocationRef = useRef();
  const { service, setService } = useContext(SearchContext);
  const { setDisplay, setModalData } = useContext(ModalContext);

  const focusLocation = (e) => {
    if (inputLocationRef.current) {
      setModalData("state");
      setDisplay(true);
      inputLocationRef.current.focus();
    }
  };
  const focusJob = (e) => {
    if (inputJobRef.current && e.target !== inputJobRef.current)
      inputJobRef.current.focus();
  };

  return (
    <Container className={className}>
      <li className="job" onClick={focusJob}>
        <p onClick={(e) => e.stopPropagation()}>
          What job are you looking for?
        </p>
        {service ? (
          <p className="selected-service">
            {service}{" "}
            <button onClick={() => setService()}>
              <CloseIcon sx={{ width: 16, height: 16 }} />
            </button>
          </p>
        ) : (
          <input
            type="text"
            placeholder="Search..."
            ref={inputJobRef}
            onKeyUp={(e) => e.key === "Enter" && setService(e.target.value)}
          />
        )}
      </li>
      <li className="location" onClick={focusLocation}>
        <label
          htmlFor="search-bar-location"
          onClick={(e) => e.stopPropagation()}
        >
          Where? or Remote
          <input
            id="search-bar-location"
            name="search-bar-location"
            type="checkbox"
          />
        </label>
        <input type="text" placeholder="Anywhere" ref={inputLocationRef} />
      </li>
      <li className="status">
        <label htmlFor="search-bar-status-full-time">
          <input
            id="search-bar-status-full-time"
            name="search-bar-status-full-time"
            type="checkbox"
          />
          full-time
        </label>
        <label htmlFor="search-bar-status-part-time">
          <input
            id="search-bar-status-part-time"
            name="search-bar-status-part-time"
            type="checkbox"
          />
          part-time
        </label>
        <label htmlFor="search-bar-status-contractor">
          <input
            id="search-bar-status-contractor"
            name="search-bar-status-contractor"
            type="checkbox"
          />
          contractor
        </label>
        <label htmlFor="search-bar-status-internship">
          <input
            id="search-bar-status-internship"
            name="search-bar-status-internship"
            type="checkbox"
          />
          internship
        </label>
      </li>
    </Container>
  );
};

const Container = styled.ul`
  background-color: #ffffff;
  border: 1px #9e9e9e solid;
  display: flex;
  padding: 0;
  flex-direction: row;
  margin: 0 0 0.6em 0;
  list-style: none;
  li {
    border-right: 1px #9e9e9e solid;
    flex: 1;
    padding: 1em;
    :nth-last-child(1) {
      border-right: 0;
    }
  }
  .job {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      font-size: 0.7em;
      margin: 0;
      width: max-content;
      line-height: 1.8em;
    }
    .selected-service {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      background-color: #eeeeee;
      padding: 0.1em 0.5em;
      font-size: 0.75em;
      button {
        border: 0;
        outline: 0;
        font-size: 1.2em;
        background-color: transparent;
        padding: 0;
        margin: 0;
        height: max-content;
        line-height: 0;
        margin-left: 0.2em;
      }
    }
    input {
      border: 0;
      outline: 0;
      font-size: 1.2em;
    }
  }
  .location {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    label {
      cursor: pointer;
      text-transform: capitalize;
      font-size: 0.6em;
      font-weight: bold;
      width: max-content;
      height: max-content;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    input[type="text"] {
      border: 0;
      outline: 0;
      font-size: 1.2em;
    }
  }
  .status {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-gap: 0 0.4em;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: start;
    label {
      cursor: pointer;
      text-transform: capitalize;
      font-size: 0.6em;
      font-weight: bold;
      width: max-content;
      height: max-content;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
`;
