import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Summary = (props) => {
  return(
    <Container rating={props.rating}>
      <div className="title-image">
        <img src="titleImg.png" alt="title asset" />
      </div>
      <ul className="title">
        <li className="name">
          <a href={props.company_link} target="_blank" rel="noopener noreferrer">{props.company}</a>
          <p>{props.work_location}</p>
        </li>
        <li className="time">
          <p>{props.posted} ago.</p>
        </li>
        <li className="stats">
          <div className='ratings'>
            <svg viewBox="0 0 576 512" width="100" title="star">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
            <svg viewBox="0 0 576 512" width="100" title="star">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
            <svg viewBox="0 0 576 512" width="100" title="star">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
            <svg viewBox="0 0 576 512" width="100" title="star">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
            <svg viewBox="0 0 576 512" width="100" title="star">
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>
            <div className="ratings-cover"></div>
          </div>
        </li>
        <li className='reviews'>
          <p>See reviews <Link to="">&#40;{props.review}&#41;</Link></p>
        </li>
        <li className="user-data">
          <p className="views"><VisibilityIcon sx = {{x:10,y:10}}/> {props.views} Views</p>
          {props.bookmark? <BookmarkBorderOutlinedIcon sx = {{x:10,y:10}}/> : <BookmarkIcon sx = {{x:10,y:10}} />}
        </li>
        <li className="button">
          <button>Message</button>
        </li>
      </ul>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: #455A64;
  padding: 3em 1em;
  font-size: 1.1em;
  *{
    margin: 0;
    padding: 0;
  }
  .title-image{
    max-width: 37.5em;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img{
      height: 100%;
      width: 100%;
      max-width: 37.5em;
      border-radius: 0.3em;
    }

  }
  .title{
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1em;
    padding: 0 1em;
    justify-content: space-around;
    .name{
      color: #FFFFFF;
      font-size: 0.9em;
      display: flex;
      flex-direction: row;
      a{
        color: inherit;
        text-decoration: underline;
      }
      p{
        width: max-content;
        color: inherit;
        padding-left: 0.5em;
      }
    }
    .time{
      color: #FFD700;
      font-size: 0.8em;
      p{
        font-weight: bold;
        color: inherit;
      }
    }
    .stats{
      .ratings{
        width: max-content;
        fill: #FFC700;
        position: relative;
        svg{
          width: 1.3em;
        }
        .ratings-cover{
          position: absolute;
          width: ${props => (10-props.rating)*10+"%"};
          height: 100%;
          background-color: white;
          mix-blend-mode: color;
          top: 0;
          right: 0;
        }
      }
    }
    .reviews{
      display: flex;
      flex-direction: row;
      font-size: 0.9em;
      font-weight: bold;
      a{
        font-weight: normal;
      }
    }
    .user-data{
      display: flex;
      flex-direction: row;
      p{
        font-size: 0.9em;
        font-weight: bold;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding-right: 1em;
        svg{
          padding-right: 0.4ch;
        }
      }
    }
    .button{
      color: #FFFFFF;
      button{
        border-radius: 0.1em;
        width: 100%;
        font-size: 1em;
        font-weight: bold;
        border: 0;
        outline: 0;
        background-color: #FFC700;
        color: inherit;
        padding: 1em 3em;
      }
    }
  }
  @media screen and (max-width: 600px){
    flex-direction: column;
    .title-image{
      width: 100%;
    }
    .title{
      padding: 0.8em 0;
      .name{
        font-size: 1.2em;
      }
    }
  }
  @media screen and (max-width: 470px){
    padding: 6em 1em;
  }
`