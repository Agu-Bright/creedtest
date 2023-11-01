import React from "react";
import styled from "styled-components";
import NoneImage from "../../../assets/manage-services-img/none-yet-img.png";
import BackgroundImage from "../../../assets/dashboard-img/dashboard-background.png";
import ProfilePic from "../../../assets/manage-services-img/manage-services-profile-pic.png";
import MyServiceIcon from "../../../assets/manage-services-img/my-services-icon.png";
import FeedbackIcon from "../../../assets/manage-services-img/feedback-icon.png";
import PerformanceIcon from "../../../assets/manage-services-img/performance-icon.png";
import { device } from "../../../theme/mediaQueries";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Switch from "../../../../node_modules/@mui/material/Switch/index";
import FormControlLabel from "../../../../node_modules/@mui/material/FormControlLabel/index";
import { FaCoins } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";

export default function PerformanceTabletProfile() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      green: {
        main: "#0BCA7A",
      },
      red: {
        main: "#FF2E2E",
      },
      blue: {
        main: "#3B3BF2",
      },
    },
    typography: {
      fontFamily: "interbold",
      // fontSize: "0.8rem",
    },
  });

  return (
    <Container>
      <div className="tablet-profile-section">
        <ul>
          <Link
            to="/manage-services/my-services"
            className="tablet-profile-section-link"
          >
            <li className="tablet-profile-section-list-item">
              <FaCoins className="performance__tab__icon" /> My Services
            </li>
          </Link>
          <Link
            to="/manage-services/my-feedbacks"
            className="tablet-profile-section-link"
          >
            <li className="tablet-profile-section-list-item">
              <FaComments className="performance__tab__icon" /> Feedback
            </li>
          </Link>
          <Link
            to="/manage-services/my-performance"
            className="tablet-profile-section-link"
          >
            <li className="tablet-profile-section-list-item">
              <FaChartLine className="performance__tab__icon" /> Performance
            </li>
          </Link>
        </ul>
        <ThemeProvider theme={theme}>
          <ul className="tablet-profile-second-list">
            <li>
              <FormControlLabel
                control={<Switch defaultChecked size="small" color="primary" />}
                label="Impressions"
                labelPlacement="bottom"
              />
            </li>
            <li>
              <FormControlLabel
                control={<Switch defaultChecked size="small" color="green" />}
                label="Visitors"
                labelPlacement="bottom"
              />
            </li>
            <li>
              <FormControlLabel
                control={<Switch defaultChecked size="small" color="red" />}
                label="Phone Views"
                labelPlacement="bottom"
              />
            </li>
            <li>
              <FormControlLabel
                control={<Switch defaultChecked size="small" color="blue" />}
                label="Chat Requests"
                labelPlacement="bottom"
              />
            </li>
          </ul>
        </ThemeProvider>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .tablet-profile-section {
    display: none;
    @media ${device.tabs} {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      justify-content: center;

      ul {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding: 0;
        margin: 0.6rem;
        margin-bottom: 0;
        @media ${device.mobileL} {
          margin-right: 0;
          margin-left: 0;
        }
        .tablet-profile-section-link:link,
        .tablet-profile-section-link:visited {
          text-decoration: none;
          color: #000;
          display: inline-block;
          gap: 6px;
        }
        .tablet-profile-section-link:hover,
        .tablet-profile-section-link:active {
          color: goldenrod;
        }
        li {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-family: intermedium;
          color: #37474f;

          .performance__tab__icon {
            font-size: 1.3em;
            color: #37474f;
          }

          @media ${device.mob} {
            font-size: 0.75rem;
            gap: 5px;
            padding: 0;

            .performance__tab__icon {
              font-size: 1.3em;
              color: #37474f;
            }
          }
          @media ${device.mobileL} {
            gap: 3px;
          }
          img {
            height: 1.3rem;
            @media ${device.mobileL} {
              height: 1rem;
            }
          }
        }
      }
      .tablet-profile-second-list {
        max-width: 100%;
        @media ${device.mobile} {
          justify-content: space-between;
        }
        padding: 0;
        margin: 0.6rem;
        li {
          padding: 0;
          label {
            margin: 0;
          }
        }
      }
    }
  }
`;
