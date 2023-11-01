import React from "react";
import styled from "styled-components";

export default function FBReply(props) {
  return (
    <Container>
      <div className="feedback">
        <div className="feedback-customer">
          <div className="feedback-customer-profile">
            <div className="feedback-customer-profile-picture">
              <img src={props.img} alt="" />
            </div>
            <div className="feedback-customer-name">
              <h4>{props.customer}</h4>
              <p>{props.customeremail}</p>
            </div>
          </div>
          {/* <div className="feedback-date-time">
            <ul>
              <li>Tue 04</li>
              <li>16:11</li>
            </ul>
          </div> */}
        </div>
        {/* <div className="feedback-review">
          <p>{props.review}</p>
        </div> */}
        <div className="feedback-additional-summary">
          {/* <h5>{props.summary}</h5> */}
          <p>{props.additionalsummary}</p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 0.7rem;
  .feedback {
    display: flex;
    flex-direction: column;
    .feedback-customer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .feedback-customer-profile {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 10px;
        .feedback-customer-profile-picture {
          height: auto;
          
          >img { 
            height: 28px !important;
            width: 28px !important;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 0.4rem;

            @media (min-width: 370px) {
              height: 48px !important;
              width: 48px !important;
            }
          }
        }
        .feedback-customer-name {
          padding-top: 0.3rem;
          text-align: left;

          h4 {
            font-size: 0.9rem;
            font-family: inter;
            color: #4f4f4f;
            margin-bottom: 0.5rem;
          }
          p {
            font-size: 0.75rem;
            margin: 0;
            color: #9CABB5;
          }
        }
      }
      .feedback-date-time {
        ul {
          display: flex;
          flex-direction: row;
          gap: 15px;
          li {
            list-style: none;
            font-size: 0.8rem;
          }
        }
      }
    }
    .feedback-review {
      background-color: pink;
      padding: 0.3rem;
      font-family: interbolder;
      width: fit-content;
      border-radius: 5px;
      opacity: 0.5;
      font-size: 0.6rem;
      margin: 0 3.5rem 1rem;
      color: red;
      p {
        margin: 0;
      }
    }
    .feedback-additional-summary {
      margin-left: 1.5rem;
      text-align: left;
      h5 {
        margin: 0.3rem 0 0.6rem 0;
        font-family: inter;
        font-size: 0.875rem;
        color: #475661;
      }
      p {
        font-size: 0.875rem;
        color: #475661;
        line-height: 1.4rem;
        font-family: inter;
        margin-top: 0 !important;
      }

      @media (min-width: 370px) {
        margin-left: 3.5rem;
      }
    }
  }
`;
