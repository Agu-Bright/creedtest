import { useState, useEffect, useContext } from "react";
import "./PostCard.css";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import TuneIcon from "@mui/icons-material/Tune";
import { motion, AnimatePresence } from "framer-motion";
// import saryImage from "../../assets/Dashboard/Sary.png";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CloseIcon from "@mui/icons-material/Close";
import useResize from "../../hooks/useResize";
import ReportIcon from "@mui/icons-material/Report";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import PostGrid from "./PostGrid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserDataContext } from "../../contexts/UserDataContext";
import { postData } from "../../api/postData";
import { Link } from "react-router-dom";
import { deleteData } from "../../api/deleteData";
import { TrashIcon } from "@heroicons/react/24/outline";

const PostCard = ({ hideNavBar, showNavBar, description, files, post, id }) => {
	dayjs.extend(relativeTime);

	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);
	const [Likes, setLikes] = useState(post?.likes?.length);
	const [Dislikes, setDislikes] = useState(post?.dislikes?.length);
	const [isMobile, setIsMobile] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [showComment, setShowComment] = useState(false);
	const [isCommentLoading, setIsCommentLoading] = useState(false);
	const [showSetting, setShowSetting] = useState(false);
	const [content, setContent] = useState("");
	const [comments, setComments] = useState(null);
	const [loading, setLoading] = useState(false);

	const { userData } = useContext(UserDataContext);

	const user = JSON.parse(userData).user;

	const variants = {
		animate: {
			scale: [1, 2, 1],
		},
		default: {
			scale: 1,
		},
	};

	// detect screen size
	const handleResize = () => {
		if (window.innerWidth < 1024) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useResize(handleResize);

	const handleAddComment = (e) => {
		e.preventDefault();
		if (content) {
			setLoading(true);
			postData(`/social/posts/${post?._id}/add-a-comment`, { content }).then(
				(res) => {
					setLoading(false);
					setContent("");
					if (res.ok) {
						res.json().then((response) => {
							setComments([...comments, response?.data?.newComment]);
						});
					}
				}
			);
		}
	};

	useEffect(() => {
		if (showComment) {
			setIsCommentLoading(true);
			setTimeout(() => {
				setIsCommentLoading(false);
			}, 1000);
		} else {
			setIsCommentLoading(false);
		}
	}, [showComment]);

	// lock scroll
	useEffect(() => {
		if (showSetting || showComment) {
			hideNavBar();
		} else {
			showNavBar();
		}
	}, [showComment, showSetting]);

	const tabStyle = {
		position: "fixed",
		zIndex: 1900,
		inset: 0,
		overflowY: "auto",
		height: isMobile ? "calc(100% + 50px)" : "85%",
		paddingBottom: isMobile ? "50px" : "",
		backgroundColor: "#fff",
		flex: 1,
		maxWidth: "703px",
		margin: isMobile ? "0 auto" : "4rem auto 0",
		borderRadius: isMobile ? "" : "16px",
	};

	const stopScroll = () => {
		document.querySelector("html").classList.toggle("modal__open");
		// setTimeout(() => {
		//   document.querySelector('.fullscreen').classList.toggle('sub__modal__open');
		// }, 10)
	};

	const handleDrag = (e, info) => {
		if (info.offset.y > 100) {
			setShowSetting(false);
			document.querySelector("html").classList.remove("modal__open");
		}
	};

	const dragAttr = isMobile
		? {
				initial: { y: "100%" },
				animate: { y: "0%" },
				exit: { y: "100%" },
				transition: { type: "none" },
				drag: "y",
				dragConstraints: { top: 0, bottom: 100 },
				dragElastic: {
					bottom: 0.5,
				},
				dragSnapToOrigin: true,
				onDragEnd: handleDrag,
		  }
		: {};

	const handleLike = () => {
		if (!isLiked) {
			if (isDisliked) {
				setIsDisliked(false);
				setDislikes(Dislikes - 1);
				postData("/social/posts/" + id + "/undislike");
			}
			setIsLiked(true);
			setLikes(Likes + 1);
			postData("/social/posts/" + id + "/like");
		} else {
			setIsLiked(false);
			setLikes(Likes - 1);
			postData("/social/posts/" + id + "/unlike");
		}
	};

	const handleDislike = () => {
		if (!isDisliked) {
			if (isLiked) {
				setIsLiked(false);
				setLikes(Likes - 1);
				postData("/social/posts/" + id + "/unlike");
			}
			setIsDisliked(true);
			setDislikes(Dislikes + 1);
			postData("/social/posts/" + id + "/dislike");
		} else {
			setIsDisliked(false);
			setDislikes(Dislikes - 1);
			postData("/social/posts/" + id + "/undislike");
		}
	};

	const handleDelete = () => {
		deleteData(`/social/postss/${id}/delete`).then((res) => {
			setDeleted(true);
		});
	};

	useEffect(() => {
		setComments(post?.comments);
		if (post?.likes?.includes(user?._id)) {
			setIsLiked(true);
		}
		if (post?.dislikes?.includes(user?._id)) {
			setIsDisliked(true);
		}
	}, [post]);
	return (
		!deleted && (
			<>
				{showComment && (
					<ExitFullScreen onClick={() => setShowComment(false)} />
				)}
				<div
					style={showComment ? tabStyle : {}}
					className="post__card__container"
				>
					{showComment && (
						<GoBackTab>
							<ArrowBackIosNewOutlinedIcon
								onClick={() => setShowComment(false)}
							/>
							<p>Post</p>
							<CloseIcon onClick={() => setShowComment(false)} />
						</GoBackTab>
					)}
					{isCommentLoading && (
						<div style={{ margin: "10px auto 0", width: "10%" }}>
							<CircularProgress sx={{ color: "gray" }} />
						</div>
					)}
					{!isCommentLoading && (
						<div className="post__card border-b-4 md:border-0 border-[#ddd]">
							{/* header */}
							<div className="card__header">
								<img
									style={{
										borderRadius: "100%",
										height: "50px",
										width: "50px",
										background: "gray",
										objectFit: "cover",
									}}
									src={post?.createdBy?.photo?.url}
									alt=""
								/>
								<div className="middle">
									<div className="top items-end">
										<h3 style={{ textTransform: "capitalize" }}>
											{post?.createdBy?.name}
										</h3>
										<h2
											className={`${
												post?.createdBy?.role == "enterprise"
													? "bg-primary-500"
													: "bg-gray-800"
											} px-2 py-0.5 rounded font-semibold text-center text-white ml-2 capitalize`}
											style={{ fontSize: "10px" }}
										>
											{post?.createdBy?.role == "enterprise"
												? post?.createdBy?.role
												: post?.createdBy?.occupation}
										</h2>
									</div>
									<div className="bottom">
										<p>{post?.createdBy?.followers?.length} followers</p>
										<p>{dayjs(post?.createdAt).fromNow()}</p>
									</div>
									<p className="text-xs text-zinc-400 capitalize">
										{post?.createdBy?.role} Post
									</p>
								</div>
							</div>

							{/* description */}
							{/* {description && ( */}
							<p className="description py-4">{description}</p>
							{/* )} */}

							{/* post image */}
							{files?.length > 0 && (
								<div className="gallery" onClick={() => stopScroll()}>
									<PostGrid
										description={description}
										modal={true}
										files={files}
										commentVisible={showComment}
										showComment={setShowComment}
										post={post}
									/>
								</div>
							)}

							{/* footer */}
							<div className="card__footer">
								{/* top */}
								<div className="top border-b border-black">
									<div className="left">
										<p>
											<motion.span
												variants={variants}
												animate={isLiked ? "animate" : "default"}
												transition={{ duration: 0.5 }}
											>
												<ThumbUpIcon />
											</motion.span>
											<span>{Likes}</span>
										</p>
										<p>
											<motion.span
												variants={variants}
												animate={isDisliked ? "animate" : "default"}
												transition={{ duration: 0.5 }}
											>
												<ThumbDownIcon />
											</motion.span>
											<span>{Dislikes}</span>
										</p>
									</div>
									<p
										className="comments"
										onClick={() => setShowComment(true)}
										style={{
											cursor: "pointer",
										}}
									>
										{post?.comments?.length} Comments
									</p>
								</div>

								{/* bottom */}
								<div className="bottom">
									<div className="left">
										{/* like */}
										<button
											onClick={handleLike}
											style={{
												color: isLiked ? "#3E80E5" : "black",
											}}
										>
											{!isLiked && <ThumbUpOutlinedIcon />}
											{isLiked && (
												<ThumbUpIcon
													style={{
														color: "#3E80E5",
													}}
												/>
											)}
											Like
										</button>

										{/* dislike */}
										<button
											onClick={handleDislike}
											style={{
												color: isDisliked ? "#E91D45" : "black",
											}}
										>
											{!isDisliked && <ThumbDownAltOutlinedIcon />}
											{isDisliked && (
												<ThumbDownIcon
													style={{
														color: "#E91D45",
													}}
												/>
											)}
											Dislike
										</button>

										{/* comment */}
										<button onClick={() => setShowComment(!showComment)}>
											<CommentIcon />
											Comment
										</button>
									</div>

									{/* setting button */}
									<button
										onClick={() => {
											document
												.querySelector("html")
												.classList.add("modal__open");
											setShowSetting(true);
										}}
									>
										<TuneIcon />
										Setting
									</button>

									{/* Setting */}
									<AnimatePresence key="f">
										{showSetting && (
											<Setting>
												<div
													className="overlay"
													onClick={() => {
														setShowSetting(false);
														document
															.querySelector("html")
															.classList.remove("modal__open");
													}}
												/>
												<motion.div className="slide__comp" {...dragAttr}>
													<div className="drag" />
													<div className="content">
														<button>
															<TrashIcon className="h-6" />
															Delete post
														</button>
													</div>
												</motion.div>
											</Setting>
										)}
									</AnimatePresence>
								</div>
							</div>
							{/* add comment */}
							{showComment && (
								<PostAddComment>
									<div className="add__comment__container">
										<img
											src={user?.photo?.url}
											style={{
												borderRadius: "100%",
												height: "40px",
												width: "40px",
												background: "gray",
												objectFit: "cover",
											}}
										/>
										<form onSubmit={handleAddComment}>
											<input
												type="text"
												value={content}
												onChange={(e) => setContent(e.target.value)}
												placeholder="Add a comment..."
												disabled={loading}
											/>
											<button disabled={loading}>
												{loading ? (
													<CircularProgress
														size={"20px"}
														sx={{ color: "gray" }}
													/>
												) : (
													<SendIcon />
												)}
											</button>
										</form>
									</div>
								</PostAddComment>
							)}
							{/* all comments */}
							{isCommentLoading && (
								<div style={{ margin: "10px auto 0", width: "10%" }}>
									<CircularProgress sx={{ color: "gray" }} />
								</div>
							)}
							{showComment && !isCommentLoading && (
								<AllComment>
									{comments.map((comment, index) => (
										<Comment
											post={post}
											comment={comment}
											comments={comments}
											setComments={setComments}
											index={index}
											userId={user._id}
										/>
									))}
								</AllComment>
							)}
						</div>
					)}
				</div>
			</>
		)
	);
};

