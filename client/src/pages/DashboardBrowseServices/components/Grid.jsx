import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

import { GridChild } from "./GridChild";
import Service from "./Service";
import { fetchData } from "../../../api/fetchData";

export const Grid = ({showFilter}) => {

const [services,setServices]=useState(null)
useEffect(()=>{
  fetchData('/services/get-all-services').then((data)=>console.log(data))
},[])
  return (
    <Fragment>
      <FilterButton onClick={showFilter}>Filter</FilterButton>
      <Container>
        {[].map((obj, key) => (
          // <GridChild key={key} obj={obj} />
          <Service key={key} obj={obj} />
        ))}
      </Container>
    </Fragment>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 0.8em;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 1050px) {
    grid-template-columns: 1fr;
    padding: 0 0.7rem;
    grid-gap: 0 !important;
  }
  @media screen and (max-width: 470px) {
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }
  @media screen and (max-width: 400px) {
    margin-left: 0.2em;
    margin-right: 0.2em;
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 320px) {
    grid-template-columns: 1fr;
  }
`;

const FilterButton = styled.button`
  width: 100%;
  margin-bottom: 1em;
  height: 40px;

  @media screen and (min-width: 769px) {
   display: none;
  }
`
