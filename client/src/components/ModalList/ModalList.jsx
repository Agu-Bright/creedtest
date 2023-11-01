import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { Header } from "./components/Header";
import { ModalChild } from "./components/ModalChild";

import { ModalContext } from "../../hooks/ModalContext";

export const ModalList = () => {
  const { modalData, setDisplay } = useContext(ModalContext);
  const childList = modalData.sort();
  const placeholder = useRef();
  const modalRef = useRef();
  const onClick = (e) => {
    if (e.target === modalRef.current) setDisplay(false);
  };
  return (
    <Container onClick={onClick} ref={modalRef}>
      <div className="mask ">
        <Header />
        <ul className="modal-child modal-dialog-scrollable">
          {childList.map((text, key) => {
            let before = "";
            if (placeholder.current !== text[0]) {
              before = text[0];
              placeholder.current = text[0];
            }
            return (
              <ModalChild
                text={text}
                before={before}
                parent={"abuja"}
                key={key}
              />
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  z-index: 4;
  user-select: contain;
  .mask {
    max-width: 950px;
    background-color: #dfe6fe;
    width: inherit;
    width: -moz-available;
    width: -webkit-fill-available;
    width: fill-available;
    height: 630px;
    border-radius: 1em;
    .modal-child {
      list-style: none;
      margin: 0;
      padding: 0;
      width: fit-content;
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      height: calc(100% - 70px);
      overflow-y: overlay;
      // padding-bottom: 3rem;
    }
  }
`;
