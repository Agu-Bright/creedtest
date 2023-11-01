import React from 'react'
import styled from "styled-components"
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from "react"

export const Carousel = ({ list }) => {
  const CarouselRef = useRef()
  const gap = 308
  const [imgUrl, setImgUrl] = useState()
  const [fullScreen, setFullScreen] = useState(false)

  const onImageClick = (e, imgUrl) => {
    setImgUrl(imgUrl)
    setFullScreen(true)
    console.log(e)
  }

  const onOverflowClick = (e) => {
    if(!e.target.alt){setFullScreen(false)}
  }

  const scrollLeft = () => {
    CarouselRef.current.scrollTo({
      left: CarouselRef.current.scrollLeft + gap,
      behavior: 'smooth'
    })
  }
  const scrollRight = () => {
    CarouselRef.current.scrollTo({
      left: CarouselRef.current.scrollLeft - gap,
      behavior: 'smooth'
    })
  }
  
  return (
    <Container>
      <ul ref={CarouselRef}>
        <li className='before' onClick={scrollRight}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 9 12" fill="none">
              <path d="M6.97989 0L8.38989 1.41L3.80989 6L8.38989 10.59L6.97989 12L0.979892 6L6.97989 0Z" fill="#FFC700"/>
            </svg>
        </li>
        {
          list.map((imgUrl, key) => <li key={key} className="image" onClick={(e) => onImageClick(e, imgUrl)}><img src={imgUrl} alt={"carousel "+key} /></li>)
        }
        <li className='after' onClick={scrollLeft}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 9 12" fill="none">
              <path d="M2.02011 12L0.610107 10.59L5.19011 6L0.610107 1.41L2.02011 0L8.02011 6L2.02011 12Z" fill="#FFC700"/>
            </svg>
        </li>
        <div className={'overflow ' + (!fullScreen ? "hide-overflow" : "")} onClick={onOverflowClick}>
          <img src={imgUrl} alt={"carousel"} />
          <CloseIcon className='close-icon'/>
        </div>
      </ul>
    </Container>
  )
}

const Container = styled.div`
  ul{
    background-color: #D9D9D9;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    list-style: none;
    margin: 0 auto;
    max-width: max-content;
    padding: 0.3em;
    position: relative;
    width: 100%;
    overflow-x: scroll;
    scroll-snap-stop: always;
    /* Hide Scrollbar */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    .before{
      left: 0.6em;
    }
    .after{
      right: 0.9em;
    }
    .before, .after{
      border: 0;
      outline: 0;
      color: #FFC700;
      background-color: transparent;
      display: block;
      position: sticky;
      top: 105px;
      height: max-content;
      width: 0;
    }
    .image{
      padding-right: 0.5em;
      cursor: pointer;
    }
    .image:nth-last-of-type(2){
      padding: 0;
    }
    .overflow{
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 4;
      cursor: pointer;
      img{
        max-width: 100%;
        height: 80%;
        cursor: normal;
      }
      svg.close-icon{
        position: absolute;
        right: 1em;
        top: 1em;
      }
      @media screen and (max-width: 630px) {
        img{
          width: 95%;
          max-height: 90%;
          height: auto;
        }
      }
    }
    .hide-overflow{
      display: none;
    }
  }
`
