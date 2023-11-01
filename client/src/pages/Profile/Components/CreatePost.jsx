import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import saryImage from "../../../assets/Dashboard/Sary.png";
import PublicIcon from "@mui/icons-material/Public";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import PinDropIcon from "@mui/icons-material/PinDrop";
import CircularProgress from "@mui/material/CircularProgress";
import ImagePickerComponent from "./ImagePickerComponent";
import VideoPickerComponent from "./VideoPickerComponent";
import PostGrid from "../../Dashboards/components/PostGrid";
import applicantImage from "../../../assets/dashboard/applicant.png";
import avatarImage from "../../../assets/Dashboard/avatar.jpeg";
import { AdminNavContext } from "../../../provider/AdminNav";
import { LocationContext } from "../../../provider/Location";
import { ModalContext } from "../../../contexts/ModalContext";
import { postData } from "../../../api/postData";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { motion } from "framer-motion";
import { ImageContext } from "../../../contexts/ImageContext";
import ImageCropper from "../../../components/MikesComponents/ImageCropper";
import { SocialPostContext } from "../../../contexts/SocialPostContext";

const CreatePost = ({
	hide,
	postType = "text",
	showLocationPicker,
	fetchPosts,
	location,
}) => {
	const { showModal } = useContext(ModalContext);
	const { showCropper, croppedImages, cropDone } = useContext(ImageContext);
	const { createPost } = useContext(SocialPostContext);

	const { pathname } = useLocation();

	const navigate = useNavigate();

	const [text, setText] = useState("");
	const [files, setFiles] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uploadedVideos, setUploadedVideos] = useState([]);
	const { dispatch } = useContext(AdminNavContext);

	useEffect(() => {
		console.log(selectedFiles);
		dispatch({ type: "HIDE_ALL" });
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 500);
	}, []);

	const { userData } = useContext(UserDataContext);

	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(JSON.parse(userData).user);
	}, [userData]);

	const generateVideoThumbnail = async (video) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				const oldArray = selectedFiles;
				oldArray.push({ type: "video", url: reader.result });
				setSelectedFiles([...oldArray]);
				console.log(selectedFiles);
			}
		};
		reader.readAsDataURL(video);
		return new Promise((resolve, reject) => {
			const videoElement = document.createElement("video");
			videoElement.src = URL.createObjectURL(video);

			videoElement.addEventListener("loadeddata", () => {
				videoElement.currentTime = 1; // Seek to a specific time point (e.g., 1 second)

				videoElement.addEventListener("seeked", () => {
					const canvas = document.createElement("canvas");
					canvas.width = videoElement.videoWidth;
					canvas.height = videoElement.videoHeight;

					const context = canvas.getContext("2d");
					context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

					const thumbnailURL = canvas.toDataURL("image/jpeg");

					resolve(thumbnailURL);
				});

				videoElement.addEventListener("error", (error) => {
					reject(error);
				});
			});

			videoElement.addEventListener("error", (error) => {
				reject(error);
			});

			// Load the video metadata to ensure it's ready to be captured
			videoElement.load();
		});
	};

	const __pickImage = () => {
		document.querySelector("#create-post-image-uploader").click();
	};

	const __pickVideo = () => {
		document.querySelector("#create-post-video-uploader").click();
	};

	const __previewImages = (e) => {
		// setFiles([]);
		const images = e.target.files;
		showCropper(images);
	};

	useEffect(() => {
		if (cropDone) {
			let oldArray = selectedFiles;
			const imageSources = [];
			for (let i = 0; i < croppedImages.length; i++) {
				imageSources.push({
					type: "image",
					url: croppedImages[i],
				});
			}
			setUploadedImages(imageSources.map((img) => img.url));
			setFiles([...files, ...imageSources]);
			setSelectedFiles([...oldArray,...imageSources]);
		}
		// console.log(croppedImages)
	}, [cropDone]);

	useEffect(() => {
		setFiles([]);
		setSelectedFiles([]);
	}, []);

	// const __previewImages = (e) => {
	//   console.log("hello");
	//   const files = Array.from(e.target.files);
	//   setImagesPreview([]);
	//   setImages([]);

	//   files.forEach((file) => {
	//     const reader = new FileReader();
	//     reader.onload = () => {
	//       if (reader.readyState === 2) {
	//         setFiles((oldArray) => [...oldArray, reader.result]);
	//         setSelectedFiles((oldArray) => [...oldArray, reader.result]);
	//       }
	//     };
	//     reader.readAsDataURL(file);
	//   });
	//   console.log(selectedFiles);
	// };

	const __previewVideo = (e) => {
		const videos = e.target.files;
		if (videos.length > 0) {
			const videoPromises = [];

			for (let i = 0; i < videos.length; i++) {
				const promise = generateVideoThumbnail(videos[i])
					.then((thumbnailURL) => ({
						type: "video",
						url: URL.createObjectURL(videos[i]),
						poster: thumbnailURL,
					}))
					.catch((error) => {
						console.error("Failed to generate video thumbnail:", error);
						return null;
					});

				videoPromises.push(promise);
			}

			Promise.all(videoPromises)
				.then((videoSources) => {
					const filteredVideoSources = videoSources.filter(Boolean); // Remove any null values

					setUploadedVideos(filteredVideoSources.map((vid) => vid.url));

					setFiles([...files, ...filteredVideoSources]);
				})
				.catch((error) => {
					console.error("Error while generating video thumbnails:", error);
				});
		}
	};

	return (
		<Container>
			<Overlay onClick={hide} />
			<Content>
				<Top style={{ position: "relative", overflow: "hidden" }}>
					<p>
						{postType === "text"
							? "Create a post"
							: postType === "video"
							? "Upload Video"
							: "Upload photos"}
					</p>
					<CloseIcon
						onClick={() => {
							dispatch({ type: "SHOW_ALL" });
							hide();
						}}
					/>
					{loading && (
						<motion.div
							initial={{ left: "-100%" }}
							animate={{ left: "100%" }}
							transition={{
								repeat: "infinite",
								ease: "linear",
								duration: "0.5",
							}}
							className="absolute w-full h-1 bg-primary-500 bottom-0 left-0"
						></motion.div>
					)}
				</Top>

				{/* Loading component */}
				{isLoading && (
					<div style={{ margin: "18% auto 0", width: "10%" }}>
						<CircularProgress sx={{ color: "gray" }} />
					</div>
				)}

				{!isLoading && (
					<React.Fragment>
						{/* Text post */}
						{postType === "text" && (
							<React.Fragment>
								{/* profile details */}
								<Profile>
									<img
										src={user?.photo?.url || avatarImage}
										style={{ objectFit: "cover", background: "gray" }}
										alt=""
									/>
									<div>
										<p>{`${user?.name}${
											location?.state
												? ` is in ${location?.lga + ", " + location?.state}`
												: ""
										}`}</p>
										<button>
											<PublicIcon />
											Anyone
											<ArrowDropDownIcon />
										</button>
									</div>
								</Profile>

								{/* Middle container */}
								<MiddleCon>
									{/* enter text */}
									<Textarea
										flex={files.length === 0}
										value={text}
										onChange={(e) => setText(e.target.value)}
										placeholder="What do you want to talk about?"
									/>

									{files.length > 0 && (
										<PostGrid
											files={files}
											selectedFiles={selectedFiles}
											setFiles={setFiles}
											setSelectedFiles={setSelectedFiles}
										/>
									)}
								</MiddleCon>

								{/* footer */}
								<Footer>
									<div>
										<PhotoSizeSelectActualOutlinedIcon onClick={__pickImage} />
										<SmartDisplayIcon onClick={__pickVideo} />
										<PinDropIcon onClick={showLocationPicker} />
									</div>
									<button
										disabled={(!text && selectedFiles.length == 0) || loading}
										onClick={() => {
											if (text || selectedFiles.length > 0) {
												dispatch({ type: "SHOW_ALL" });
												hide();
												if (pathname == "/dashboard") {
													navigate("/profile/posts");
												}

												createPost(text,selectedFiles,location);
											} else {
												showModal("Create a valid post", false);
											}
										}}
									>
										Post
									</button>
								</Footer>
							</React.Fragment>
						)}

						{postType === "photo" && (
							<ImagePickerComponent
								hide={hide}
								__pickImage={__pickImage}
								uploadedImages={uploadedImages}
								setUploadedImages={setUploadedImages}
							/>
						)}
						{postType === "video" && (
							<VideoPickerComponent
								hide={hide}
								__pickVideo={__pickVideo}
								uploadedVideos={uploadedVideos}
								setUploadedVideos={setUploadedVideos}
							/>
						)}
					</React.Fragment>
				)}
				<ImageCropper />
			</Content>
			<ImagePicker
				type="file"
				id="create-post-image-uploader"
				multiple
				accept="image/*"
				onChange={(e) => __previewImages(e)}
			/>
			<VideoPicker
				type="file"
				id="create-post-video-uploader"
				multiple
				accept="video/*"
				onChange={__previewVideo}
			/>
		</Container>
	);
};

