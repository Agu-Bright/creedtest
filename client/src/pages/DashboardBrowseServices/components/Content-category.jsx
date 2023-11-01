import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import category_data from "../../../assets/data/CategoryData";
import { Link } from "react-router-dom";
import { BrowseAll } from "./BrowseAll";

export const CategoriesContent = ({ className }) => {
  const containerRef = useRef(null);

  const makeSticky = () => {
    if (window.innerWidth >= 769){
      console.log(document.querySelector("html").scrollTop)
      if (document.querySelector("html").scrollTop >= 458){
        containerRef.current.style.position = "fixed"
        containerRef.current.style.top = "1rem"
        containerRef.current.style.overflow = "auto"
        containerRef.current.style.maxHeight = "93vh"
        containerRef.current.style.width = window.innerWidth < 900 ? "27%" : window.innerWidth < 1000 ? "27%" : "27.4%"
        containerRef.current.style.maxWidth = "329px"
        containerRef.current.style.zIndex = 10
      }else{
        containerRef.current.style.position = "static"
        containerRef.current.style.maxHeight = "auto"
        containerRef.current.style.overflow = "hidden"
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

  return (
    <Container className={className} ref={containerRef}>
      {category_data.map((obj, key) => (
        <Link 
          key={key}
          to={"/dashboard/browse/services/" + obj.name}
        >
          <div className="image-container">
            <img src={obj.imgUrl} alt={obj.name} />
          </div>
          <div className="text-container">
            <p className="name">
              {obj.name}
            </p>
            <p className="description">{obj.description}</p>
          </div>
        </Link>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  background-color: #f9f9f9 !important;
  border-radius: 10px;
  padding: 0.9rem 0 !important;
  flex: 0.40;

  @media (max-width: 630px) {
   display: none;
  }

  > a {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: max-content;
    padding: 0 0.7rem 1rem;
    :nth-last-child(1) {
      padding-bottom: 0;
    }
    .image-container {
      height: inherit;
      padding-right: 0.3em;
      img {
        width: 3.5em;
        height: 3.5em;
      }
    }
    .text-container {
      height: max-content;
    }
    .name {
      font-family: interbold;
      margin: 0 0 0.5em 0;
      font-size: 0.875rem;
      color: #121212;
      margin-bottom: 0.2rem !important;
      transition: 165ms;
    }
    .description {
      font-size: 0.75em;
      margin: 0;
      color: #000;
      font-family: inter;
    }

    :hover .text-container > .name {
      color: #DAA520;
    }
  }
  &.category {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25em, 30%));
    justify-content: center;
    padding: 0;
    grid-gap: 1.2em;
    list-style: none;
    width: 90%;
    margin: 2em auto;
    @media screen and (max-width: 910px) {
      display: flex;
      flex-direction: column;
    }
  }
  &.service {
    background-color: #ffffff;
    margin: 0;
    padding: 0.5em 0.3em;
    width: 400px;
    border-radius: 0.3em;
    li {
      margin: 0.25em 0;
    }
    .name {
      margin: 0;
    }
  }
`;
