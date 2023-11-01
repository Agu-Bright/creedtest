import React from "react";
import styled from "styled-components";

import service_data from "../../../assets/data/ServicesData";
import { GridChild } from "./GridChild";

export const Grid = () => {
  return (
    <Container>
      {service_data.map((obj, key) => (
        <GridChild key={key} obj={obj} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em 0.8em;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 655px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 470px) {
    margin: 2.5em;
  }
  @media screen and (max-width: 400px) {
    margin-left: 0.2em;
    margin-right: 0.2em;
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(auto-fill, 100%);
  }
`;
