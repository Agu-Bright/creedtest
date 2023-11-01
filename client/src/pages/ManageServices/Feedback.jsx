import React from "react";
import styled from "styled-components";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import BackgroundImage from "../../assets/dashboard-img/dashboard-background.png";
import { device } from "../../theme/mediaQueries";
import MiniProfileNav from "./components/MiniProfileNav";
import TabletMiniProfile from "./components/TabletMiniProfile";
import MyServicesContent from "./components/MyServicesContent";
import NoneImage from "../../assets/manage-services-img/none-yet-img.png";
import { BiTrendingUp } from "react-icons/bi";
import { BiTrendingDown } from "react-icons/bi";

export default function Feedback() {
  const [fixTab, setFixTab] = useState(false);
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

        <MyServicesContent
          h3="Feedback"
          active={<BiTrendingUp />}
          received="Received"
          inactive={<BiTrendingDown />}
          sent="Sent"
          img={NoneImage}
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
    background-attachment: fixed !important;
    background-color: #e3e3e3;
    height: fit-content;
    min-height: 100vh;
    width: 100vw;
    display: block;
    padding: 2rem 4rem;
    margin: 0 auto;
    box-sizing: border-box;
    @media (hover: none) {
      background-attachment: initial;
    }
    @media ${device.tabs} {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: fit-content;
      padding-top: 0;
    }
    @media ${device.mobile} {
      padding: 1rem;
      padding-top: 0;
    }
  }
`;
