import React, { useContext, useEffect, useState } from "react";
import ImageForm from "../../assets/RegisterImage/image_form.png";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import { postData } from "../../api/postData";
import { SignupContext } from "../../contexts/SignupContext";
import { ModalContext } from "../../contexts/ModalContext";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { fetchData } from "../../api/fetchData";
import { CircularProgress } from "@mui/material";
const Register = () => {
	const {
		name,
		setName,
		email,
		setEmail,
		phoneNumber,
		setPhoneNumber,
		password,
		setPassword,
		passwordConfirm,
		setPasswordConfirm,
		setIsEnterprise,
	} = useContext(SignupContext);

	const { showModal } = useContext(ModalContext);
	const [userLoader, setUserLoader] = useState(false);
	const [taken, setTaken] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		name && email && phoneNumber && password && !taken && password == passwordConfirm
			? navigate("/CompleteRegistration")
			: "";
		password != passwordConfirm
			? showModal("Passwords don't match", false)
			: "";
	};

	useEffect(() => setIsEnterprise(false), []);
	useEffect(() => {
		setTaken(false);
		if (email) {
			setUserLoader(true);
			fetchData(`/users/${email.toLowerCase()}/get-user-email`).then((data) => {
				setUserLoader(false);
				data && setTaken(true);
			});
		}
	}, [email]);
	return (
		<>
			<Nav />
			<div className="register reg">
				<div className="registerContainer login__page register__page">
					<div className="form_container register__form__container">
						<form onSubmit={(e) => handleSubmit(e)}>
							<Link to="/" className="text-xs flex text-primary-500 lg:-ml-20">
								<ChevronLeftIcon className="h-4" /> back
							</Link>
							<h2 className="text-center_111 form-title">
								<strong>Creedlancer Signup</strong>
							</h2>
							<span className="form-des">
								Please make sure the following details are correct
							</span>
							<div className="form-group email-box">
								<label>Name</label>
								<input
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									class="form-control"
									type="name"
									name="Name"
									placeholder="Your Name"
								/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<div className="relative">
									<input
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										class="form-control"
										type="email"
										name="email"
										placeholder="Your Email address"
									/>
									{userLoader && (
										<div className="absolute h-full w-max flex items-center top-0 right-4">
											<CircularProgress
												size={20}
												sx={{ color: "rgb(113 113 122)" }}
											/>
										</div>
									)}
								</div>
								{taken && (
									<p className="text-xs text-red-500 -mt-1">
										This email has been registered before.
									</p>
								)}
							</div>
							<div className="form-group">
								<label>Phone Number</label>
								<input
									required
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									class="form-control"
									type='tel'
									name="phoneNumber"
									placeholder="Your phone number"
								/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									class="form-control"
									type="password"
									name="password"
									placeholder="Password"
								/>
							</div>
							<div className="form-group p-word">
								<label>Password (repeat)</label>
								<input
									required
									value={passwordConfirm}
									onChange={(e) => setPasswordConfirm(e.target.value)}
									class="form-control"
									type="password"
									name="password-repeat"
									placeholder="Password (repeat)"
								/>
							</div>
							<div className="form-group">
								<button class="btn-primary login__btn register__btn">
									Next
								</button>
							</div>
							<span className="already">
								Already have an account? <Link to="/login">Sign in</Link>
							</span>
						</form>
					</div>
					<div className="form_image">
						<img src={ImageForm} alt="" srcset="" />
					</div>
				</div>
				<div className="signup-login-footer-only register__footer">
					<div className="signup-footer-copyright">
						<p>
							©2023,<span>Creedlance</span> ...Connecting the people...
						</p>
					</div>
					<div className="links">
						<a href="#">Privacy</a>
						<a href="#">Terms & Condition</a>
						<a href="#">About Us</a>
						<a href="#">Contact Us</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
