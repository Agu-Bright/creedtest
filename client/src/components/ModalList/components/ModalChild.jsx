import React, { useContext } from 'react'
import styled from 'styled-components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { ModalContext } from '../../../hooks/ModalContext';

export const ModalChild = ({before, text, parent}) => {
  const { setModalData } = useContext(ModalContext)
  return (
    <Container before={before} onClick={() => {parent && setModalData(parent)}}>
      <p>{text}</p>
      {
        parent && 
        <ArrowForwardIosIcon sx={{
          color: "#6c8ea030"
        }}/>

      }
    </Container>
  )
}

const Container = styled.li`
  font-size: 0.9em;
  position: relative;
  background-color: #ffffff;
  display: inline-flex;
  width: 260px;
  padding: 8px 12px 8px 12px;
  margin-left: 24px;
  line-height: 24px;
  border-bottom: 1px solid #ebf2f7;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  ::before{
    content: "${props => props.before}";
    font-weight: bold;
    position: absolute;
    left: -24px;
    width: 24px;
    height: 100%;
    top: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  :hover{
    p{
      color: goldenrod;
    }
  }
  p{
    margin: 0;
  }
  button{
    border: 0;
    outline: 0;
    background: transparent;
  }
`
