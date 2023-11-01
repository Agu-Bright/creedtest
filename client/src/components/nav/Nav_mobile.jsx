import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './Nav_mobile.css'
import Navlogo from '../../assets/logo-img/Creedlance logo without slogan white.png'

const Nav_mobile = ({toggleMenu,setToggleMenu}) => {

  return (
    <div className="navbar-smallscreen">
      {toggleMenu && (
        <div className="navbar-smallscreen_overlay flex__center slide-bottom">
        <AiOutlineCloseCircle fontSize={27} className="overlay__close" onClick={()=>setToggleMenu(!toggleMenu)} />

              <a href='/'> <div className="navbar_smallscreen-logo"> <img src={Navlogo} alt="" /> </div></a>
            <div className="navbar-smallscreen_links">
              <li className="p__opensans"><Link to="/browse/categories">Browse Services</Link></li>
                <li className="p__opensans"><Link to="/enterprise">Enterprise</Link></li>
                <li className="p__opensans"><Link to='/browse'>Find Jobs / Workers</Link></li>
                <li className="p__opensans"><Link to="/contact-us">Contact Us</Link></li>
                <li className="p__opensans"><Link to="/about">About</Link></li>
            </div>
        
              <a href='/postajob_home' className="navbar-smallscreen-job-btn">Post a job</a>
        
            <div className="navbar-smallscreen-buttons">
              <Link to="/Login"><button className='navbar-smallscreen-buttons-login'>Log In</button></Link> 
              <Link to='/create-account'> <button className='navbar-smallscreen-buttons-signup'>Sign up</button></Link>
            </div>
        </div>
        )}
    </div>
  )
}

export default Nav_mobile