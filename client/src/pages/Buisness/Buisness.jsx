import React, { useContext, useEffect } from "react";
import "./Buisness.css";
import DropZone from "../CompleteRegistration/DropZone";
import { Link, useNavigate } from "react-router-dom";
import ImageForm from "../../assets/RegisterImage/image_form.png";
import Nav from "../../components/nav/Nav";
import { LoaderContext } from "../../contexts/LoaderContext";
import { ModalContext } from "../../contexts/ModalContext";
import { UserDataContext } from "../../contexts/UserDataContext";
import { SignupContext } from "../../contexts/SignupContext";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
const Buisness = () => {
	const { setLoading } = useContext(LoaderContext);
	const { showModal } = useContext(ModalContext);
	const { checkStorage } = useContext(UserDataContext);

	const {
		name,
		signup,
		businessName,
		setBusinessName,
		businessCategory,
		setBusinessCategory,
		hourlyCharge,
		setHourlyCharge,
		services,
		setServices,
		CAC,
		setCAC,
	} = useContext(SignupContext);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		signup(true).then((res) => {
			if (res.ok) {
				res.json().then((res) => {
					localStorage.setItem("user", JSON.stringify(res));
					checkStorage();
					setLoading(false);
					navigate("/profile/posts");
					showModal("Welcome " + name + "!", true);
				});
			} else {
				res.json().then((res) => {
					showModal(res.message, false);
					setLoading(false);
				});
			}
		});
	};

	useEffect(() => {
		if (!name) {
			navigate("/enterprise-signup");
		}
	}, []);
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="logo buisness-logo"></div>
			<div className="Buisness">
				<div className="Buisness_container">
					<div className="Buisness_form">
						<div className="Buisness_form-container">
							<div className="buisness_form-sub">
							<Link to={-1} className="text-xs flex text-primary-500 lg:-ml-20">
								<ChevronLeftIcon className="h-4" /> back
							</Link>
								<h2 className="text-center">
									<strong>Final step</strong>
									<b className="enterprise_reg">(enterprise)</b>
								</h2>
								<span>
									We will take time to review your document, if we find out that
									it is fake your enterprise account will be closed
								</span>
							</div>
							<div className="charge_label">
								<label htmlFor="">How much do you charge per hour*</label>
							</div>
							<div className="charge_input">
								<input
									value={hourlyCharge}
									onChange={(e) => setHourlyCharge(e.target.value)}
									className="form-control"
									type="number"
									required
								/>
							</div>
							<div className="CAC_label">
								<label htmlFor="">CAC*</label>
							</div>
							<div className="CAC_input">
								<div className=" border border-dashed rounded p-10 relative">
									<input
										type="file"
										className="h-full w-full absolute opacity-0 cursor-pointer"
										onChange={(e) => setCAC(e.target.files[0])}
									/>

									{CAC ? (
										<p className="w-full text-center">{CAC?.name}</p>
									) : (
										<p className="w-full text-center">
											Open file or drag and drop here
										</p>
									)}
								</div>
								<small className="text-xs mt-1">
									Your CAC will only be used for verification of your Enterprise
									and will not be visible to anyone else
								</small>
							</div>
							<div>
								<div className="buis_btn">
									<button className="btn-primary" type="submit">
										Complete
									</button>
								</div>
							</div>
							<div className="buiness_already"></div>
						</div>
					</div>
					<div className="form_image">
						<img src={ImageForm} alt="" srcset="" />
					</div>
				</div>
			</div>
		</form>
	);
};

export default Buisness;
