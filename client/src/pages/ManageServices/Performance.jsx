import React, { useState } from "react";
import styled from "styled-components";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import BackgroundImage from "../../assets/Dashboard/tonyer.png";
import { device } from "../../theme/mediaQueries";
import MiniProfileNav from "./components/MiniProfileNav";
import TabletMiniProfile from "./components/TabletMiniProfile";
import MyServicesContent from "./components/MyServicesContent";
import NoneImage from "../../assets/manage-services-img/none-yet-img.png";

export default function Performance() {
  const [fixTab, setFixTab] = useState(false);

  return (
    <Container>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <MiniProfileNav h3="My Services" placeholder="Search for Performances" />
      <section className="section-manage-services">
        <TabletMiniProfile />
        <MyServicesContent
          h3="Performance"
          img={NoneImage}
          nothingyet="There are no Performances yet. "
          button="Create Performance"
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
    background-color: #E3E3E3;
    height: fit-content;
    min-height: 100vh;
    width: 100vw;
    display: block;
    padding: 2rem 4rem;
    margin: 0 auto;
    box-sizing: border-box;
    @media ${device.tabs} {
      height: fit-content;
      padding-top: 0;
    }
    @media ${device.mobile} {
      padding: 1rem;
      padding-top: 0;
    }
    @media (hover: none) {
      background-attachment: initial;
    }
    .services-section {
      .header02 {
        .general-content-header {
          display: none;
        }
        .performance-content-body-header {
          display: flex;
          margin: 0.5rem 0;
          padding: 0;
        }
      }
    }
  }
`;
