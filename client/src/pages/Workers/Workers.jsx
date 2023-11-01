import React from 'react'
import styled from 'styled-components'
import Nav from '../../components/nav/Nav'
import { WhatKind } from './components/WhatKind'
import { GetStarted } from './components/GetStarted'
import { ManageCareer } from './components/ManageCareer'
import { GettingWork } from './components/GettingWork'
import { WaitingFor } from './components/WaitingFor'
import Footer from '../../components/Footer/Footer'
import BackToTop from 'react-easy-back-to-top'

export const Workers = () => {
  return (
    <Container>
      <Nav />
      <WhatKind />
      <GetStarted />
      <ManageCareer />
      <GettingWork />
      <WaitingFor />
      <Footer />
      <BackToTop
        backgroundColor="goldenrod"
        icon='fa fa-arrow-up'
        position={{ right: "5%", bottom: "10%" }}
        hover={{ backgroundColor: "#fff", color: "goldenrod"}}
        transition="all 0.3s"
        showOnDistance={300}
        borderRadius={16}
        opacity="1"
        color="#fff"
        fontSize={window.innerWidth < 768 ? "14px" : "18px"}
        padding={window.innerWidth < 768 ? "12px" : "16px"}
    />
    </Container>
  )
}

const Container = styled.div`
  @media screen and (min-width: 901px) {
    font-size: 0.8em;
  }
`