export default CreatePost;

const Container = styled.div`
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 1000;

	@media (min-width: 1024px) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const Overlay = styled.div`
	position: absolute;
	inset: 0;
	background-color: #000000d2;
	z-index: 1001;
`;

const Content = styled.div`
	background-color: #fff;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 1002;
	position: relative;

	@media (min-width: 1024px) {
		min-height: 380px;
		max-height: 80vh;
		max-width: 550px;
		border-radius: 8px;
	}
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 42px;
	padding: 0 1rem;
	border-bottom: 1px solid #dad9d9;

	p {
		font-weight: 600px;
		font-size: 1.25rem;
		color: #191919;
		font-family: inter;
	}

	.MuiSvgIcon-root {
		color: #5b5b5b;
		cursor: pointer;
	}

	@media (min-width: 370px) {
		height: 49px;
	}

	@media (min-width: 1024px) {
		height: 59px;
	}
`;

const Profile = styled.div`
	display: flex;
	gap: 0.7rem;
	padding: 0.7rem;

	img {
		height: 50px;
		width: 50px;
		border-radius: 50%;
	}

	div > p {
		margin: 0 0 0.1rem;
		font-size: 1rem;
		font-weight: 600;
		font-family: inter;
		color: #373535;
	}

	div > button {
		background-color: #fff;
		display: flex;
		align-items: center;
		gap: 0.2rem;
		padding: 0.04rem 0.2rem 0.04rem 0.5rem;
		border-radius: 20px;
		border: 1px solid #666666;
		color: #666666;
		font-weight: 600;
		cursor: pointer;
	}

	div > button > .MuiSvgIcon-root {
		font-size: 1rem;
		color: #666666;
	}

	div > button > .MuiSvgIcon-root:last-child {
		font-size: 1.6rem;
		margin-left: -3px;
	}
