import React, { useRef, useContext } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { BsFillPinMapFill } from "react-icons/bs";

import { SearchContext } from "./SearchContext";
import { ModalContext } from "../../../hooks/ModalContext";

export const LocationTab = ({ className }) => {
  const inputJobRef = useRef();
  const inputLocationRef = useRef();
  const { service, setService } = useContext(SearchContext);
  const { setDisplay, setModalData } = useContext(ModalContext);

  const focusLocation = (e) => {
    if (inputLocationRef.current) {
      setModalData("state");
      setDisplay(true);
      inputLocationRef.current.focus();
      document.querySelector('html').classList.add('modal__open');
    }
  };

  return (
    <Container className={className}>
      <li onClick={focusLocation} className="location-li">
        <div className="location">
          <input
            type="text"
            placeholder="Find anything in NIGERIA"
            ref={inputLocationRef}
          />
          <BsFillPinMapFill />
        </div>
      </li>
      {/* <li className="status-li">
        <div className="status">
          <label htmlFor="search-bar-status-full-time">
            <input
              id="search-bar-status-full-time"
              name="search-bar-status-full-time"
              type="checkbox"
            />
            Full-time
          </label>
          <label htmlFor="search-bar-status-part-time">
            <input
              id="search-bar-status-part-time"
              name="search-bar-status-part-time"
              type="checkbox"
            />
            Part-time
          </label>
          <label htmlFor="search-bar-status-contractor">
            <input
              id="search-bar-status-contractor"
              name="search-bar-status-contractor"
              type="checkbox"
            />
            Contractor
          </label>
          <label htmlFor="search-bar-status-internship">
            <input
              id="search-bar-status-internship"
              name="search-bar-status-internship"
              type="checkbox"
            />
            Internship
          </label>
        </div>
      </li> */}
    </Container>
  );
};

const Container = styled.ul`
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1rem;
  margin-top: 4.1rem;
  position: relative;
  top: 2rem;
  width: calc(100% - 1rem);
  @media screen and (max-width: 350px) {
    width: calc(100% - 26px);
  }
  li {
    border-radius: 2px;
    box-shadow: 0px 1px 8px #c3c2c2;
    display: block;
  }
  .location-li {
    background-color: #f4bd31;
    padding: 1rem 0.8rem;
    .location {
      display: flex;
      justify-content: center;
      padding: 0;
      input {
        outline: none;
        border: none;
        background-color: transparent;
        font-family: interbold;
        font-weight: 700;
        font-size: 0.8rem;
        text-align: center;
        width: fit-content;
        @media screen and (max-width: 400px) {
          height: 1.5rem;
        }
      }
      input::placeholder {
        color: #000;
      }
      svg {
        font-size: 1.3rem;
      }
    }
    @media screen and (max-width: 400px) {
      padding: 0.8rem 0.1rem;
    }
  }
  .status-li {
    background-color: white;
    .status {
      display: grid;
      grid-template-columns: max-content max-content;
      grid-gap: 0 0.4em;
      align-content: center;
      justify-content: center;
      align-items: center;
      justify-items: start;
      padding: 0.5rem;
      label {
        font-family: interbolder;
        display: flex;
        align-items: center;
        @media screen and (max-width: 400px) {
          font-size: 0.7rem;
        }
      }
    }
  }
`;
