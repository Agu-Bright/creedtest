import React from "react"
import styled from "styled-components"
import { SearchBar } from "../../../components/Browse/SearchBar"

export const Header = () => {
  return (
    <Container>
      <h2>Browse By Category</h2>
      {/* <SearchBar placeholder="Search by categories"/> */}
    </Container>
  )
}

const Container = styled.div`
  /* margin: 0 30px; */
  width: 80%;
  min-width: 500px;
  margin: 0 auto;
  h2{
    width: max-content;
  }
  @media screen and (max-width: 550px) {
    width: 95%;
    min-width: 0;
  }
`