`;

const Textarea = styled.textarea`
	/* padding: 0.5rem 1rem 1rem; */
	border: none;
	outline: none;
	background-color: #fff;
	font-family: inter;
	resize: none;
	font-size: 0.9rem;
	min-height: ${(props) => (props.flex ? "98%" : "50%")};

	::placeholder {
		font-family: inter;
		font-size: 0.9rem;
	}

	@media (min-width: 1024px) {
		font-size: 1rem;

		::placeholder {
			font-family: inter;
			font-size: 1rem;
		}
	}
`;

const MiddleCon = styled.div`
	flex: 1;
	padding: 0.5rem 1rem 1rem;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Footer = styled.div`
	height: 42px;
	padding: 0 1rem;
	border-top: 1px solid #dad9d9;
	display: flex;
	align-items: center;
	justify-content: space-between;

	div {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	div > .MuiSvgIcon-root {
		color: #6c6a6a;
		cursor: pointer;
	}

	button {
		font-size: 1rem;
		padding: 0.35rem 1.2rem;
		min-width: 60px;
		border-radius: 20px;
		border: none;
		color: #fff;
		background-color: #daa520;
		transition: 165ms;
	}

	button:disabled {
		color: #aeadad;
		background-color: #ebebeb;
	}

	@media (min-width: 370px) {
		height: 49px;
	}

	@media (min-width: 1024px) {
		height: 59px;
	}
`;

const ImagePicker = styled.input`
	position: absolute;
	visibility: hidden;
	pointer-events: none;
`;

const VideoPicker = styled.input`
	position: absolute;
	visibility: hidden;
	pointer-events: none;
`;
