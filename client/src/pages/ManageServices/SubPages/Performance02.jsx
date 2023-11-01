import React from "react";
import styled from "styled-components";
import AdminNav from "../../../components/dashboard_nav/dashboard_nav";
import BackgroundImage from "../../../assets/Dashboard/tonyer.png";
import { device } from "../../../theme/mediaQueries";
import MiniProfileNav from "../components/MiniProfileNav";
import TabletMiniProfile from "../components/TabletMiniProfile";
import PerformanceContentBody from "../components/PerformanceContentBody";
import MyServicesContent from "../components/MyServicesContent";
import PerformanceTabletProfile from "../PerformanceComponents/PerformanceTabletProfile";
import MyPerformanceContent from "../components/MyPerformanceContent";
export default function ManageServices() {
  const [fixTab, setFixTab] = React.useState(false);

  return (
    <Container>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <MiniProfileNav h3="Performance" />
      <section className="section-manage-services">
        <PerformanceTabletProfile />
        <MyPerformanceContent
          h3="Performance"
          div={<PerformanceContentBody />}
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
      background-size: 190%;
    }
    @media ${device.laptopS} {
      padding: 2rem;
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
      .header02 {
        @media ${device.laptop} {
          padding: 0 1rem;
        }
        .general-content-header {
          display: none;
        }
        .performance-content-body-header {
          display: flex;
          margin: 0.5rem 0;
          padding: 0;
          width: 75%;
          margin-left: auto;
          justify-content: right;
          gap: 0;
          li {
            label {
              @media ${device.laptop} {
                margin: 0 0.5rem;
              }
            }
            [type="checkbox"] {
              font-size: 1rem;
            }
          }
        }
      }
      .body02 {
        padding: 1rem 2rem;
        @media ${device.laptopS} {
          padding: 1rem;
        }
      }
    }
  }
`;
