import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DeleteModal = ({ hide, handleDelete, id }) => {
  return (
    <Container>
      <Overlay onClick={hide} />
      <Modal>
        <h3>Delete Service</h3>
        <p>Are you sure you want to delete this service?</p>
        <button className="red__btn" onClick={() => handleDelete(id)}>
          Delete
        </button>
        <button onClick={hide}>cancel</button>
      </Modal>
    </Container>
  );
};

export default DeleteModal;

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

const Modal = styled.div`
  width: 70%;
  background-color: #f3f3ef;
  z-index: 1001;
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
    color: #9d9ea2;
  }

  button {
    width: 100%;
    margin-top: 0.8rem;
    padding: 0;
    background-color: #fff;
    color: #121212;
    font-family: inter;
    font-size: 0.75em;
    border: none;
    border-radius: 6px;
    display: flex;
    height: 40px;
    margin-top: 10px !important;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 1024px) {
      height: 45px;
    }
  }

  button.red__btn {
    border: 1px solid red;
    color: red;
    transition: 0.3s;
    margin-top: 1.5rem !important;
  }

  button.red__btn:hover {
    background-color: red;
    color: #fff;
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

    button {
      padding: 0.8rem 0;
      font-size: 0.875em;
    }
  }
`;

const Overlay = styled.div`
  background-color: #0000008b;
  position: fixed;
  inset: 0;
`;
