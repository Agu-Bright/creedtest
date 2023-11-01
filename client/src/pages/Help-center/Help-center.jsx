import { useContext, useEffect, useRef, useState } from "react";
import "./Help-center.css";
import AdminNav from "../../components/dashboard_nav/dashboard_nav";
import { postData } from "../../api/postData";
import { UserDataContext } from "../../contexts/UserDataContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../contexts/ModalContext";
import ReCAPTCHA from "react-google-recaptcha";

function Help_center() {
	const { userData } = useContext(UserDataContext);
	const { setLoading } = useContext(LoaderContext);
	const { showModal } = useContext(ModalContext);

	const [fixTab, setFixTab] = useState(false);
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const captchaRef = useRef(null);
	const [token, setToken] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (user && token) {
			setLoading(true);
			postData("/contactus", {
				email: user?.email,
				subject,
				message,
			}).then((res) => {
				if (res.ok) {
					setLoading(false);
					showModal(
						"Your message has been sent, you will be replied via email",
						true
					);
					navigate(-1);
				}
			});
		}else{
            
            showModal(
                "Please verify Captcha",
                false
            );
        }
	};

	useEffect(() => {
		if (userData) {
			setUser(JSON.parse(userData).user);
		}
	}, [userData]);

	const onChange = (value) => {
		setToken(value);
	};
	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)} className="help_center_form_body">
				<AdminNav fixTab={fixTab} setFixTab={setFixTab} />
				<div className="help_center_flex">
					<div className="help_center_form">
						<h3>Love to hear from you, Get in touch</h3>
						<p>
							is there anything you would like us to know? That will increase
							the quality of our service
						</p>
						{/* <div className="input-flex"> 
                        <div className="mobile_center">
                            <label for="name">Your Name </label>
                            <input 
                                name="name" placeholder="Name"
                                required 
                            />
                        </div>
                        <div className="mobile_center">
                            <label for="email">Your Email </label>
                            <input 
                                name="email" 
                                type='email' placeholder="Email"
                                required 
                            />
                        </div>
                        
                        </div> */}
						<div className="input-flex">
							{/* <div className="mobile_center">
                                <label for="phone">Your Number </label>
                                <input 
                                    name="phone" placeholder="Phone Number" 
                                    required
                                />
                            </div> */}
							<div className="mobile_center">
								<label for="topic">Topic </label>
								<input
									onChange={(e) => setSubject(e.target.value)}
									value={subject}
									name="topic"
									required
									placeholder="I'm having issues with?"
								/>
							</div>
						</div>
						<label for="Message">Message</label>
						<textarea
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							name="Message"
							required
							placeholder="Define your Topic here, try being clear. we will reach you as soon as we can"
							style={{ marginBottom: "12px" }}
						></textarea>

						<ReCAPTCHA
							ref={captchaRef}
							sitekey="6LfXTv0mAAAAAMkW1dfGmtACoM9ZK_BOTn1BXBWo"
							onChange={onChange}
						/>

						<button className="Send_button-1">Send</button>
					</div>
					<help_center_img />
				</div>
			</form>
		</>
	);
}

export default Help_center;
