import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import { SearchContext } from "./components/SearchContext";
import { Header } from "./components/Header";
import { Resources } from "./components/Resources";
import { ServicesContent } from "./components/Content";
import { ModalList } from "../../components/ModalList/ModalList";
import { ModalContext } from "../../hooks/ModalContext";
import BackgroundImage from "../../assets/Dashboard/tonyer.png";
import { LocationTab } from "./components/Location";
import { device } from "../../theme/mediaQueries";
import PickLocation from '../../components/common/PickLocation'
import PickCategory from '../../components/common/PickCategory'

export default function DashboardBrowseServices() {
  const [service, setService] = useState();
  const location = useLocation();
  const [showJobCategories, setShowJobCategories] = useState(false);
  const [fixTab, setFixTab] = useState(false)

  useEffect(() => {
    if (location.state && location.state.service !== null)
      setService(location.state.service);
    else if (localStorage["serviceQuery"])
      setService(JSON.parse(localStorage["serviceQuery"]));
  }, []);

  useEffect(() => {
    if (service && service.length) {
      localStorage["serviceQuery"] = JSON.stringify(service);
    }
  }, [service]);

  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);

  const setModalData = (param) => {
    switch (param) {
      case "state":
        // Make the list a list of objects not string so it could include more things like parents and all that
        setData([
          "Abia",
          "Adamawa",
          "Akwa Ibom",
          "Anambra",
          "Bauchi",
          "Bayelsa",
          "Benue",
          "Borno",
          "Cross River",
          "Delta",
          "Ebonyi",
          "Edo",
          "Ekiti",
          "Enugu",
          "Gombe",
          "Imo",
          "Jigawa",
          "Kaduna",
          "Kano",
          "Katsina",
          "Kebbi",
          "Kogi",
          "Kwara",
          "Lagos",
          "Nasarawa",
          "Niger",
          "Ogun",
          "Ondo",
          "Osun",
          "Oyo",
          "Plateau",
          "Rivers",
          "Sokoto",
          "Taraba",
          "Yobe",
          "Zamfara",
        ]);
        break;
      case "abuja":
        setData([
          // "All Abuja (FCT) State",
          "Abaji",
          "Apo District",
          "Asokoro",
          "Bwari",
          "Central Business District",
          "Dakibiyu",
          "Dakwo District",
          "Dei-Dei",
          "Duboyi",
          "Durumi",
          "Dutse-Alhaji",
          "Gaduwa",
          "Galadimawa",
          "Garki 1",
          "Garki 2",
          "Gudu",
          "Guzape District",
          "Gwagwa",
          "Gwagwalada",
          "Gwarinpa",
          "Idu Industrial",
          "Jabi",
          "Jahi",
          "Jikwoyi",
          "Jiwa",
          "Kabusa",
          "Kado",
          "Karmo",
          "Karshi",
          "Karu",
          "Katampe",
          "Kaura",
          "Kpeyegyi",
          "Kubwa",
          "Wuse",
          "Wuse 2",
        ]);
        break;
      default:
        setData([]);
    }
  };

  useEffect(() => {
    setModalData("state");
  }, []);

  return (
    <ModalContext.Provider
      value={{ modalData: data, setModalData, display, setDisplay  }}
    >
      <SearchContext.Provider value={{ service, setService }}>
        <Container>
          <AdminNav
            fixTab={fixTab} 
            setFixTab={setFixTab} 
          />
          <Header />
          <Resources 
            showJobCategories={() => setShowJobCategories(true)} 
          />
          <LocationTab className="locationtab" />
          <ServicesContent />
          {/* {display && <ModalList />} */}
          {display && <PickLocation hide={() => setDisplay(false)} />}
          {showJobCategories && (
            <PickCategory hide={() => {
              setShowJobCategories(false); 
              document.querySelector('html').classList.remove('modal__open');
            }} />
          )}
        </Container>
      </SearchContext.Provider>
    </ModalContext.Provider>
  );
}

const Container = styled.div`
  background:
    url(${BackgroundImage});
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #e9e9e9;
  display: block;
  min-height: 100vh;
  margin: 0 auto;
  height: fit-content;
  box-sizing: border-box;
  padding-bottom: 3rem;
  @media ${device.tabs} {
    @media (hover: none) {
      background-attachment: initial;
    }
  }
  .locationtab {
    display: none;
    @media screen and (max-width: 470px) {
      display: flex;
    }
  }
  h2 {
    margin: 0 auto;
    padding: 0;
    position: relative;
    top: 4rem;
    font-size: 0.9rem;
    font-family: interbolder;
    text-align: center;
    display: none;
    @media screen and (max-width: 470px) {
      display: block;
    }
  }
  .btn-trash {
    display: none;
  }
`;
