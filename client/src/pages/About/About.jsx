import React from "react";
import "../About/About.css";
import styled from "styled-components";
import Nav from "../../components/nav/Nav";
import Heroimage from "../../assets/images/about-us-page.png";
import Herovideo from "../../assets/video/about-us-creedlance-video.mp4";
import Provenanceimage from "../../assets/images/creative-team-amico.png";
import Roadmapbackdrop from "../../assets/images/roadmap-backdrop.png";
import TeamBackdrop from "../../assets/images/team-backdrop.png";
import Directors from "../../assets/images/directors.png";
import Developers from "../../assets/images/developers.png";
import Team from "../../assets/images/team-logo.png";
import TeamMemberPic from "../../assets/images/team-pic.png";
import Footer from "../../components/Footer/Footer";
import { device } from "../../theme/mediaQueries";
import { Link } from "react-router-dom";
import BackToTop from "react-easy-back-to-top";

export default function About() {
  return (
    <Container>
      <section className="section-about">
        <Nav />
        <div className="about-main-container">
          <div className="about-hero">
            <div className="hero-container">
              <div className="hero-writeup">
                <h1>
                  The largest freelancing and crowdsourcing marketplace in 9ja.
                </h1>
                <p>
                  We are your online marketplace for Jobs and Workers in Nigeria
                </p>
                <Link to="/contact-us">
                  <button>Contact Us</button>
                </Link>
              </div>
              <div className="hero-image">
                <img src={Heroimage} alt="" />
              </div>
            </div>
          </div>
          <div className="overview">
            <div className="overview-container">
              <div className="creedlance-video">
                <video width="95%" autoPlay loop>
                  <source src={Herovideo} type="video/mp4" />
                </video>
              </div>
              <div className="overview-writeup">
                <h2>Company Overview</h2>
                <p>
                  Creedlance.com is Nigerias largest Jobs and workers crowd
                  sourcing marketplace. We connect businesses and people of what
                  ever scale to their respective needs in the market place, be
                  it a job, a worker or a service. We beleive any worker can be
                  an employer and any employer can be a worker, as such
                  creedlance prioritizes no exact type of service/job on her
                  platform. From proffessional jobs to large scale
                  projects/contracts or to laboured jobs concerning manpower,
                  all categories can be found in Creedlance. We also do beleive
                  that the Nigerian work and Job force can be sustained by
                  itself, if we all are connected the right way.
                </p>
              </div>
            </div>
          </div>
          <div className="provenance">
            <h2>Creedlance Provenance</h2>
            <div className="provenance-body">
              <div className="provenance-container">
                <div className="provenance-image">
                  <img src={Provenanceimage} alt="" />
                </div>
                <div className="provenance-writeup">
                  <p>
                    Creedlance began by pioneering a better way of working,
                    assisting businesses in finding greater flexibility and
                    connecting talent with greater opportunities in Nigeria
                    (founded by Tonye Tex-Jack and Victory Okeke in 2023,
                    Nigeria).
                  </p>
                  <p>
                    Our mission of creating economic opportunities for people to
                    live better lives has taken us a long way. As a result,
                    we've evolved into the Nigeria's work marketplace, where
                    every day businesses of all sizes and independent talent
                    from around Nigeria come together to achieve incredible
                    things.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="team-heading">
              <h3>
                Meet the <span>Team</span> behind Creedlancer!
              </h3>
              <p>
                Meet our talented team of fun-lovers, magic makers and exemplary
                visionaries
              </p>
            </div>
            <div className="team-pics">
              <img src={Directors} alt="" />
              <div className="directors">
                <img src={TeamMemberPic} alt="" />
                <img src={TeamMemberPic} alt="" />
              </div>
              <img src={Team} alt="" />
              <div className="developers">
                <img src={TeamMemberPic} alt="" />
                <img src={TeamMemberPic} alt="" />
                <img src={TeamMemberPic} alt="" />
                <img src={TeamMemberPic} alt="" />
                <img src={TeamMemberPic} alt="" />
                <img src={TeamMemberPic} alt="" />
                <img src={TeamMemberPic} alt="" />
              </div>
            </div>
          </div>
          <div className="roadmap-section">
            <h2>We're constantly updating our roadmap.</h2>
            <div className="various-roadmaps">
              <div className="completed roadmap">
                <button>completed</button>
                <ul>
                  <li>Wireframe</li>
                  <li>Design</li>
                  <li>Documentation</li>
                  <li>Launching plans and billings</li>
                  <li>Apps for iOS & Android</li>
                </ul>
              </div>
              <div className="in-progress roadmap">
                <button>in progress</button>
                <ul>
                  <li>Improved UI designs</li>
                  <li>
                    Community formation and the subsequent cyclic completion of
                    the product based on the wishes of customers
                  </li>

                  <li>Completion of all pages/links on the footer</li>
                  <li> Improving our customer care </li>
                </ul>
              </div>
              <div className="planned roadmap">
                <button>planned</button>
                <ul>
                  <li>
                    Integration of google maps and location, for live location
                    of worker, employer or an interview
                  </li>
                  <li>better chat systems and feutures</li>

                  <li>
                    Forums for different categories of businesses and people on
                    creedlance
                  </li>
                  <li>Integration of safety features and anti scam policies</li>
                </ul>
              </div>
            </div>
            <p>
              "Creedlance to us is a life long dedication of creating an
              acessible, safe and competent platform that is able to connect the
              entirety of Nigeria's work force as one family, where its safe to
              work, employ or render a service.. As such we will keep updating
              our road maps so our users see what has been done, what is in
              progress and what is to come"
            </p>
          </div>
          <div className="growth">
            <div className="growth-container">
              <h2>Concerned about our Growth</h2>
              <div className="numbers">
                <ul className="numbers-list">
                  <li>
                    <span>97,571,244 </span>Total Jobs Posted
                  </li>
                  <li>
                    <span>47,938,838 </span>Registered Users
                  </li>
                  <li>
                    <span>38,838</span> Registered Enterprises
                  </li>
                </ul>
              </div>
              <p>
                We are constantly updating our systems, designs, and Ideas in
                order to provide transparency to our users and to solicit
                feedback - please let us know what is important to you!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <BackToTop
        backgroundColor="goldenrod"
        icon="fa fa-arrow-up"
        position={{ right: "5%", bottom: "10%" }}
        hover={{ backgroundColor: "#fff", color: "goldenrod" }}
        transition="all 0.3s"
        showOnDistance={300}
        borderRadius={16}
        opacity="1"
        color="#fff"
        fontSize={window.innerWidth < 768 ? "14px" : "18px"}
        padding={window.innerWidth < 768 ? "12px" : "16px"}
      />
    </Container>
  );
}