export default PostCard;

const ExitFullScreen = styled.div`
	position: fixed;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 1800;
	width: 100%;
	height: 100%;

	@media (max-width: 1023px) {
		display: none;
	}
`;

const GoBackTab = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	height: 49px;
	padding: 0 1rem;
	border-bottom: 1px solid lightgray;
	color: #5b5b5b;
	position: sticky;
	top: 0;
	z-index: 2000;
	font-weight: 600;

	.MuiSvgIcon-root {
		cursor: pointer;
	}

	@media (max-width: 1023px) {
		/* p {
      color: #fff;
    } */

		.MuiSvgIcon-root:last-child {
			color: #fff;
		}
	}

	@media (min-width: 1024px) {
		.MuiSvgIcon-root:first-child {
			color: #fff;
		}

		p {
			font-size: 1rem;
		}
	}
`;

const PostAddComment = styled.div`
	.add__comment__container {
		display: flex;
		margin-top: 10px !important;
		align-items: center;
		padding: 0 0.7rem;
		gap: 5px;
	}

	form {
		flex: 1;
		border: 1px solid #b3b2b3;
		border-radius: 20px;
		display: flex;
		align-items: center;
		overflow-x: hidden;
		padding-right: 5px;
	}

	input {
		flex: 1;
		border: none;
		height: 100%;
		padding: 7px 5px;
		outline: none;
	}

	img {
		height: 30px;
		width: 30px;
		border-radius: 50%;
	}

	.MuiSvgIcon-root {
		font-size: 1.2rem;
	}

	@media (min-width: 370px) {
		input {
			padding: 10px 8px;
		}

		form {
			padding-right: 8px;
		}

		.MuiSvgIcon-root {
			font-size: 1.5rem;
			cursor: pointer;
		}

		img {
			height: 40px;
			width: 40px;
		}
	}

	@media (min-width: 768px) {
		img {
			height: 43px;
			width: 43px;
		}
	}

	@media (min-width: 1024px) {
		.MuiSvgIcon-root:hover {
			color: gray;
		}

		input {
			padding: 10px;
		}
	}
