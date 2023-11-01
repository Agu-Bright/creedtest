import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

export const Searchbar = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Container>
      <SearchIcon
        sx={{
          color: "#6c8ea0",
        }}
      />
      <input
        placeholder="Find state, city or district..."
        type="text"
        ref={inputRef}
      />
    </Container>
  );
};

const Container = styled.li`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border-radius: 0.25em;
  padding: 0 0.8em;
  input {
    margin-left: 0.4em;
    padding: 0;
    border: 0;
    outline: 0;
    line-height: 40px;
    background-color: inherit;
    width: 13em;
    @media screen and (max-width: 470px) {
      width: 9em;
      font-size: 0.8rem;
    }
  }
`;