const Container = styled.section`
  p,
  h1,
  h2,
  h3 {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .about-main-container {
    display: flex;
    flex-direction: column;

    .about-hero {
      background-color: #455a64;
      height: fit-content;
      max-width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .hero-container {
        display: flex;
        position: relative;
        padding: 2rem;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        @media ${device.laptop} {
          justify-content: center;
          padding: 1.5rem;
        }
        @media ${device.tabletS} {
          flex-direction: column;
        }
        .hero-writeup {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 60%;
          @media ${device.laptop} {
            gap: 15px;
          }
          @media ${device.tablet} {
            width: 65%;
          }
          @media ${device.tabletS} {
            width: 100%;
          }
          h1 {
            font-size: 3.2rem;
            color: #fff;
            font-family: interbolder;
            display: inline-block;
            // font-family: interBold;
            // font-weight: 800;
            @media ${device.laptop} {
              font-size: 2.5rem;
            }
            @media ${device.tabletS} {
              margin-bottom: 16rem;
            }
            @media ${device.mobileL} {
              font-size: 1.8rem;
            }
          }
          p {
            color: #fff;
            font-size: 1rem;
            display: inline-block;
            margin-bottom: 1rem;
            @media ${device.laptop} {
              font-size: 0.8rem;
            }
          }
          button {
            display: inline-block;
            width: fit-content;
            padding: 0.5rem 0.8rem;
            border-radius: 5px;
            border: none;
            outline: none;
            background-color: goldenrod;
            color: #fff;
            font-size: 1rem;
          }
        }
        .hero-image {
          width: 35%;
          @media ${device.laptop} {
            width: 40%;
          }
          @media ${device.tabletS} {
            height: 0;
          }

          @media ${device.tabletS} {
            width: 100%;
            text-align: center;
          }
          img {
            height: 21rem;
            @media ${device.laptop} {
              height: 18rem;
            }
            @media ${device.tablet} {
              height: 16rem;
            }
            @media ${device.tabletS} {
              position: relative;
              top: -23rem;
            }
          }
        }
      }
    }
    .overview {
      background-color: #000;
      position: relative;
      margin: auto;
      height: fit-content;
      padding: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      @media ${device.laptop} {
        padding: 3rem;
      }
      @media ${device.tablet} {
        padding: 2rem;
      }
      .overview-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        max-width: 80%;
        @media ${device.laptop} {
          max-width: 100%;
        }
        @media ${device.tabletS} {
          flex-direction: column;
        }
        .creedlance-video {
          width: 50%;
          position: relative;
          @media ${device.tabletS} {
            width: 80%;
            top: 7rem;
          }
          @media ${device.mobileL} {
            width: 100%;
          }
        }
        .overview-writeup {
          display: flex;
          flex-direction: column;
          width: 50%;
          color: #fff;

          @media ${device.tabletS} {
            font-size: 1.8rem;
            text-align: center;
            width: 100%;
          }

          // position: relative;
          h2 {
            font-family: interbolder;
            font-size: 2.4rem;
            display: inline-block;
            margin-bottom: 1rem;
            position: relative;
            @media ${device.laptop} {
              font-size: 2rem;
            }
            @media ${device.tablet} {
              font-size: 1.8rem;
            }
            @media ${device.tabletS} {
              margin-bottom: 10rem;
              top: -15rem;
            }
            @media ${device.tab} {
              top: -12rem;
            }
            @media ${device.mobileL} {
              top: -9rem;
              font-size: 1.6rem;
            }
          }
          p {
            position: relative;
            font-size: 1rem;
            @media ${device.laptop} {
              font-size: 0.9rem;
            }
            @media ${device.tabletS} {
              top: -2rem;
            }
          }
        }
      }
    }
    .provenance {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: 2rem 5rem;
      height: fit-content;
      @media ${device.laptop} {
        padding: 2rem;
      }
      @media ${device.mobileM} {
        padding: 2rem 1.5rem;
      }
      h2 {
        font-size: 3rem;
        position: relative;
        font-family: interbolder;
        display: inline-block;
        @media ${device.laptop} {
          font-size: 2.5rem;
        }
        @media ${device.tablet} {
          margin-bottom: 2rem;
          text-align: center;
          font-size: 2rem;
        }
        @media ${device.mobileL} {
          font-size: 1.4rem;
        }
      }
      .provenance-body {
        display: flex;
        // flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 85%;
        @media ${device.laptop} {
          max-width: 95%;
        }

        .provenance-container {
          display: flex;
          flex-direction: row;
          max-width: 100%;
          justify-content: center;
          align-items: center;
          @media ${device.tablet} {
            flex-direction: column;
            gap: 2rem;
          }
          .provenance-image {
            width: 50%;
            @media ${device.tablet} {
              width: 100%;
              text-align: center;
            }
            img {
              height: 21rem;
              @media ${device.laptop} {
                height: 18rem;
              }
            }
          }
          .provenance-writeup {
            width: 50%;
            @media ${device.tablet} {
              width: 85%;
            }
            @media ${device.mobileL} {
              width: 100%;
            }
            p {
              text-align: right;
              @media ${device.tablet} {
                text-align: center;
              }
            }
            p:first-child {
              font-size: 0.8rem;
              display: inline-block;
              margin-bottom: 1.5rem;
              @media ${device.mobileL} {
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
    .team {
      background-image: url(${TeamBackdrop});
      background-size: contain;
      background-position: center;
      display: block;
      padding: 4rem;
      position: relative;
      background-repeat: no-repeat;
      height: fit-content;
      @media ${device.laptop} {
        padding: 4rem 1.5rem;
      }
      .team-heading {
        display: inline-block;
        h3 {
          font-family: interbolder;
          font-size: 1.5rem;
          span {
            color: goldenrod;
          }
        }
        p {
          font-size: 1rem;
          @media ${device.mobileL} {
            font-size: 0.8rem;
            margin-top: 1.5rem;
            text-align: center;
          }
        }
      }
    }
    .team-pics {
      position: relative;
      display: flex;
      margin: 4rem auto;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: fit-content;
      gap: 10px;
      img {
        height: 4rem;
        margin-top: 2rem;
        @media ${device.tablet} {
          height: 3rem;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        @media ${device.mobileL} {
          height: 2.8rem;
        }
      }
      .directors,
      .developers {
        display: flex;
        flex-direction: row;
        gap: 25px;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        img {
          height: 15rem;
          @media ${device.tablet} {
            height: 13rem;
            margin-top: 0;
          }
          @media ${device.mobileL} {
            height: 9rem;
          }
        }
      }
    }
    .roadmap-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-image: url(${Roadmapbackdrop});
      background-size: contain;
      background-position: center;
      background-color: #a1b1b9;
      background-repeat: no-repeat;
      height: fit-content;
      padding: 3rem 1rem;
      max-width: 100%;
      h2 {
        font-size: 2.8rem;
        color: #fff;
        font-family: interbolder;
        word-spacing: 5px;
        text-align: center;
        width: 70%;
        display: inline-block;
        margin-bottom: 3rem;
        @media ${device.laptop} {
          font-size: 2.4rem;
        }
        @media ${device.mobileL} {
          font-size: 1.5rem;
          width: 100%;
          margin-bottom: 2.1rem;
        }
        @media ${device.tablet} {
          font-size: 1.7rem;
          width: 90%;
          margin-bottom: 1.5rem;
        }
      }
      .various-roadmaps {
        display: flex;
        flex-direction: row;
        justify-content: center;
        // align-items: center;
        margin-bottom: 4rem;
        max-width: 90%;
        gap: 1rem;
        @media ${device.laptop} {
          width: 95%;
          gap: 0;
        }

        @media ${device.tablet} {
          flex-direction: column;
          // justify-content: space-evenly;
          // gap: 1.4rem;
          margin-bottom: 1rem;
          width: 100%;
        }

        .roadmap {
          height: fit-content;
          // padding: 1rem;
          display: inline-block;
          @media ${device.tablet} {
            width: 100%;
            position: relative;
          }
          button {
            font-size: 0.6rem;
            border-radius: 5px;
            box-shadow: 1px 1px 6px #333;
            background-color: transparent;
            padding: 5px;
            position: relative;
            left: 1rem;
            outline: none;
            border: none;
          }
          ul {
            margin: 1rem;
            background-color: #455a64;
            padding: 1.7rem;
            padding-left: 2.5rem;
            border-radius: 7px;

            li {
              color: #fff;
              font-size: 0.8rem;
              line-height: 1.5;
            }
          }
        }
        .completed {
          // width: 15%;
          button {
            color: rgba(0, 128, 0, 0.4);
            background-color: #00800066;
          }
        }
        .in-progress {
          // width: 25%;
          button {
            color: rgba(0, 0, 255, 0.8);
          }
        }
        .planned {
          // width: 35%;
          button {
            color: yellow;
            background-color: #ffff0033;
          }
        }
      }
      p {
        width: 80%;
        text-align: center;
        @media ${device.tablet} {
          font-size: 0.8rem;
        }
      }
    }
    .growth {
      background-color: #263238;
      color: #fff;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .growth-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 80%;
        gap: 13px;
        @media ${device.tablet} {
          max-width: 100%;
        }

        h2 {
          font-size: 1.4rem;
          letter-spacing: 1.2px;
          font-family: interbolder;
          @media ${device.mobileL} {
            text-align: center;
            font-size: 1rem;
          }
        }
        .numbers {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
          @media ${device.tablet} {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .numbers-list {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            padding: 0;
            width: 100%;
            @media ${device.tablet} {
              flex-direction: column;
              align-items: center;
            }
            li {
              list-style: none;
              font-size: 0.8rem;
              @media ${device.tablet} {
                margin-bottom: 0.4rem;
              }
              span {
                font-family: interbolder;
                color: goldenrod;
                font-size: 1.1rem;
              }
            }
          }
        }
        p {
          width: 80%;
          text-align: center;
          font-size: 1rem;
          position: relative;
          @media ${device.tablet} {
            width: 90%;
            font-size: 0.9rem;
          }
          @media ${device.mobileL} {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .hero-container {
      justify-content: center;
      width: 70%;
    }
    .hero-writeup h1 {
      font-size: 2.8rem;
    }
    .hero-image img {
      height: 18rem;
    }
  }
`;
