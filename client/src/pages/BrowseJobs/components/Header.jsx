import React from 'react'
import styled from 'styled-components'

export const Header = ({ className="none"}) => {
  return (
    <Container className={className}>
      <article>
        <h1>Apply To Multiple Nigerian Projects, Or Enterprises</h1>
        <p>Looking for special deals and services? CreedLance has your back.</p>
      </article>
    </Container>
  )
}

const Container = styled.div`
  background-color: rgba(0,0,0,0.5);
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
  min-height: 19em;
  padding: 0 0 2em 0;
  *{
    margin: 0;
    padding: 0;
  }
  article{
    height: max-content;
    margin: 0 auto;
    width: fit-content;
    color: #ddd;
    text-align: center;
    h1, p{
      text-shadow:
        -0.03125em -0.03125em 0 #3b2a00,
        0 -0.03125em 0 #3b2a00,
        0.03125em -0.03125em 0 #3b2a00,
        0.03125em 0 0 #3b2a00,
        0.03125em 0.03125em 0 #3b2a00,
        0 0.03125em 0 #3b2a00,
        -0.03125em 0.03125em 0 #3b2a00,
        -0.03125em 0 0 #3b2a00;
    }
    h1{
      padding-bottom: 0.3em;
      font-size: 2em;
    }
    p{
      font-size: 1.3em;
    }
    @media screen and (max-width: 750px){
      margin: 0 auto;
      padding: 0 1em;
    }
  }
`