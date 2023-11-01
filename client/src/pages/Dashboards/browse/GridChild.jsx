import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

export const GridChild = ({ obj }) => {
  return (
    <Container status={obj["work-time"]} rating={obj.rating} match={obj.match}>
      <div className="services-slider">
        <button className="before">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.5"
            height="14"
            viewBox="0 0 9 12"
            fill="none"
          >
            <path
              d="M6.97989 0L8.38989 1.41L3.80989 6L8.38989 10.59L6.97989 12L0.979892 6L6.97989 0Z"
              fill="#FFC700"
            />
          </svg>
        </button>
        <img src={obj.imgUrl} alt={obj.name} loading="lazy" />
        <button className="after">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.5"
            height="14"
            viewBox="0 0 9 12"
            fill="none"
          >
            <path
              d="M2.02011 12L0.610107 10.59L5.19011 6L0.610107 1.41L2.02011 0L8.02011 6L2.02011 12Z"
              fill="#FFC700"
            />
          </svg>
        </button>
      </div>
      <div className="content">
        <Link to={"/service/" + obj.id} className="name">
          {obj.name}
        </Link>
        <div className="data">
          <p className="job">{obj.job}</p>
          <p className="wage">₦ {new Intl.NumberFormat().format(obj.wage)}</p>
        </div>
        <div className="stats">
          <div className="stats-container">
            <div className="ratings">
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
            <p className="reviews">Reviews &#40;{obj.review}&#41;</p>
          </div>
          <button className="btn-trash">
            <BsTrash />
          </button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.li`
  background-color: #FFFFFF;
  border-radius: 0.2em;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 100%;
  *{
    margin: 0;
    box-sizing: border-box;
  }
  .services-slider{
    position: relative;
    height: 11.4375em;
    .before{
      left: 0.3125em;
    }
    .after{
      right: 0.3125em;
    }
    .before, .after{
      border: 0;
      outline: 0;
      color: #FFC700;
      background-color: transparent;
      display: block;
      position: absolute;
      top: 5.3125em;
    }
    img{
      width: 10.5625em; //169px
      height: 11.4375em; //183px
      border-radius: 0.2em 0 0 0.2em;
    }
  }
  .content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.3em 0.5em;
    width: 100%;
    .name{
      font-weight: bold;
      font-size: 1.1em;
      margin-top: 0.2em;
      display: block;
      color: #501f85;
    }
    .data{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .job{
        display: inline-flex;
        flex-direction: column;
        font-weight: bold;
        ::after{
          content: "${(props) => props.status}";
          display: block;
          text-transform: capitalize;
          font-weight: normal;
          font-size: 0.8em;
        }
      }
      .wage{
        font-weight: bold;
      }
    }
    .stats{
      display:flex;
      justify-content:space-between;
      align-items:center;
      .stats-container{
        .ratings{
          width: max-content;
          fill: #FFC700;
          position: relative;
          svg{
            width: 1.3em;
          }
          .ratings-cover{
            position: absolute;
            width: ${(props) => (10 - props.rating) * 10 + "%"};
            height: 100%;
            background-color: white;
            mix-blend-mode: color;
            top: 0;
            right: 0;
          }
        }
        .reviews{
          display: inline-flex;
          flex-direction: row;
          font-size: 0.9em;
          font-weight: bold;
          a{
            font-weight: normal;
          }
        }
      }
      button {
        outline:none;
        border:none;
        padding:0.5rem;
        cursor:pointer;
        svg{
          font-size:1rem;
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    font-size: 0.8em;
  }
  @media screen and (max-width: 800px){
    width: 100%;
  }
  @media screen and (max-width: 580px) {
    flex-direction: column;
    width: 100%;
    .services-slider img{
      width: 100%;
    }
    .content{
      gap: 0.3em;
      .data{
        flex-direction: column;
        gap: 0.3em;
      }
    }
  }
  @media screen and (max-width: 276px) {
    width: 100%;
    .content{
      .data{
        flex-direction: column;
      }
    }
  }
`;
