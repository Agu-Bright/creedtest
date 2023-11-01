import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export const Filter = ({hide}) => {
  const type = ["Local", "Remote", "Full Time"]
  const [skills, setSkills] = useState(["CSS", "Copy Writing", "PHP", "Java"])
  const delivery = [1, 2, 3, 4];
  const filterRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const makeSticky = () => {
    if (window.innerWidth >= 769){
      if (document.querySelector("html").scrollTop >= 458){
        filterRef.current.style.position = "fixed"
        filterRef.current.style.top = "1rem"
        filterRef.current.style.overflow = "auto" // window.innerHeight >= 940 ? "hidden" : "auto"
        filterRef.current.style.height = "fit-content"
        filterRef.current.style.width = "25%"
        filterRef.current.style.maxWidth = "270px"
        filterRef.current.style.maxHeight = "90vh"
        filterRef.current.style.zIndex = 10
      }else{
        filterRef.current.style.position = "static"
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", makeSticky);

    return () => {
      window.removeEventListener("scroll", makeSticky)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("resize", makeSticky);

    return () => {
      window.removeEventListener("resize", makeSticky)
    }
  }, [])

  return (
    <Container ref={filterRef}>
      <CloseIcon onClick={hide} />
      <p className='title'>Freelancer State</p>
      <div className='search-bar'>
        <SearchIcon />
        <input type="text" placeholder="Search States"/>
      </div>
      <div className='filter-by'>
        <p className='title'>Filter By</p>
        <p className='budget'>Budget</p>
        <ul className='filter'>
          <li>
            <label htmlFor='budget-hourly' onClick={(e) => e.stopPropagation()}>
              <input id="budget-hourly" name="budget-hourly" type="checkbox" />
              <p>Hourly Projects</p>
            </label>
            <div className='controls'>
              <input placeholder='min' className='min' type="number"/>
              <span>to</span>
              <input placeholder='max' className='max' type="number"/>
            </div>
          </li>
          <li>
            <label htmlFor='budget-fixed' onClick={(e) => e.stopPropagation()}>
              <input id="budget-fixed" name="budget-fixed" type="checkbox" />
              <p>Fixed Price Projects</p>
            </label>
            <div className='controls'>
              <input placeholder='min' className='min' type="number"/>
              <span>to</span>
              <input placeholder='max' className='max' type="number"/>
            </div>
          </li>
        </ul>
        <button className='all-durations'>All Durations</button>
      </div>
      {showMore && (
        <Fragment>
          <div className='filter-list'>
            <p className='title'>Type</p>
            {
              type.map((name, key) => <label key={key} htmlFor={'type-'+name.split(" ")[0].toLowerCase()} onClick={(e) => e.stopPropagation()}>
              <input id={'type-'+name.split(" ")[0].toLowerCase()} name={'type-'+name.split(" ")[0].toLowerCase()} type="checkbox" />
              <p>{name}</p>
            </label>)
            }
          </div>
          <div className='filter-list'>
            <p className='title'>Skills</p>
            {
              skills.map((name, key) => <label key={key} htmlFor={'skills-'+name.split(" ")[0].toLowerCase()} onClick={(e) => e.stopPropagation()}>
              <input id={'skills-'+name.split(" ")[0].toLowerCase()} name={'skills-'+name.split(" ")[0].toLowerCase()} type="checkbox" />
              <p>{name}</p>
            </label>)
            }
            <input type="text" placeholder='Enter any other Skills' onKeyDown={(e) => {
              if(e.key === "Enter"){
                setSkills([...skills, e.target.value])
                e.target.value = ""
              }
              }}/>
          </div>
          <div className='filter-list'>
            <p className='title'>Duration of Job</p>
            {
              delivery.map((duration, key) => <label key={key} htmlFor={'delivery-'+ duration.toString()} onClick={(e) => e.stopPropagation()}>
                <input id={'delivery-'+ duration.toString()} name={'delivery-'+ duration.toString()} type="checkbox" />
                <p>Within {duration} day{duration > 1 && "s"}</p>
              </label>)
            }
          </div>
        </Fragment>
      )}
      <ShowMoreButton onClick={() => setShowMore(!showMore)}>
        {showMore ? "Minimize Filter" : "Expand Filter"}
      </ShowMoreButton>
      <Spacing />
    </Container>
  )
}

const Container = styled.li`
  padding: 1.5em 1em 0 1em;
  background-color: #f0eeee;
  border: 1px solid #000000;
  height: fit-content !important;
  width: 25%;
  position: sticky;
  top: 1em;
  scrollbar-color: #cdccca #f1f1f1;
  scrollbar-width: thin;

  /* width */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #cdccca; 
    height: 20px !important;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #989696; 
  }

  > .MuiSvgIcon-root {
    margin-left: auto;
    display: none;
  }

  label{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    font-size: 0.75em;
    p{
      padding-left: 0.3em;
      display: inline-block;
      flex: 1;
    }
  }
  .title{
    padding-bottom: 1em;
  }
  .search-bar{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #FFFFFF;
    padding: 0.2em;
    input{
      border: 0;
      outline: 0;
      line-height: 1.1em;
      flex: 1;
      padding-right: 0.5em;
      width: 100%;
    }
  }
  .filter-by{
    padding: 1.5em 0 0 0;
    .title{
      padding-bottom: 1em;
    }
    .budget{
      font-weight: bold;
      font-size: 0.8em;
      padding-bottom: 0.6em;
    }
    .filter{
      list-style: none;
      padding: 0;
      li{
        margin-top: 0.5em;
        .controls{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 0.2rem 0 0 0;
          /* max-width: 150px; */
          width: 100%;
          padding: 0.5em 0;
          gap: 0.5rem;
          input{
            width: 40%;
            line-height: 1.5em;
            -moz-appearance: textfield;
            ::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
        }
      }
    }
    .all-durations{
      background-color: white;
      outline: 0;
      border: 0;
      padding: 0.8em !important;
      padding: 0.5em;
      margin: 1.5em 0;
      width: 100%;
      border: 1px solid #999898;
    }
    .all-durations:hover{
      box-shadow: 0px 0px 8px #9c9a9a75;
    }
  }
  .filter-list{
    margin: 2em 0;
    .title{
      font-weight: bold;
      font-size: 0.9em;
    }
    label{
      padding: 0 0 0.5em;
    }
    input[type="text"]{
      border: 0;
      outline: 0;
      padding: 0.5em;
      width: 100%;
      max-width: 150px;
      margin-top: 0.5em
    }
  }
  @media screen and (max-width: 768px){
    position: fixed;
    flex: 1;
    width: 96%;
    inset: 0;
    margin: 0 auto;
    top: 0;
    z-index: 1000;
    height: 100vh !important;
    overflow-y: auto;
    
    > .MuiSvgIcon-root {
      display: block;
    }
  }

  @media screen and (max-width: 583px){
    width: 94%;
  }

  @media screen and (max-width: 431px){
    width: 92%;
  }

  @media screen and (max-width: 329px){
    width: 90%;
  }
`

const Spacing = styled.div`
  display: none;
  @media screen {
    display: block;
    height: 50px;
  }
`

const ShowMoreButton = styled.button`
  
`