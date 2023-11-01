import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ProfilePic from "../../../assets/manage-services-img/manage-services-profile-pic.png";
import MyServiceIcon from "../../../assets/manage-services-img/my-services-icon.png";
import FeedbackIcon from "../../../assets/manage-services-img/feedback-icon.png";
import PerformanceIcon from "../../../assets/manage-services-img/performance-icon.png";
import { device } from "../../../theme/mediaQueries";
import { Link, useLocation } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Switch from "../../../../node_modules/@mui/material/Switch/index";
import FormControlLabel from "../../../../node_modules/@mui/material/FormControlLabel/index";
import { ThemeProvider } from "@mui/material/styles";
import { FaCoins } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
export default function MyPerformanceContent(props) {
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
      //   fontSize: "0.8rem",
    },
  });

  const location = useLocation();

  //my linking
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState(null);
  useEffect(() => {
    if (userData) {
      const { user } = JSON.parse(userData);
      setuser(user);
    }
  }, [userData]);

  return (
    <Container>
      <div className="section-manage-services-container">
        {user && (
          <ProfileSection>
            <div className="header01">
              {!user?.photo?.url ? (
                <img src={ProfilePic} alt="Profile Picture" />
              ) : (
                <Avatar
                  sx={{ width: 65, height: 65 }}
                  src={user?.photo.url}
                  style={{
                    borderRadius: "50% !important",
                  }}
                  alt="avatar"
                />
              )}{" "}
              <h4>{user.name}</h4>
              <p>{user.phoneNumber}</p>
            </div>
            <div className="body01">
              <ul>
                <Link to="/manage-services/my-services" className="body01-link">
                  <li>
                    <FaCoins className="sidebar__nav_icons" />
                    My Services
                  </li>
                </Link>
                <Link
                  to="/manage-services/my-feedbacks"
                  className="body01-link"
                >
                  <li>
                    <FaComments className="sidebar__nav_icons" /> Feedback
                  </li>
                </Link>
                <Link
                  to="/manage-services/my-performance"
                  className="body01-link"
                >
                  <li>
                    <FaChartLine className="sidebar__nav_icons" />
                    Performance
                  </li>
                </Link>
              </ul>
            </div>
          </ProfileSection>
        )}

        <ServicesSection
          style={{
            backgroundColor:
              location.pathname === "/manage-services/my-services"
                ? "#fafafa"
                : "#fff",
          }}
        >
          <ThemeProvider theme={theme}>
            <div className="header02">
              <h3>{props.h3}</h3>
              {props.h3.toLowerCase() !== "performance" ? (
                <ul className="general-content-header">
                  <li className="active-list-item">
                    {props.active} {props.received} ({props.activeNo || 0})
                  </li>
                  <li className="deleted-list-item">
                    {props.inactive} {props.sent} (0)
                  </li>
                </ul>
              ) : null}
              {props.h3.toLowerCase() === "performance" ? (
                <ul className="performance-content-body-header">
                  <li>
                    <FormControlLabel
                      control={
                        <Switch defaultChecked size="small" color="primary" />
                      }
                      label="Impressions"
                      labelPlacement="bottom"
                    />
                  </li>
                  <li>
                    <FormControlLabel
                      control={
                        <Switch defaultChecked size="small" color="green" />
                      }
                      label="Visitors"
                      labelPlacement="bottom"
                    />
                  </li>
                  <li>
                    <FormControlLabel
                      control={
                        <Switch defaultChecked size="small" color="red" />
                      }
                      label="Phone Views"
                      labelPlacement="bottom"
                    />
                  </li>
                  <li>
                    <FormControlLabel
                      control={
                        <Switch defaultChecked size="small" color="blue" />
                      }
                      label="Chat Requests"
                      labelPlacement="bottom"
                    />
                  </li>
                </ul>
              ) : null}
            </div>
          </ThemeProvider>

          {/* <hr /> */}
          <div className="body02">
            {!props.div && (
              <div className="body02-container">
                <img src={props.img} alt="" />
                <p>{props.nothingyet}</p>
                <button onClick={() => navigate("/Post-service")}>
                  {props.button}
                </button>
              </div>
            )}

            {props.div && <div>{props.div}</div>}
          </div>
        </ServicesSection>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .section-manage-services-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    gap: 15px;
    position: relative;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ProfileSection = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 16px #cbc9c9;
  height: fit-content;
  height: 400px;
  flex: 0.25;
  position: sticky;
  border-radius: 8px;
  top: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }

  .header01 {
    padding: 1.8rem 5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
    @media ${device.laptopS} {
      padding: 1rem 3rem;
    }
    @media ${device.tablet} {
      padding: 1rem 2rem;
    }

    img {
      height: 5rem;
      margin: 0 auto;
      margin-bottom: 1rem;
      @media ${device.laptopS} {
        height: 4rem;
      }
    }
    h4 {
      font-size: 1.2rem;
      font-family: inter;
      margin: 0 auto;
      text-align: center;
      display: inline-block;
      margin-bottom: 0.7rem;
      color: #122051;
      @media ${device.laptopS} {
        font-size: 0.9rem;
      }
    }
    p {
      font-size: 0.75rem;
      margin: 0 auto;
    }
  }

  .body01 {
    text-align: center;
    ul {
      list-style: none;
      padding: 0;
      margin: 1rem 0 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .body01-link:link,
      .body01-link:visited {
        color: #645f5e;
        text-decoration: none;
        font-size: 0.9rem;
        transition: 165ms;
        /* border-top: 1px solid rgba(9, 9, 9, 0.1); */
        font-weight: bolder;
        // height: 3.5rem;
      }
      .body01-link:hover,
      .body01-link:active {
        color: #000000;
        transform: scale(1.01);
      }
      li {
        display: flex;
        align-items: center;
        /* justify-content: center; */
        padding: 0 1.5rem;
        gap: 1rem;
        margin: 1rem 0;

        .sidebar__nav_icons {
          font-size: 1.2rem;
        }

        @media ${device.tablet} {
          font-size: 0.8rem;
        }
        img {
          height: 1.3rem;
          margin-right: 5px;
          @media ${device.tablet} {
            height: 1.2rem;
          }
        }
      }
    }
  }
