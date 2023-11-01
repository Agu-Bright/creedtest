import { useContext, useState, useEffect } from "react";
import ImageForm from "../../assets/RegisterImage/image_form.png";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/nav/Nav";

import "./Register.css";
import { postData } from "../../api/postData";
import { LoaderContext } from "../../contexts/LoaderContext";
import { ModalContext } from "../../contexts/ModalContext";
import { UserDataContext } from "../../contexts/UserDataContext";
import { fetchData } from "../../api/fetchData";
import { CircularProgress } from "@mui/material";
const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userLoader, setUserLoader] = useState(false);
	const [taken, setTaken] = useState(false);
	const { setLoading } = useContext(LoaderContext);
	const { showModal } = useContext(ModalContext);
	const { checkStorage } = useContext(UserDataContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		postData("/users/login", { email: email.toLowerCase(), password }).then(
			(res) => {
				if (res.ok) {
					res.json().then((res) => {
						localStorage.setItem("user", JSON.stringify(res));
						checkStorage();
						setLoading(false);
						navigate("/dashboard");
						showModal("Welcome Back!", true);
					});
				} else {
					res.json().then((res) => {
						showModal(res.message, false);
						setLoading(false);
					});
				}
			}
		);
	};

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
			<div className="registerContainer login__page">
				<div className="form_container">
					<form onSubmit={(e) => handleSubmit(e)}>
						<h2 className="text-center">
							<strong>Welcome back</strong>
						</h2>
						<span className="caution">
							Enter your email and password to sign in
						</span>
						<div className="form-group email-box">
							<label>Email</label>
							<div className="relative">
								<input
									className="form-control"
									type="email"
									name="email"
									placeholder="Your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
							{!taken && email && (
								<p className="text-xs text-red-500 -mt-1">
									This email does not exist in our records.
								</p>
							)}
						</div>
						<div className="form-group">
							<label>Password</label>
							<input
								className="form-control"
								type="password"
								name="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="reg_toggle">
							<label className="switch">
								<input type="checkbox" />
								<span className="slider round"></span>
							</label>
							<span>Remember me</span>
						</div>

						<div className="form-group">
							<button className="btn-primary login__btn" type="submit">
								Sign in
							</button>
						</div>

						<span className="already">
							Don't have an account? <Link to="/create-account">Sign up</Link>
						</span>
						<br />
						<span className="already">
							<Link to="/forgotPassword">Forgot Password?</Link>
						</span>
					</form>
				</div>
				<div className="form_image">
					<img src={ImageForm} alt="" className="bg-zinc-300" srcset="" />
				</div>
			</div>
			<div className="signup-login-footer-only">
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
		</>
	);
};

export default Login;
