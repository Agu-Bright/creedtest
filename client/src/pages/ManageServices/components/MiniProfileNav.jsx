import React from "react";
import styled from "styled-components";
import { device } from "../../../theme/mediaQueries";
import { BiSearch } from "react-icons/bi";

export default function MiniProfileNav(props) {
  return (
    <Container>
      <div className="tablet-nav">
        <h3>{props.h3}</h3>
        {props.placholder ? (
          <input type="search" placeholder={props.placeholder} />
        ):null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .tablet-nav {
    display: none;
    @media ${device.tabs} {
      display: block;
      background-color: #455a64;
      color: #fff;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
    }
    @media ${device.mobile} {
      margin-top: 3.9rem;
      position: relative;
    }
    h3 {
      font-size: 1.5rem;
    }
    [type="search"] {
      border-radius: 5px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;
      outline: none;
      border: none;
      font-size: 0.9rem;
      width: 70%;
      padding: 0.3rem;
      text-align: center;
    }
  }
`;
