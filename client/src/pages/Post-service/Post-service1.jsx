// FirstTab.js

import React, {
	Fragment,
	useEffect,
	useState,
	useRef,
	useContext,
} from "react";
import "./Post-service.css";
import Post1 from "./../../assets/images/post-serice1.jpeg";
import Post2 from "./../../assets/images/post-service2.jpg";
import Post3 from "./../../assets/images/post-service3.jpg";
import Post4 from "./../../assets/images/post-service4.jpeg";
import Post5 from "./../../assets/images/post-service5.jpeg";
import PickCategory from "../../components/common/PickCategory";
import PickLocation from "../../components/common/PickLocation";
import { AddServicesContext } from "../../contexts/ServicesContext";

const About_service = () => {
	const {
		name,
		setName,
		category,
		setCategory,
		location,
		setLocation,
		photos,
		setPhotos,
		files,
		setFiles,
	} = useContext(AddServicesContext);

	const inputRef = useRef(null);
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [showLocationModal, setShowLocationModal] = useState(false);

	useEffect(() => {
		const Destroybutton = document.getElementById("next-button");
		Destroybutton.style.display = "block";
	}, []);

	const handlePhotoPick = (event) => {
		setFiles([...event.target.files]);
		const localFiles = event.target.files;
		const maxPhotos = 5;

		if (localFiles.length > maxPhotos) {
			alert(`Please select a maximum of ${maxPhotos} photos.`);
			event.preventDefault();
			return;
		}

		const photoURIs = [];
		for (let i = 0; i < localFiles.length; i++) {
			const file = localFiles[i];
			if (!file.type.startsWith("image/")) {
				alert("Please select only image files.");
				event.preventDefault();
				return;
			}
			const uri = URL.createObjectURL(file);
			photoURIs.push(uri);
		}

		setPhotos(photoURIs);
	};

	const removePhoto = (i) => {
		const updatedPhotos = [...photos];
		const updatedFiles = [...files];
		updatedPhotos.splice(i, 1);
		updatedFiles.splice(i, 1);
		setPhotos(updatedPhotos);
		setFiles(updatedFiles);
	};

	return (
		<Fragment>
			{showCategoryModal && (
				<PickCategory
					hide={() => setShowCategoryModal(false)}
					onPick={(cat) => setCategory(cat)} // callback called with the selected category
				/>
			)}
			{showLocationModal && (
				<PickLocation
					hide={() => setShowLocationModal(false)}
					onPick={(loc) => setLocation(loc)} // callback called with the selected location, {state, lga}
				/>
			)}
			<input
				type="file"
				name=""
				id=""
				className="hidden"
				ref={inputRef}
				accept="image/*"
				multiple
				onChange={handlePhotoPick}
			/>
			<div className="About-service">
				<flex>
					<div>
						<label for="Service-name" className="block mb-2">
							Name of Service:
						</label>
						<input
							type="text"
							id="Service-name"
							name="Service-name"
							placeholder="Type in a service name"
							className="text-left"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label for="category" className="block mb-2">
							Category of service:
						</label>
						<button
							name="category"
							onClick={() => setShowCategoryModal(!showCategoryModal)}
						>
							{category ? `${category}` : "Select Category"}
						</button>
					</div>
				</flex>
				<space />
				<label for="category" className="center_time_mobile block mb-2">
					Location Of service
				</label>
				<button
					name="category"
					onClick={() => setShowLocationModal(!showLocationModal)}
				>
					{location ? `${location.lga}, ${location.state}` : "Select Location"}
				</button>
				<space />
				<h5>Upload pictures?</h5>
				<p>
					Upload Images that might be helpful in explaining your Service here
					(Max file size: 5 MB, Max number of file: 5).
				</p>
				<upload_img onClick={() => inputRef.current.click()} />
				<space />
				<div className="upload-container-service">
					<center>
						{photos.map((photo, i) => (
							<div className="uploaded-img-containers" key={i}>
								<div
									className="remove-uploaded-img"
									onClick={() => removePhoto(i)}
								/>
								<img
									className="Post-service-uploaded-img object-cover"
									src={photo}
									alt="uploaded image"
								/>
							</div>
						))}
					</center>
				</div>
				<space />
			</div>
		</Fragment>
	);
};
export default About_service;
