import React from "react";
import styled from "styled-components";
import { Searchbar } from "./Searchbar";

export const Header = () => {
  return (
    <Container>
      <li>
        <p>
          All Nigeria <span>• 1 687 696 Ads</span>
        </p>
      </li>
      <Searchbar />
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 15px 17px 15px 24px;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 0.9em;
    margin: 0;
    span {
      color: #6c8ea0;
    }
    @media screen and (max-width: 450px) {
      font-size: 0.8em;
    }
  }
  @media screen and (max-width: 450px) {
    // margin-top: 5rem;
    margin-bottom: 0.3rem;
    padding: 0.7rem;
  }
`;
