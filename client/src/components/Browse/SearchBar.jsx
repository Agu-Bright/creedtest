import React from "react";
import styled from "styled-components";

import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ placeholder }) => {
  return (
    <Container className="search-bar">
      <input type="text" placeholder={placeholder} />
      <div className="icon-container">
        <SearchIcon sx={{ width: 25, height: 25 }} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  > input {
    font-family: inter !important;
    font-size: 1em !important;
  }

  @media screen and (min-width: 516px) {
    > input {
      font-size: 1.1em !important;
    }
  }

  @media screen and (min-width: 544px) {
    > input {
      font-size: 1.2em !important;
    }
  }

  @media screen and (min-width: 680px) {
    > input {
      font-size: 1.3em !important;
    }
  }

  @media (min-width: 1024px) {
    > input {
      padding: 0 0.8rem !important;
    }
    > input::placeholder {
    /* font-family: intermedium !important; */
  }
  }
`;
