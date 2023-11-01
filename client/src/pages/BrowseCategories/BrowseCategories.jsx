import styled from "styled-components"
import React from "react"
import { Header } from "./components/Header"
import { CategoriesContent } from "./components/Content"
import Nav from "../../components/nav/Nav"
import Footer from "../../components/Footer/Footer"

export const BrowseCategories = () => {
  return (
    <Container>
      <Nav />
      <Header />
      <CategoriesContent className="category" />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  background-color: #FDFBF6;
  .search-bar{
    align-items: center;
    background-color: #ffffff;
    border-radius: 0.18em;
    box-shadow: 0px 2px 5px #cccccc;
    display: flex;
    flex-direction: row;
    height: 2.7em;
    padding: 0 0 0 0.5em;
    input{
      border: 0;
      flex: 1;
      padding: 0;
      font-size: 1.2em;
      height: 100%;
      min-width: 5ch;
      outline: 0;
    }
    div{
      background-color: #FDFBF6;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      aspect-ratio: 1/1;
    }
  }
`