import React from "react";
import DashboardNav from "../../components/dashboard_nav/dashboard_nav";
import DashboardBackground from "../../assets/dashboard-img/dashboard-background.png";
import styled from "styled-components";
import Rating from "./components/Ratings";
import RatedStars from "../../assets/review-img/rated-stars.png";
import ReviewProfilePic from "../../assets/review-img/review-profile-pic.png";
import FeedbackIcon from "../../assets/review-img/feedback-icon.png";
import { device } from "../../theme/mediaQueries";

export default function WriteReview() {
  return (
    <Container>
      <DashboardNav />
      <section className="section-review">
        <div className="review-container">
          <h4>Write a review</h4>
          <div className="describe-experience">
            <p>Describe your experience (optional)</p>
            <input type="text" />
            <div className="ratings">
              <div className="stars">
                <Rating />
              </div>
              <button>Send</button>
            </div>
          </div>
          <div className="reviews">
            <h4>Reviews</h4>
            <div className="review-list">
              <div className="client-review">
                <img src={ReviewProfilePic} alt="Profile Picture" />
                <div className="client-ratings">
                  <div className="client-ratings-heading">
                    <h3>James Saul</h3>
                    <img src={RatedStars} alt="" />
                  </div>
                  <div className="client-ratings-review">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div className="review-helpful">
                    <p>Was this review helpful?</p>
                    <button>Yes</button>
                    <button>No</button>
                  </div>
                </div>
              </div>
              <div className="client-review">
                <img src={ReviewProfilePic} alt="Profile Picture" />
                <div className="client-ratings">
                  <div className="client-ratings-heading">
                    <h3>James Saul</h3>
                    <img src={RatedStars} alt="" />
                  </div>
                  <div className="client-ratings-review">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div className="review-helpful">
                    <p>Was this review helpful?</p>
                    <button>Yes</button>
                    <button>No</button>
                  </div>
                </div>
              </div>
              <div className="client-review">
                <img src={ReviewProfilePic} alt="Profile Picture" />
                <div className="client-ratings">
                  <div className="client-ratings-heading">
                    <h3>James Saul</h3>
                    <img src={RatedStars} alt="" />
                  </div>
                  <div className="client-ratings-review">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div className="review-helpful">
                    <p>Was this review helpful?</p>
                    <button>Yes</button>
                    <button>No</button>
                  </div>
                </div>
              </div>
              <div className="client-review">
                <img src={ReviewProfilePic} alt="Profile Picture" />
                <div className="client-ratings">
                  <div className="client-ratings-heading">
                    <h3>James Saul</h3>
                    <img src={RatedStars} alt="" />
                  </div>
                  <div className="client-ratings-review">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div className="review-helpful">
                    <p>Was this review helpful?</p>
                    <button>Yes</button>
                    <button>No</button>
                  </div>
                </div>
              </div>
              <div className="client-review">
                <img src={ReviewProfilePic} alt="Profile Picture" />
                <div className="client-ratings">
                  <div className="client-ratings-heading">
                    <h3>James Saul</h3>
                    <img src={RatedStars} alt="" />
                  </div>
                  <div className="client-ratings-review">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div className="review-helpful">
                    <p>Was this review helpful?</p>
                    <button>Yes</button>
                    <button>No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <div className="feedback-container">
          <img src={FeedbackIcon} alt="" />
          <p>
            Your feedback is extremely valuable. Please leave an honest review
            to assist others in attracting customers.
          </p>
        </div>
      </section>
    </Container>
  );
}

