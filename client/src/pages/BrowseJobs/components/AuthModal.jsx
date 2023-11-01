import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AuthModal = ({hide}) => {
  return (
    <Container>
      <Overlay onClick={hide} />
      <Modal>
        <h3>Hey! welcome</h3>
        <p>To use this feature you have to be logged in</p>
        <Link to='/create-account' className="yellow__btn">
          Get Started
        </Link>
        <Link to='/login'>I already have an account</Link>
      </Modal>
    </Container>
  )
}

export default AuthModal

const Container = styled.div`
  position: fixed;
  z-index: 1998;
  inset: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`

const Modal = styled.div`
  width: 70%;
  background-color: #f3f3ef;
  z-index: 1999;
  border-radius: 8px;
  padding: 1em;
  text-align: center;

  h3 {
    margin: 0;
    font-family: intermedium;
    font-weight: initial;
    font-size: 1em;
  }

  p {
    font-size: 0.75em;
    margin-bottom: 1.5rem;
    color: #9D9EA2;
  }

  a {
    width: 100%;
    margin-top: 0.8rem;
    padding: 0.6rem 0;
    background-color: #fff;
    color: #121212;
    font-family: inter;
    font-size: 0.75em;
    border: none;
    border-radius: 6px;
    display: block;
  }

  a.yellow__btn {
    background-color: #ebb324;
    color: #121212;
  }

  @media (min-width: 1024px) {
    max-width: 350px;
    padding: 2rem 1.5rem;

    h3 {
      font-size: 1.2em;
    }

    p {
      font-size: 0.875em;
      margin-bottom: 1.5rem;
    }

    a {
      padding: 0.8rem 0;
      font-size: 0.875em;
    }
  }
`

const Overlay = styled.div`
  background-color: #0000008b;
  position: fixed;
  inset: 0;
`