import React from 'react'
import styled from 'styled-components'

export const Header = ({ height = 18.75, className="none"}) => {
  return (
    <Container height={height} className={className}>
      <h1>Explore the Nigeria&#x2019;s leading Services</h1>
    </Container>
  )
}

const Container = styled.div`
  background-color: rgb(74 74 74 / 50%);
  background-blend-mode: multiply;
  background-image: url("header-bg-img.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  @supports(-webkit-touch-callout: none){
    background-attachment: scroll;
  }
  @media screen and (max-width: 800px){
    background-attachment: inherit;
  }
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height + "em"};

  &.service {
    background-color: rgb(75 74 74 / 50%);
    h1{
      display: none;
    }
  }
  h1{
    color: #F4BD31;
    width: max-content;
    padding: 0 0.25em;
    text-shadow:
    -1px -1px 0 #000,
     0   -1px 0 #000,
     1px -1px 0 #000,
     1px  0   0 #000,
     1px  1px 0 #000,
     0    1px 0 #000,
    -1px  1px 0 #000,
    -1px  0   0 #000;
  }
`
