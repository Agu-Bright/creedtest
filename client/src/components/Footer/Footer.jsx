import React, { useState } from "react";
import "./Footer.css";
import {
  BsTwitter,
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
const FooterDropDown = ({ name, informations }) => {
  const [isActive, SetiSActive] = useState(false);
  return (
    <div className="footerdropDown">
      <div className="footer_btn" onClick={(e) => SetiSActive(!isActive)}>
        {name}
        <span>
          {" "}
          <IoIosArrowDropdownCircle />{" "}
        </span>
      </div>

      {isActive && (
        <div className="footerdropdown-content">
          {informations.map((option) => (
            <div className="footerdropDown-item">
              <p>
                <Link to="/">{option}</Link>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const Footer = () => {
  const clients = [
    "How to Hire",
    "Talent Marketplace",
    "Project Catalog",
    "Talent Scout",
    "Enterprise",
    "Payroll Services",
    "Direct Contracts",
    "Hire in Nigeria",
  ];
  const Resource = [
    "Help & Support",
    "Success Stories",
    "Reviews",
    "Resource",
    "Blog",
    "Community",
    "Affiliate Program",
    "Free Business tools",
  ];
  const Talent = [
    "How to Find Work",
    "Direct Contacts",
    "Find Freelnace Jobs In Nigeria",
  ];
  const Comapeny = [
    "About us",
    "Leadership",
    "Investor Relations",
    "Careers",
    "Our Impact",
    "Press",
    "Contact Us",
    "Trsut,Safety & Security",
    "Modern Slavery Statement",
  ];
  return (
    <div className="footer">
      <FooterDropDown name={"For Clients"} informations={clients} />
      <FooterDropDown name={"Resource"} informations={Resource} />
      <FooterDropDown name={"For Talent"} informations={Talent} />
      <FooterDropDown name={"Company"} informations={Comapeny} />
      <div className="content">
        <div className="forClients">
          <h4>For Clients</h4>

          <p>
            <Link to="/">How to Hire</Link>
          </p>
          <p>
            <Link to="/">Talent Marketplace</Link>
          </p>
          <p>
            <Link to="/">Project Catalog</Link>
          </p>
          <p>
            <Link to="/">Talent Scout</Link>
          </p>
          <p>
            <Link to="/">Enterprise</Link>
          </p>
          <p>
            <Link to="/">Payroll Services</Link>
          </p>
          <p>
            <Link to="/">Direct Contracts</Link>
          </p>
          <p>
            <Link to="/">Hire in Nigeria</Link>
          </p>
        </div>
        <div className="Resource">
          <h4>Resource</h4>
          <p>
            <Link to="/">Help & Support</Link>
          </p>
          <p>
            <Link to="/">Success Stories</Link>
          </p>
          <p>
            <Link to="/">Reviews</Link>
          </p>
          <p>
            <Link to="/">Resource</Link>
          </p>
          <p>
            <Link to="/">Blog</Link>
          </p>
          <p>
            <Link to="/">Community</Link>
          </p>
          <p>
            <Link to="/">Affiliate Program</Link>
          </p>
          <p>
            <Link to="/">Free Business tools</Link>
          </p>
        </div>
        <div className="forTalent">
          <h4>For Talent</h4>
          <p>
            <Link to="/">How to Find Work</Link>
          </p>
          <p>
            <Link to="/">Direct Contacts</Link>
          </p>
          <p>
            <Link to="/">Find Freelance Jobs In Nigeria</Link>
          </p>
        </div>
        <div className="company">
          <h4>Company</h4>
          <p>
            <Link to="/about">About us</Link>
          </p>
          <p>
            <Link to="/">Leadership</Link>
          </p>
          <p>
            <Link to="/">Investor Relations</Link>
          </p>
          <p>
            <Link to="/">Careers</Link>
          </p>
          <p>
            <Link to="/">Our Impact</Link>
          </p>
          <p>
            <Link to="/">Press</Link>
          </p>
          <p>
            <Link to="/contact-us">Contact Us</Link>
          </p>
          <p>
            <Link to="/">Trust,Safety & Security</Link>
          </p>
          <p>
            <Link to="/">Modern Slavery Statement</Link>
          </p>
        </div>
      </div>

      <footer>
        <span>Follow us</span>
        <div className="footer_icons">
          <BsInstagram />
          <BsTwitter />
          <BsFacebook />
          <BsYoutube />
          <BsLinkedin />
        </div>
      </footer>
      <hr className="footer_line" />
      <div className="below_footer">
        <span>© 2022 CreedLance® Global Inc.</span>
        <span>Terms of Service </span>
        <span>Privacy Policy</span>
        <span>CA Notice at Collection</span>
        <span> Cookie Settings</span>
        <span>Accessibility</span>
      </div>
    </div>
  );
};

export default Footer;
