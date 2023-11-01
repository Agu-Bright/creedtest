import { useContext, useState } from "react";
import { postData } from "../../api/postData";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/nav/Nav";
import { img1 } from "../../assets/mike";
import { LoaderContext } from "../../contexts/LoaderContext";
import { useNavigate, useParams } from "react-router-dom";
import { updateData } from "../../api/updateData";
import Swal from "sweetalert2";

const Reset_Password = () => {
	const { setLoading } = useContext(LoaderContext);
	const { token } = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (token && password && confirmPassword && password == confirmPassword) {
			setLoading(true);
			updateData("/users/resetPassword/" + token, {
				password,
				confirmPassword,
			}).then(() => {
				setLoading(false)
				Swal.fire({
					title: "Password Reset!",
					text: "Your password has been reset, login to continue",
					timer: 5000,
					showCloseButton: false,
					icon: "success",
				});
				navigate('/login')
			});
		}
	};
	return (
		<>
			<Nav />
			<div className="grid lg:grid-cols-3 h-[90vh]">
				<form
					id="mike"
					onSubmit={(e) => handleSubmit(e)}
					className="flex flex-col col-span-2 justify-center items-center p-4"
				>
					<div className="w-full max-w-lg mb-14">
						<h1 className="font-semibold text-2xl border-b-4 pr-2 border-primary-500 w-max">
							Reset Password
						</h1>
					</div>
					<div className="flex gap-2 flex-col w-full max-w-lg">
						<label htmlFor="" className="text-base">
							New Password
						</label>
						<input
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="border rounded-md p-2"
							placeholder="*********"
						/>
						<label htmlFor="" className="text-base mt-3">
							Confirm Password
						</label>
						<input
							type="password"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="border rounded-md p-2"
							placeholder="*********"
						/>

						<button className="bg-primary-500 rounded text-white py-3 mt-5 text-lg">
							Update Password
						</button>
					</div>
				</form>
				<img
					src={img1}
					className="h-full w-full -z-10 lg:block hidden"
					alt=""
				/>
			</div>
			<Footer />
		</>
	);
};

export default Reset_Password;
