import React from 'react'
import styled from 'styled-components'

export const JobBoardFilter = ({showFilter}) => {
  return (
    <Container>
      <div className="top">
        <select name="cars" id="cars">
          <option value="newest" defaultValue>Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Popular</option>
          <option value="recommeneded">Recommended</option>
        </select>
        <p className='stats'>13,746,34 jobs found, pricing in USD</p>
      </div>
      <button 
        className='filter__btn'
        onClick={showFilter}
      >Filter</button>
    </Container>
  )
}

const Container = styled.div`
  background-color: #ffffff;
  padding: 1.25em!important;
  .top {
    display: flex;
    align-items: center;
  }
  select{
    padding: 0.5em 0.8em;
  }
  p{
    padding-left: 2em;
    height: max-content;
  }
  > .filter__btn {
    display: none;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: 1px solid lightgray;
  }
  @media screen and (max-width: 768px) {
    > .filter__btn {
      display: block;
    }
  }
  @media screen and (max-width: 300px){
    padding: 0!important;
    flex-direction: column;
    p{
      padding: 0.2em 0.3em;
    }
  }
`