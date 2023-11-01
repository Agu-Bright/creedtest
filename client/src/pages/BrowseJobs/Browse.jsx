import React, { useState, useEffect } from "react";
import "./Browse.css";
import BrowseBanner from "./components/BrowseBanner";
import Projects from "./Projects";
import Filter from "./Filter";
import Workers from "./Workers";
import { AnimatePresence } from "framer-motion";
import Interviews from "./Interviews";
import useResize from "../../hooks/useResize";
import PickLocation from "../../components/common/PickLocation";
import BackToTop from "react-easy-back-to-top";
import { useParams } from "react-router-dom";
import { fetchData } from "../../api/fetchData";
import Nav from "./components/nav/Nav";
import AuthModal from "./components/AuthModal";
import ServicesContainer from "./ServicesContainer";

const Browse = ({ page }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [marginBottom, setMarginBottom] = useState("60px");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [fixTab, setFixTab] = useState(false);
  const [showPickLocation, setShowPickLocation] = useState(false);
  const [location, setLocation] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (showFilter && isMobile) {
      document.querySelector("html").classList.add("modal__open");
    } else {
      document.querySelector("html").classList.remove("modal__open");
    }
  }, [showFilter]);

  useEffect(() => {
    if (showPickLocation) {
      document.querySelector("html").classList.add("modal__open");
    } else {
      document.querySelector("html").classList.remove("modal__open");
    }
  }, [showPickLocation]);

  // detect screen size
  const handleResize = () => {
    if (window.innerWidth <= 450) {
      setMarginBottom("60px");
      setShowFilter(false);
      setIsMobile(true);
    } else if (window.innerWidth > 450 && window.innerWidth < 1024) {
      setShowFilter(false);
      setMarginBottom("0px");
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setShowFilter(true);
      setMarginBottom("0px");
    }
  };

  useResize(handleResize);

  useEffect(() => {
    function toggleNavbar() {
      if (page === "project-details" || page === "proposals") {
        if (window.innerWidth <= 650) {
          setHideNavbar(true);
        } else {
          setHideNavbar(false);
        }
      } else {
        setHideNavbar(false);
      }
    }

    toggleNavbar();
  });

  // remove margin bottom when virtual keyboard appears
  useEffect(() => {
    if ("visualViewport" in window) {
      const VIEWPORT_VS_CLIENT_HEIGHT_RATIO = 0.75;
      window.visualViewport.addEventListener("resize", function (event) {
        if (
          (event.target.height * event.target.scale) / window.screen.height <
          VIEWPORT_VS_CLIENT_HEIGHT_RATIO
        ) {
          setKeyboardVisible(true);
        } else setKeyboardVisible(false);
      });

      return () =>
        window.visualViewport.removeEventListener("resize", () => {});
    }
  }, []);

  // remove or add marginBottom on scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (typeof window !== undefined) {
        if (window.innerWidth <= 650) {
          if (window.scrollY > lastScrollY) {
            setMarginBottom("0px");
          } else {
            setMarginBottom("60px");
          }

          setLastScrollY(window.scrollY);
        }
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, [lastScrollY]);

  const bannerTitle = () => {
    if (page === "workers") {
      return {
        bannerHeading: "Browse workers",
        searchPlaceholder: "Search for Occupation",
        showTabsOnMobile: true,
        tabs: [
          {
            name: "Projects",
            route: "/browse/projects",
          },
          {
            name: "Workers",
            route: "/browse/workers",
          },
          {
            name: "Interviews",
            route: "/browse/interviews",
          },
          {
            name: "Services",
            route: "/browse/services",
          },
        ],
      };
    } else if (page === "projects") {
      return {
        bannerHeading: "Browse projects",
        searchPlaceholder: "Search for Projects / Jobs",
        showTabsOnMobile: true,
        tabs: [
          {
            name: "Projects",
            route: "/browse/projects",
          },
          {
            name: "Workers",
            route: "/browse/workers",
          },
          {
            name: "Interviews",
            route: "/browse/interviews",
          },
          {
            name: "Services",
            route: "/browse/services",
          },
        ],
      };
    } else if (page === "interviews") {
      return {
        bannerHeading: "Browse interviews",
        searchPlaceholder: "Search for Interviews",
        showTabsOnMobile: true,
        tabs: [
          {
            name: "Projects",
            route: "/browse/projects",
          },
          {
            name: "Workers",
            route: "/browse/workers",
          },
          {
            name: "Interviews",
            route: "/browse/interviews",
          },
          {
            name: "Services",
            route: "/browse/services",
          },
        ],
      };
    } else if (page === "services") {
      return {
        bannerHeading: "Browse services",
        searchPlaceholder: "Search for Services",
        showTabsOnMobile: true,
        tabs: [
          {
            name: "Projects",
            route: "/browse/projects",
          },
          {
            name: "Workers",
            route: "/browse/workers",
          },
          {
            name: "Interviews",
            route: "/browse/interviews",
          },
          {
            name: "Services",
            route: "/browse/services",
          },
        ],
      };
    }
  };

  return (
    <div className="dashboard__scroll__area">
      {showAuthModal && <AuthModal hide={() => setShowAuthModal(false)} />}
      <Nav
        isSearchBar={true}
        showFilter={() => setShowFilter(true)}
        showLocation={() => setShowPickLocation(true)}
      />
      {showPickLocation && (
        <PickLocation onPick={setLocation} hide={() => setShowPickLocation(false)} />
      )}
      <BrowseBanner
        backIconRoute={
          page === "project-details" || page === "proposals"
            ? "/dashboard/browse/projects"
            : null
        }
        hideNavBar={hideNavbar}
        tabs={bannerTitle().tabs}
        heading={bannerTitle().bannerHeading}
        placeholder={bannerTitle().searchPlaceholder}
        showTabsOnMobile={bannerTitle().showTabsOnMobile}
        showPickLocation={() => setShowPickLocation(true)}
        location={location}
				setLocation={setLocation}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div
        className="dashboard-image-background"
        style={{
          marginBottom,
        }}
      >
        <div className="dashboard-container-layout">
          {/* Filter */}
          <AnimatePresence key="w">
            {showFilter &&
            (page === "workers" ||
              page === "projects" ||
              page === "interviews" ||
              page === "services") ? (
              <Filter
                isKeyboardVisible={keyboardVisible}
                setFixTab={setFixTab}
                hide={() => setShowFilter(false)}
                setFilter={setFilter}
                page={page}
              />
            ) : null}
          </AnimatePresence>

          {/* components below changes based on the navigated page  */}

          {/* browse projects */}
          {page === "projects" && (
            <Projects
              searchValue={searchValue}
              showFilter={() => setShowFilter(true)}
              showAuthModal={() => setShowAuthModal(true)}
              filter={filter}
              location={location}
              />
              )}

          {/* browse workers */}
          {page === "workers" && (
            <Workers
            searchValue={searchValue}
            showFilter={() => setShowFilter(true)}
            showAuthModal={() => setShowAuthModal(true)}
            filter={filter}
            location={location}
            />
            )}

          {/* interviews */}
          {page === "interviews" && (
            <Interviews
            searchValue={searchValue}
            showFilter={() => setShowFilter(true)}
            showAuthModal={() => setShowAuthModal(true)}
            filter={filter}
            location={location}
            />
          )}

          {page === "services" && (
            <ServicesContainer
            searchValue={searchValue}
            showFilter={() => setShowFilter(true)}
            showAuthModal={() => setShowAuthModal(true)}
            filter={filter}
            location={location}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
