import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CategoriesContent } from "./Content-category";
import { ContentSearchBar } from "./ContentSearchBar";
import { Grid } from "./Grid";
import { Pagination } from "@mui/material";
import Filter from "./Filter";

export const ServicesContent = () => {
  const mainConRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const handleResize = () => {
    if(window.innerWidth < 769){
      setIsMobile(true)
    }else{
      setIsMobile(false);
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const makeSticky = () => {
    if (window.innerWidth >= 769){
      if (document.querySelector("html").scrollTop >= 458){
          mainConRef.current.style.flex = "1"
          mainConRef.current.style.marginLeft = window.innerWidth < 900 ? "calc(322px + 1.5rem)" : window.innerWidth < 1000 ? "calc(322px + 1.5rem)" : window.innerWidth < 1073 ? "calc(322px + 1.5rem)" : "calc(322px + 1.5rem)"
      }else{
        mainConRef.current.style.position = "static"
        mainConRef.current.style.flex = "1"
        mainConRef.current.style.marginLeft = "0px"
      }
    }
  }

  useEffect(() => {
    makeSticky()
    window.addEventListener("scroll", makeSticky);

    return () => {
      window.removeEventListener("scroll", makeSticky)
    }
  }, [])

  useEffect(() => {
    makeSticky()
    window.addEventListener("resize", makeSticky);

    return () => {
      window.removeEventListener("resize", makeSticky)
    }
  }, [])

  return (
    <Container>
      {(!isMobile || showFilter) && <Filter hide={() => setShowFilter(false)} setFixTab={() => {}} />}
      <li className='services__main__container' ref={mainConRef}>
      {/* <h2>Services</h2> */}
        <ContentSearchBar className="desktop" />
        <Grid showFilter={() => setShowFilter(true)} />
      </li>
    </Container>
  );
};

const Container = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 3.5em auto 0;
  gap: 1.5rem;
  max-width: 1200px;
  min-height: 100vh;

  li .MuiPagination-root {
    padding: 1.8em 0;
    ul {
      justify-content: center;
    }
  }
  /* > li.desktop {
    flex: 0.3 1 auto%;
  } */
  > li.services__main__container {
    flex: 1;
    background-color: #f9f9f9;
    padding: 0.7rem;
    border-radius: 4px;
    height: fit-content;
  }
  @media screen and (max-width: 1430px) {
    .desktop {
      display: none;
    }
  }
`;
