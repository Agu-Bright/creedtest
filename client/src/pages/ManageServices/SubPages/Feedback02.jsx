import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNav from "../../../components/dashboard_nav/dashboard_nav";
import BackgroundImage from "../../../assets/Dashboard/tonyer.png";
import { device } from "../../../theme/mediaQueries";
import MiniProfileNav from "../components/MiniProfileNav";
import TabletMiniProfile from "../components/TabletMiniProfile";
import FeedbackContentBody from "../components/FeedbackContentBody";
import { BiTrendingUp } from "react-icons/bi";
import { BiTrendingDown } from "react-icons/bi";
import { fetchData } from "../../../api/fetchData";
import MyFeedbackContent from "../components/MyFeedbackContent";
import image from "../../../assets/manage-services-img/none-yet-img.png";
import MyServicesContent from "../components/MyServicesContent";
export default function Feedback02() {
  const [fixTab, setFixTab] = React.useState(false);

  return (
    <Container>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <MiniProfileNav h3="Feedback" placeholder="Search for Feedback" />
      <section className="section-manage-services">
        <TabletMiniProfile
          active={<BiTrendingUp />}
          received="Received"
          inactive={<BiTrendingDown />}
          sent="Sent"
        />
        <MyFeedbackContent
          h3="Feedback"
          active={<BiTrendingUp />}
          received="Received"
          inactive={<BiTrendingDown />}
          sent="Sent"
          img={image}
          nothingyet="There are no Feedback yet. Ask your customers leave feedback about you.
          Copy the link and send them"
          button="Copy my link"
        />
      </section>
    </Container>
  );
}

const Container = styled.section`
  p,
  h1,
  h2,
  h3,
  h4,
  hr,
  button {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .section-manage-services {
    background-image: url(${BackgroundImage});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-color: #e9e9e9;
    background-repeat: repeat;
    height: fit-content;
    min-height: 100vh;
    width: 100vw;
    display: inline-block;
    padding: 2rem 4rem;
    margin: 0 auto;
    box-sizing: border-box;
    @media (hover: none) {
      background-attachment: initial;
    }
    @media ${device.tablet} {
      padding: 2rem;
      background-size: 320%;
    }
    @media ${device.tabs} {
      height: fit-content;
      padding: 0 1rem 2rem 1rem;
    }
    @media ${device.mobile} {
      padding: 1rem;
      padding-top: 0;
    }
    .body02-container {
      display: none;
    }
    .services-section {
      .body02 {
        text-align: left;
        padding: 1rem 2rem;
        @media ${device.tablet} {
          padding: 1rem;
        }
        img {
          height: auto;
          margin: 0;
          @media ${device.tablet} {
            height: 2.5rem;
          }
        }
        p {
          font-family: interbold;
          margin: 0;
        }
      }
    }
  }
`;
