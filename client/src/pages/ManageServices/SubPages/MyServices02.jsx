import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import AdminNav from "../../../components/dashboard_nav/dashboard_nav";
import BackgroundImage from "../../../assets/Dashboard/tonyer.png";
import { device } from "../../../theme/mediaQueries";
import MiniProfileNav from "../components/MiniProfileNav";
import TabletMiniProfile from "../components/TabletMiniProfile";
import MyServicesContent from "../components/MyServicesContent";
import ServicesGrid from "../components/ServicesGrid";
import { FaFire } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaSellcast } from "react-icons/fa";
import DeleteModal from "../components/DeleteModal";
import { fetchData } from "../../../api/fetchData";
import { deleteData } from "../../../api/deleteData";
import { ModalContext } from "../../../contexts/ModalContext";
import image from "../../../assets/manage-services-img/none-yet-img.png";
import { motion } from "framer-motion";

export default function ManageServices() {
  const [fixTab, setFixTab] = React.useState(false);

  return (
    <Container>
      <AdminNav fixTab={fixTab} setFixTab={setFixTab} />
      <MiniProfileNav h3="My Services" placeholder="Search for Services" />

      <section className="section-manage-services">
        <TabletMiniProfile
          active={<FaFire />}
          received="Active"
          inactive={<FaTrashAlt />}
          sent="Suspended"
        />

        <MyServicesContent
          h3="MyServices"
          active={<FaFire />}
          received="Active"
          inactive={<FaTrashAlt />}
          sent="Suspended"
          // activeNo={active}
          img={image}
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
    background-color: #e9e9e9;
    background-repeat: repeat;
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
    @media ${device.laptop} {
      padding: 2rem;
    }
    @media ${device.tabs} {
      height: fit-content;
      padding: 0 1rem 2rem 1rem;
      background-size: 190%;
    }
    @media ${device.mobile} {
      padding: 1rem;
      padding-top: 0;
    }
    .body02-container {
      display: none;
    }
    .services-section {
      @media ${device.tab} {
        height: fit-content;
        // min-height: 100vh;
      }
      .body02 {
        background-color: rgba(221, 221, 221, 0.4);
        padding: 1rem;
        img {
          // width: 7rem;
          height: auto;
          @media ${device.laptop} {
            width: auto;
          }
          @media ${device.laptopS} {
            width: 5rem;
          }
          @media screen and (max-width: 580px) {
            width: 9rem;
          }
        }
        ul {
          margin: 0;
          @media screen and (max-width: 420px) {
            grid-template-columns: repeat(auto-fill, 100%);
          }
        }
        li {
          text-align: left;
          @media screen and (max-width: 420px) {
            text-align: center;
          }
          .stats {
            .ratings {
              @media screen and (max-width: 420px) {
                margin-left: auto;
                margin-right: auto;
                text-align: center;
              }
            }
          }
        }

        button {
          background-color: transparent;
          padding: 0;
        }
      }
    }
  }
`;