const Container = styled.div`
  .section-review {
    background-image: url(${DashboardBackground});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: auto;
    min-height: fit-content;
    width: 100%;
    margin: 0;
    padding: 3rem 0;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    @media ${device.laptop} {
      gap:1.5rem;
    }
    @media ${device.tablet} {
     flex-direction: column-reverse;
     justify-content: center;
     align-items:center;
     
    }
    .review-container {
      max-width:fit-content;
      @media ${device.tablet} {
        margin: 0 auto;
      }
      h4 {
        margin: 0;
        font-size: 1rem;
        color: #37474f;
        margin-bottom: 0.5rem;
        margin-left: 2rem;
      }
      .describe-experience {
        background-color: #fff;
        border-radius: 10px;
        height: fit-content;
        max-width: fit-content;
        display: flex;
        padding: 1rem 2rem;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        margin-bottom: 1rem;

        @media ${device.tablet} {
          padding: 1rem;
          box-shadow: 2px 2px 13px #999;
        }@media ${device.mob} {
        }
        p {
          font-size: 0.9rem;
          display: inline-block;
          @media ${device.mobileS} {
           font-size: 0.8rem;
          }
        }
        input {
          width: 30rem;
          height: 4rem;
          border: 1px solid black;
          border-radius: 3px;
          outline: none;
          display: inline-block;
          margin-bottom: 1rem;
          @media ${device.laptop} {
            width: 25rem;
          }
          @media ${device.tablet} {
            width: 33rem;
          }
          @media ${device.tab} {
            width: 30rem;
          }
          @media ${device.mob} {
            width: 21.3rem;
          }
          @media ${device.mobileM} {
            width: 18.2rem;
          }
          @media ${device.mobileS} {
            width: 16.6rem;
          }
        }
        .ratings {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          max-width: 100%;
          .stars {
            display:flex;
            flex-direction:row;
            @media ${device.mobileL} {
              width: 40%;
            }
          }
          button {
            background-color: goldenrod;
            color: white;
            outline: none;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            padding: 0.5rem 2.5rem;
            @media ${device.mobileS} {
              font-size: 0.9rem;
              padding: 0.3rem 2rem;
            }
          }
        }
      }
      .reviews {
        background-color: #d9d9d9;
        border-radius: 10px;
        max-width: fit-content;
        h4 {
          font-size: 1rem;
          position: relative;
          top: 1rem;
        }
        .review-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          .client-review {
            background-color: #fff;
            padding: 1rem;
            width: 30rem;
            display: flex;
            align-items: flex-start;
            gap:1rem;
            @media ${device.laptop} {
              width: 25rem;
            }
            @media ${device.tablet} {
              width: 33rem;
            }
            @media ${device.tab} {
              width: 28.5rem;
            }
            @media ${device.mob} {
              width: 20rem;
            }
            @media ${device.mobileM}{
              width:17rem;
            }
            @media ${device.mobileS} {
              width: 15rem;
            }
            img {
              display:inline-block;
            }
            .client-ratings {
              display:flex;
              flex-direction:column;
              .client-ratings-heading{
                display:flex;
                flex-direction:row;
                align-items:center;
                gap: 15px;
                h3 {
                  font-size: 1rem;
                  margin:0;
                  @media ${device.mobileM} {
                    font-size: 0.8rem;
                  }
                }
                img {
                  height:auto;
                  @media ${device.mobileS} {
                    height: 1rem;
                  }
                }
              }
              .client-ratings-review {
                p {
                  font-size: 0.8rem;
                  @media ${device.mob} {
                    font-size: 0.7rem;
                  }
                }
              }
              .review-helpful {
                display:flex;
                flex-direction:row;
                gap:10px;
                margin-left:auto;
                align-items: center;
                p {
                  font-size:0.6rem;
                  margin: 0;
                }
                button {
                outline:none;
                border:none;
                font-weight: bold;
                padding:0.5rem;
                text-transform:uppercase;
                }
              }
            }
          }
        }
      }
    }
   
    .feedback-container {
      background-color: #fff;
      max-width: 30%;
      padding: 1rem;
      display:flex;
      gap: 1rem;
      align-items:center;
      position: relative;
      top: 2rem;
      @media ${device.tablet} {
        position: relative;
        top: -0.5rem;
        max-width: 80%;
      }
      @media ${device.mob} {
        margin-top: 1.5rem;
      }
      @media ${device.mobileM} {
        padding:0.8rem;
      }
      img {
        height: 2rem;
      }
      p {
        font-size: 0.7rem;
        @media ${device.mobileM} {
          font-size: 0.6rem;
        }
      }
    }
  }
`;