`;

const AllComment = styled.div`
	padding-top: 0.5rem;
`;

const Setting = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: flex-end;
	height: 100vh;
	z-index: 1000;

	> .overlay {
		position: absolute;
		inset: 0;
		background: red;
		height: 100vh;
		z-index: 1001;
		background: rgba(217, 217, 217, 0.3);
	}

	> .slide__comp {
		z-index: 1002;
		position: relative;
		inset: 0;
		background-color: #455a64;
		height: 40%;
		width: 100%;
		border-radius: 16px 16px 0 0;
		padding: 16px;
		display: flex;
		flex-direction: column;
	}

	> .slide__comp > .drag {
		height: 5px;
		background: #d9d9d9;
		border-radius: 23px;
		width: 20%;
		margin: 0 auto 1.5rem;
	}

	> .slide__comp > .content {
		flex: 1;
		background-color: #ffffff;
		border-radius: 6px;
		padding: 1.5rem 1rem;
	}

	> .slide__comp > .content > button {
		margin-bottom: 1rem;
		font-size: 0.875rem;
		font-family: inter;
		color: #263238;
		transition: 165ms;
	}

	> .slide__comp > .content > button > .MuiSvgIcon-root:first-child {
		font-size: 1.4rem;
	}

	> .slide__comp > .content > button > .MuiSvgIcon-root {
		font-size: 1.2rem;
	}

	> .slide__comp > .content > button:active {
		color: #daa520;
	}

	@media (min-width: 1024px) {
		height: 100px;
		width: 220px;
		position: absolute;
		inset: unset;
		right: 0;
		top: 40px;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
		background-color: #fff;
		border-radius: 6px;

		> .slide__comp {
			z-index: 1002;
			position: relative;
			background-color: transparent;
			height: 100%;
			width: 100%;
			padding: 0;
		}

		> .slide__comp > .drag {
			display: none;
		}

		> .overlay {
			position: fixed;
			inset: 0;
			height: 100%;
			width: 100%;
			z-index: 1001;
			background: transparent;
		}

		> .slide__comp > .content {
			padding: 1rem 1rem;
			background-color: transparent;
		}

		> .slide__comp > .content > button:hover {
			color: #daa520;
		}

		> .slide__comp > .content > button:active {
			color: #263238;
		}
	}
`;
