import React, { useContext, useState } from "react";
import "./forgot_password.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/Footer/Footer";
import { postData } from "../../api/postData";
import { LoaderContext } from "../../contexts/LoaderContext";

import Swal from "sweetalert2";

const Forgot_password = () => {
	const { setLoading } = useContext(LoaderContext);

	const [email, setEmail] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		postData("/users/forgotPassword", { email }).then((res) => {
			setLoading(false);
			if (res.ok) {
				Swal.fire({
					title: "Reset Link Sent",
					text: "A reset link has been sent to your email",
					timer: 2000,
					icon: "success",
				});
			}
		});
	};
	return (
		<>
			<Nav />

			<form onSubmit={(e) => handleSubmit(e)} className="forgot_password_cont">
				<br></br>
				<forgot_password_icon></forgot_password_icon>

				<h1>Forgot Password?</h1>
				<p>Input your mail, you will be sent a link</p>

				<div className="email_cont">
					<email_icon></email_icon>
					<input
						name="email"
						type="email"
						placeholder="example@gmail.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<button className="submit_button">Reset password</button>
			</form>

			<Footer />
		</>
	);
};

export default Forgot_password;
