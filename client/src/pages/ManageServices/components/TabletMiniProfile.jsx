import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FaCoins } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { device } from "../../../theme/mediaQueries";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../../contexts/UserDataContext";
export default function TabletMiniProfile(props) {
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
      {user && (
        <div className="tablet-profile-section">
          <ul>
            <Link
              to="/manage-services/my-services"
              className="tablet-profile-section-link"
            >
              <li className="tablet-profile-section-list-item">
                <FaCoins /> My Services
              </li>
            </Link>
            <Link
              to="/manage-services/my-feedbacks"
              className="tablet-profile-section-link"
            >
              <li className="tablet-profile-section-list-item">
                <FaComments />
                Feedback
              </li>
            </Link>
            <Link
              to="/manage-services/my-performance"
              className="tablet-profile-section-link"
            >
              <li className="tablet-profile-section-list-item">
                <FaChartLine />
                Performance
              </li>
            </Link>
          </ul>
          <ul className="tablet-profile-second-list">
            <li className="active-list-item">
              {props.active} {props.received} (0)
            </li>
            <li className="deleted-list-item">
              {props.inactive} {props.sent} (0)
            </li>
          </ul>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .tablet-profile-section {
    transition: 5s;
    display: none;
    @media (max-width: 768px) {
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
          font-weight: bolder;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          @media ${device.mob} {
            font-size: 0.8rem;
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
        .active-list-item {
          background-color: #f9ebca;
          border: 2px solid #daa520;
        }
        .deleted-list-item {
          background-color: #ff2e2e;
          color: #fff;
          border: 2px solid #fff;
        }
        .tablet-profile-section-list-item {
          padding: 0;
        }
      }
    }
  }
`;
