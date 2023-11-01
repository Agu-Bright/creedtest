import React from 'react'
import HomeHeroSection from './home_components/home_hero_section/HomeHeroSection';
import Nav from '../../components/nav/Nav';
import GettingStarted from './home_components/getting_started/GettingStarted';
import ForCreedLancers from './home_components/forcreedlancers/ForCreedlancers';
import ForEnterprises from './home_components/forenterprises/ForEnterprise';
import ForClients from './home_components/forclients/ForClients';
import PopularCategories from './home_components/popularcategories/PopularCategories';
import GettingWorkDone from './home_components/gettingworkdone/GettingWorkdone';
import Footer from '../../components/Footer/Footer';
import BackToTop from 'react-easy-back-to-top';


const Home = () => {
    return (
      <>
      
      <Nav />
      <HomeHeroSection />
      <GettingStarted />
      <ForCreedLancers />
      <ForEnterprises />
      <ForClients />
      <PopularCategories />
      <GettingWorkDone />
      <Footer />
      <BackToTop
          backgroundColor="goldenrod"
          icon='fa fa-arrow-up'
          position={{ right: "5%", bottom: "10%" }}
          hover={{ backgroundColor: "#fff", color: "goldenrod"}}
          transition="all 0.3s"
          showOnDistance={300}
          borderRadius={16}
          opacity="1"
          color="#fff"
          fontSize={window.innerWidth < 768 ? "14px" : "18px"}
          padding={window.innerWidth < 768 ? "12px" : "16px"}
      />
      </>
    );
  }
  
  
  export default Home;