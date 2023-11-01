import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const OtherServices = ({ list, company }) => {
  return (
    <Container>
      <li className='title'><p>Other Services From {company}</p></li>
      {list.map((item, key) => <li className='list' key={key}><Link to="#"><p className='position'>{item.position}</p><p>{item.location}</p></Link></li>)}
    </Container>
  )
}

const Container = styled.ul`
  list-style: none;
  padding: 2em 1em;
  margin: 0;
  background-color: #F0EFEF;
  gap: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    p{
      font-weight: bold;
      text-transform: uppercase;
    }
  }
  .list{
    width: 100%;
    max-width: 1000px;
    a{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .position{
      flex: 1;
      display: flex;
      align-items: center;
      :after{
        content: "";
        display: block;
        border-bottom: 1px dashed black;
        height: max-content;
        flex: 1;
        margin: 0 0.4em;
      }
    }
  }
`