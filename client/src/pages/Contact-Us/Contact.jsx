import React, { useEffect, useState, useRef, useContext } from "react";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";

// import ContactBackdrop from "../../assets/images/contact-us-backdrop.png";
import Verticalrule from "../../assets/images/vertical-rule.png";
import Recaptcha from "../../assets/images/recaptcha.png";
import { device } from "../../theme/mediaQueries";
import ReCAPTCHA from "react-google-recaptcha";
import { ModalContext } from "../../contexts/ModalContext";
import { LoaderContext } from "../../contexts/LoaderContext";
export default function ContactUs() {
	const { showModal } = useContext(ModalContext);
	const { setLoading } = useContext(LoaderContext);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [contactData, setContactData] = useState({
		email: "",
		subject: "",
		message: "",
	});
  const [isValid, setIsvalid] = useState(false)
	const [disable, setDisable] = useState(true);
	const handleChange = (e) => {
		if (contactData.email && contactData.subject && contactData.message) {
			setDisable(false);
      const isValid = contactData.email.endsWith('@gmail.com');
      setIsvalid(isValid)
      console.log(isValid)
		} else {
			setDisable(true);
		}
		setContactData((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      // console.log((position / window.innerHeight) * 100 * 0.3 + 45);
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const percentage = (scrollPosition / window.innerHeight) * 100 * 0.3 + 45;
  const bgGradient = `linear-gradient(45deg, #353535 ${
    55 - percentage / 8
  }%, #202020 ${percentage - 30}%)`;

  //setting up reCAPTCHA

  const captchaRef = useRef(null)
  const [token, setToken] = useState(null)

  const onChange = (value)=>{
    setToken(value)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(isValid === false){
      setContactData(
        {email: "",
        subject: "",
        message: ""}
      )
       return showModal("Invalid Email format", false)
    }
    try {
      if(!token){
        return showModal("Please verify reCAPTCHA", false)
      }else{

        const response = await fetch("/creedlance/contactUs", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...contactData, token})
          })
          response.status === 200 && showModal("success", true)
          setContactData({
            email: "",
            subject: "",
            message: ""
          })
          setDisable(true)

      }
    } catch (error) {
      showModal(`${error.response.data.message}`, false)
    }finally{
    captchaRef.current.reset();
    }
  }
  return (
    <>
      <Container>
        <Nav />
        <section
          className="section-contact"
          style={{ backgroundImage: bgGradient }}
        >
          <div className="main-contact-container">
            <div className="contact-heading">
              <h2>Contact Creedlance</h2>
            </div>
            <div className="contact-container">
              <div className="contact-creedlance">
                <label htmlFor="email">Your Email</label>
                <input name = "email" type="email" id="email" onChange={handleChange} placeholder="example@gmail.com"
                  value={contactData.email} />
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name = "subject"                   onChange={handleChange}
                  value={contactData.subject} />
                <label htmlFor="message">Message</label>
                <textarea
                value={contactData.message}
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  onChange={handleChange}
                ></textarea>
              </div>
              {/* <div className="vertical-rule">
                <img src={Verticalrule} alt="line" />
              </div> */}
              <div className="creedlance-address">
                <p>
                  Creedlance Limited <br /> Nigeria <br />
                  Inquiries: <br /> info@creedlance.com
                </p>
              </div>
            </div>
            <ReCAPTCHA
            ref={captchaRef}
            sitekey="6LfXTv0mAAAAAMkW1dfGmtACoM9ZK_BOTn1BXBWo"
            onChange={onChange}
            />,            
            
            <button disabled = {disable} onClick={(e) => handleSubmit(e)} style={{border: "none", width: "30%", padding: "10px 0", borderRadius: "10px"}}>
              submit
            </button>
          </div>
        </section>
        <Footer />
      </Container>
    </>
  );
}