`;

const ServicesSection = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 16px lightgray;
  height: fit-content;
  flex: 0.75;
  min-height: 500px;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex: 1;
    margin-top: 1rem;
    height: fit-content;
  }

  @media (max-width: 651px) {
    margin-bottom: 60px;
  }

  hr {
    color: #999;
    opacity: 0.3;
  }
  .header02 {
    display: flex;
    flex-direction: row;
    padding: 0 2rem;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    background-color: #fff;

    @media ${device.tablet} {
      padding: 0 1rem;
    }
    @media ${device.tabs} {
      display: none;
    }
    h3 {
      font-family: inter;
      font-size: 1.4rem;
      color: #122051;
      @media ${device.laptopS} {
        font-size: 1.2rem;
      }
    }
    ul {
      display: flex;
      align-items: center;
      gap: 8px;
      li {
        list-style: none;
        // display: flex;
        // align-items: center;
        // gap: 5px;
        padding: 0.3rem 0.8rem;
        font-size: 0.8rem;
        border-radius: 20px;
        @media ${device.tablet} {
          font-size: 0.7rem;
        }
        // img {
        //   height: 1.1rem;
        //   @media ${device.laptopS} {
        //     height: 1rem;
        //   }
        // }
      }
      .active-list-item {
        background-color: #f9ebca;
        border: 2px solid #daa520;
      }
      .deleted-list-item {
        background-color: #ff2e2e;
        color: #fff;
        border: 2px solid #fff;
      }
    }
    .performance-content-body-header {
      /* display: none; */

      li {
        padding: 0;
        [label] {
          margin: 0;
        }
      }
    }
  }

  .body02 {
    text-align: center;
    padding: 1.5rem;

    .body02-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 400px;
    }

    @media ${device.tabs} {
      padding: 1rem;
    }
    img {
      height: 4rem;
      display: block;
      margin: 0 auto;
      margin-bottom: 2rem;
    }
    p {
      display: inline;
      margin-bottom: 1rem;
      font-size: 0.8rem;
      font-family: intermedium;
      margin-top: 1rem;
    }
    button {
      background-color: #daa520;
      color: #fff;
      padding: 0.6rem 1rem;
      border-radius: 4px;
      outline: none;
      border: none;
      font-size: 0.8rem;
      font-family: inter;
      margin-top: 4rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
