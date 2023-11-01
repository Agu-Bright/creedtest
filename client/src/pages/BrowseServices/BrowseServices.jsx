import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import styled from "styled-components"

import { SearchContext } from './components/SearchContext'
import Nav from '../../components/nav/Nav'
import { Header } from './components/Header'
import { Resources } from './components/Resources'
import { ServicesContent } from './components/Content'
import Footer from '../../components/Footer/Footer'
import { ModalList } from '../../components/ModalList/ModalList'

import { ModalContext } from '../../hooks/ModalContext'
import PickLocation from '../../components/common/PickLocation'
import PickCategory from '../../components/common/PickCategory'

export const BrowseServices = () => {
  const [service, setService] = useState()
  const location = useLocation();
  const [showJobCategories, setShowJobCategories] = useState(false);

  useEffect(() => {
    if(location.state && location.state.service !== null)setService(location.state.service)
    else if(localStorage["serviceQuery"])setService(JSON.parse(localStorage["serviceQuery"]))
  }, [])

  useEffect(() => {
    if(service && service.length){
      localStorage["serviceQuery"] = JSON.stringify(service)
    }
  }, [service])

  const [data, setData] = useState([])
  const [display, setDisplay] = useState(false);

  const setModalData = (param) => {
    switch (param){
      case "state":
        // Make the list a list of objects not string so it could include more things like parents and all that
        setData(
          ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
          "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa",
          "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun",
          "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"]
        )
        break;
      case "abuja":
        setData(
        [
          // "All Abuja (FCT) State",
          "Abaji", "Apo District", "Asokoro", "Bwari", "Central Business District", "Dakibiyu",
          "Dakwo District", "Dei-Dei", "Duboyi", "Durumi", "Dutse-Alhaji", "Gaduwa", "Galadimawa",
          "Garki 1", "Garki 2", "Gudu", "Guzape District", "Gwagwa", "Gwagwalada", "Gwarinpa",
          "Idu Industrial", "Jabi", "Jahi", "Jikwoyi", "Jiwa", "Kabusa", "Kado", "Karmo", "Karshi",
          "Karu", "Katampe", "Kaura", "Kpeyegyi", "Kubwa", "Wuse", "Wuse 2"]
        )
        break;
      default:
        setData([])
    }
  }

  useEffect(() => {
    setModalData("state")
  },[])

  return (
    <ModalContext.Provider value={{ modalData: data, setModalData, display, setDisplay }}>
      <SearchContext.Provider value={{service, setService}}>
        <Container>
          <Nav />
          <Header />
          <Resources 
            showJobCategories={() => setShowJobCategories(true)} 
          />
          <ServicesContent />
          <Footer />
          {
            display &&
            <PickLocation hide={() => setDisplay(false)} />
            // <ModalList />
          }
          {showJobCategories && (
            <PickCategory hide={() => {
              setShowJobCategories(false); 
              document.querySelector('html').classList.remove('modal__open');
            }} />
          )}
        </Container>
      </SearchContext.Provider>
    </ModalContext.Provider>
  )
}

const Container = styled.div`
  background-color: #FFF5DD;
  height: max-content;
`