import React from "react";
import styled from "styled-components";

import { SearchBar } from "../../../components/Browse/SearchBar";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Link } from "react-router-dom";

export const Resources = ({showJobCategories}) => {
  return (
    <Container>
      <ul>
        <li className="search-bar-container">
          <SearchBar placeholder="Search for Services and Companies" />
        </li>
        <li className="category-link">
          <Link to="/browse/categories" onClick={(e) => {
              e.preventDefault();
              showJobCategories();
              document.querySelector('html').classList.add('modal__open');
          }}>
            <CategoryOutlinedIcon />
            <p>Categories</p>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 0;
  ul {
    align-items: center;
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0 auto;
    padding: 0;
    position: relative;
    top: -1.6em;
    width: calc(100% - 1rem) !important;
    max-width: 850px;
    z-index: 2;
    .search-bar-container {
      flex: 1;
      margin: 0 0.4em 0 0;
      .search-bar {
        align-items: center;
        background-color: #ffffff;
        border-radius: 0.18em;
        box-shadow: 0px 2px 5px #999;
        display: flex;
        flex-direction: row;
        height: 3.2em;
        padding: 0 0 0 0.5em;
        input {
          border: 0;
          flex: 1;
          padding: 0;
          font-size: 1.2em;
          height: 100%;
          min-width: 5ch;
          outline: 0;
          font-family: interbold;
        }
        div {
          background-color: #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          aspect-ratio: 1/1;
        }
      }
    }
    .category-link {
      background-color: #fbf6ce;
      padding: 0.45em 1em;
      height: max-content;
      width: max-content;
      box-shadow: 0px 0px 8px #7b7a7a;
      a {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: inherit;
        justify-content: center;
        height: 2.3em !important;
        p {
          margin: 0 0 0 0.4em;
          font-size: 0.8em;
          font-weight: bold;
        }
      }
    }
    @media screen and (max-width: 900px) {
      flex-direction: row-reverse;
      width: 90%;
      /* margin: 0 30px; */
      .search-bar-container {
        margin: 0 0 0 0.4em;
      }
    }
    @media screen and (max-width: 502px) {
      flex-direction: row-reverse;
      margin: 0 auto;
      .search-bar-container {
        width: 60%;
      }
    }
    @media screen and (max-width: 470px) {
      margin: 0 8px;
      width: calc(100% - 66px);
      flex-direction: column;
      .category-link,
      .search-bar-container {
        width: 100%;
        margin: 0 0.1em 0.45em 0.1em;
      }
      .search-bar-container .search-bar {
        width: 100%;
        padding: 0;
        input {
          padding: 0 0 0 1em;
          font-size: 0.9rem;
        }
      }
      .category-link {
        padding: 0.6em 0rem;
        background-color: #f4d36a;
      }

      a {
        width: 100%;
        padding: 0;
      }
    }
    @media screen and (max-width: 470px) {
      margin-right: auto;
      margin-left: auto;
    }
    @media screen and (max-width: 350px) {
      width: calc(100% - 26px);
    }
  }
`;
