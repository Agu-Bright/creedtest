import React from "react";
import styled from "styled-components";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import BackgroundImage from "../../assets/Dashboard/tonyer.png";
import { device } from "../../theme/mediaQueries";
import MiniProfileNav from "./components/MiniProfileNav";
import TabletMiniProfile from "./components/TabletMiniProfile";
import MyServicesContent from "./components/MyServicesContent";
import NoneImage from "../../assets/manage-services-img/none-yet-img.png";
import { FaFire } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export default function ManageServices() {
  const [fixTab, setFixTab] = React.useState(false);

  return (
    <Container>
      <AdminNav
        fixTab={fixTab}
        setFixTab={setFixTab}
      />
      <MiniProfileNav h3="My Services" placeholder="Search for Services" />
      <section className="section-manage-services">
        <TabletMiniProfile
          active={<FaFire />}
          received="Active"
          inactive={<FaTrashAlt />}
          sent="Deleted"
        />
        <MyServicesContent
          h3="My Services"
          active={<FaFire />}
          received="Active"
          inactive={<FaTrashAlt />}
          sent="Deleted"
          img={NoneImage}
          nothingyet="No Services has been created, Click on the button to create."
          button="Create Service"
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
  h5,
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
    background-color: #E9E9E9;
    background-repeat: repeat;
    /* background-image: linear-gradient(to bottom, #E5E4E5, #D7D2D4); */
    height: fit-content;
    min-height: 100vh;
    width: 100vw;
    display: block;
    padding: 2rem 4rem;
    margin: 0 auto;
    box-sizing: border-box;
    @media ${device.tabs} {
      height: fit-content;
      padding: 1rem 2rem 3rem 2rem;
      background-size: 190%;
    }
    @media ${device.mobile} {
      padding: 1rem;
      padding-top: 0;
    }
    @media (hover: none) {
      background-attachment: initial;
    }
  }
`;
