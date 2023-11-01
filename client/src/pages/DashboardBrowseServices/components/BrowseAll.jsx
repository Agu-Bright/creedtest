import React from "react";
import styled from "styled-components";

export const BrowseAll = () => {
  return (
    <Container>
      <a href="#" className="browse_all">
        Browse all Services
      </a>

      <a href="/login">
        <button>Post a service</button>
      </a>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: -1 / 1;
  .browse_all {
    font-size: 25px;
    width: 100%;
  }
  button {
    margin-top: 20px;
    color: grey;
    border-radius: 0.2em;
    font-size: 1em;
    font-family: intermedium;
    border: 0;
    outline: 0;
    background-color: whitesmoke;
    border: 1px solid #ddd;
    color: black;
    padding: 1em 3em;
  }
`;
