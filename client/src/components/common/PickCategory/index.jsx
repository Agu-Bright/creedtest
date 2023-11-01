import React, { useState } from 'react'
import styled from 'styled-components'
import TopBar from './TopBar'
import Grid from './Grid'

const index = ({hide, onPick=() => {}}) => {
  const [query, setQuery] = useState('');

  return (
    <Wrapper>
      <Overlay 
        onClick={hide}
      />
      <Container>
        <TopBar hide={hide} setQuery={setQuery} />
        <Grid query={query} onPick={onPick} hide={hide} />
      </Container>
    </Wrapper>
  )
}

export default index

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  height: 100vh;
  
  @media(min-width: 1024px) {
    display: grid;
    place-items: center;
    position: fixed;
    inset: 0;
    height: 100vh;
    top: 0;
  }
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  cursor: pointer;

  @media(max-width: 1024px) {
    display: none;
  }
`

const Container = styled.div`
  background-color: #EBF2F7;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  z-index: 1900;

  @media(min-width: 1024px) {
    width: 75vw;
    height: 80vh;
    max-height: 650px;
    max-width: 1080px;
    border-radius: 10px;
    padding-bottom: 0;
  }
`