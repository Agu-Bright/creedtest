import "./nav.css";
import React from "react";
import { Link } from "react-router-dom";
import Nav_mobile from './Nav_mobile';
import {Helmet} from "react-helmet";

function Nav() {
  const [toggleMenu,setToggleMenu]=React.useState(false)
  return (
    <>
    <Helmet>
        <meta name="theme-color" content="white" />
    </Helmet>
    <div className="nav">
      <Link to="/" className="logo"></Link>
      <ul className="desktop-ul">
        <li className='desktop-li'>
          <Link to="/browse" className="nav-links">
            Find Jobs / Workers
          </Link>
        </li>
        <li className='desktop-li'>
          <Link to="/browse/categories" className="nav-links">
            Browse services
          </Link>
        </li>
        <li className='desktop-li'>
          <Link to="/enterprise" className="nav-links">
            Enterprises
          </Link>
        </li>
      </ul>
  
      <ul className='desktop-ul'>
        <li className='desktop-li'><Link to='/contact-us' className='nav-links'>Contact us</Link></li>
        <li className='desktop-li'><Link to='/about' className='nav-links'>About</Link></li>
      </ul>
  
      <div className='nav-sep'></div>
      <li className='desktop-li'><Link to='/Login' className='nav-links'>Login</Link></li>
      <li className='desktop-li'><Link to='/postajob_home' className='post-job'>Post a Job</Link></li>
  
      <div className="media_button" onClick={()=>setToggleMenu(!toggleMenu)}>
        <div className="element1"></div>
        <div className="flex">
          
          <div className="element2"></div>
          <div className="element3"></div>
        </div>
        <div className="element4"></div>
      </div>
    </div>
    <Nav_mobile toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
    </>
  );
}

      

  
  export default Nav;