const Container = styled.section`
  p,
  h1,
  h2,
  h3,
  label,
  input {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .section-contact {
    /* background-image: linear-gradient(45deg, #353535 55%, #202020 45%); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: calc(100vh - 60px);
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (hover: none) {
      background-attachment: initial;
    }

    @media ${device.mob} {
      height: fit-content;
    }
    .main-contact-container {
      position: relative;
      max-width: 100%;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      @media ${device.mob} {
        width: 90%;
        padding: 1rem;
      }
      .contact-heading {
        display: inline-block;
        h2 {
          color: transparent;
          font-family: interbolder;
          font-size: 2.4rem;
          margin-bottom: 2rem;
          background-image: linear-gradient(to right, white, #daa520);
          background-clip: text;
          -webkit-background-clip: text;
          @media ${device.tabletS} {
            margin-bottom: 1rem;
            font-size: 1.5rem;
          }
        }
      }
      .contact-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 5rem;
        width: 100%;

        @media ${device.laptop} {
          gap: 3rem;
        }
        @media ${device.tabletS} {
          gap: 2rem;
        }
        @media ${device.mob} {
          flex-direction: column;
          gap: 0;
          max-width: 100%;
          // justify-content: left;
        }
        .contact-creedlance {
          display: flex;
          flex-direction: column;
          // max-width:50%;
          @media ${device.mob} {
            width: 100%;
            justify-content: center;
            align-items: left;
            text-align: left;
          }
          label {
            color: #ebe0c3;
            font-size: 0.8rem;
            display: inline-block;
            margin: 0.3rem 0 0.3rem;
            text-align: left;
          }

          label:not(:first-child) {
            margin: 1.6rem 0 0.3rem;
          }
          input,
          textarea {
            width: 28rem;
            outline: none;
            border: none;
            display: inline-block;
            margin-bottom: 0.5rem;
            background-color: #e5e3e3;
            @media ${device.tabletS} {
              width: 15rem;
            }
            @media ${device.mob} {
              width: 100%;
            }
          }
          @media ${device.tabletS} {
            input {
              height: 1.5rem;
            }
            label {
              font-size: 0.6rem;
              margin: 0.3rem 0;
            }
          }
          input {
            height: 2.3rem;
            border-radius: 4px;
          }
          textarea {
            border-radius: 4px;
          }
        }
        .vertical-rule {
          img {
            height: 20rem;
            @media ${device.tabletS} {
              height: 18rem;
            }
            @media ${device.mob} {
              display: none;
            }
          }
        }
        .creedlance-address {
          text-align: left;
          @media ${device.mob} {
            text-align: center;
            margin-top: 6.5rem;
            display: inline-block;
            margin-bottom: -4rem;
          }
          p {
            font-size: 1rem;
            font-family: inter;
            color: #ebe0c3;
            line-height: 1.7rem;
            @media ${device.tabletS} {
              font-size: 0.6rem;
              line-height: 1rem;
            }
            @media ${device.mob} {
              font-size: 0.75rem;
            }
          }
        }
      }
      .recaptcha {
        display: flex;
        flex-direction: row;
        border: 1px solid #fff;
        padding: 1rem;
        width: fit-content;
        align-items: center;
        gap: 1rem;
        margin-top: 1.1rem;
        @media ${device.tabletS} {
          gap: 0.7rem;
          margin-top: 1.1rem;
        }
        @media ${device.mob} {
          position: relative;
          top: -6.5rem;
        }
        .geekmark {
          // position: absolute;
          // top: 0;
          // left: 0;
          height: 23px;
          width: 23px;
          background-color: transparent;
          border: 1px solid #fff;
          text-align: center;
          @media ${device.tabletS} {
            height: 19px;
            width: 19px;
          }
          input[type="checkbox"] {
            opacity: 0.8;
            display: inline-block;
            height: 23px;
            width: 23px;
            @media ${device.tabletS} {
              height: 19px;
              width: 19px;
            }
          }
        }

        p {
          color: #fff;
          font-size: 0.6rem;
        }
        img {
          height: 2rem;
          @media ${device.tabletS} {
            height: 1.1rem;
          }
        }
      }
    }
  }
`;
