import React, { useState, useEffect } from "react";
import "./home_hero_section.css";
import { HeroSlider } from "../../../../data/data";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
function HomeHeroSection() {
  const [currentState, setCurrentState] = useState(0);
  const slideLength = HeroSlider.length;
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 10000;
  const nextSlide = () => {
    setCurrentState(currentState === slideLength - 1 ? 0 : currentState + 1);
  };

  const prevSlide = () => {
    setCurrentState(currentState === 0 ? slideLength - 1 : currentState - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentState(0);
  }, []);
  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentState]);

  const bgImageStyle = {
    backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)), url(${HeroSlider[currentState].url})`,
  };
  return (
    <>
      {HeroSlider.map((slide, index) => (
        <div key={index}>
          {index === currentState && (
            <div className="dslide" style={bgImageStyle}>
              <br></br>

              <div className="slide-content">
                <div className="hero-title">{slide.title}</div>
                <div className="hero-para">{slide.paragraph}</div>

                <div className="hero-btn-display">
                  <Link to={slide.href1} className="hero-btn1">
                    {slide.btn1}
                  </Link>
                  <Link to={slide.href2} className={slide.btnclassName}>
                    {slide.btn2}
                  </Link>
                </div>
              </div>
              <div className="img-label">
                We Offer The Most Specific Of JOBS...
              </div>

              <div className="arrows-container">
                <div className="arrow arrow-left" onClick={prevSlide}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-chevron-left text-white"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </div>
                <div className="arrow arrow-right" onClick={nextSlide}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-chevron-right text-white"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default HomeHeroSection;