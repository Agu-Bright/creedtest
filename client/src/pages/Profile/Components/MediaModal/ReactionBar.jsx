import React, { Fragment, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { motion } from "framer-motion";
import LikeSound from "../../../../assets/sound/like.mp3";
import DislikeSound from "../../../../assets/sound/dislike.mp3";
import { postData } from "../../../../api/postData";

const ReactionBar = ({ showComment, post, isPost }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);

	const [Likes, setLikes] = useState(post?.likes?.length);
	const [Dislikes, setDislikes] = useState(post?.dislikes?.length);

	const reactionVariant = {
		animate: {
			scale: [1, 1.5, 0.5, 1],
		},
		default: {
			scale: 1,
		},
	};

	// reactions
	const handleLike = () => {
		if (!isLiked) {
			// const sound = new Audio(LikeSound)
			// sound.playbackRate = 1.2
			// sound.play()
			if ("vibrate" in navigator) {
				// Trigger a short vibration
				navigator.vibrate(100);
			}
			setIsLiked(true);
			setIsDisliked(false);
			postData("/social/posts/" + post?._id + "/like").then(() => {
				setLikes(Likes + 1);
			});
		} else {
			setIsLiked(false);
			postData("/social/posts/" + post?.id + "/unlike").then(() => {
				setLikes(Likes - 1);
			});
		}
	};

	const handleDislike = () => {
		if (!isDisliked) {
			// const sound = new Audio(DislikeSound)
			// sound.play()
			setIsDisliked(true);
			setIsLiked(false);
			postData("/social/posts/" + post?._id + "/dislike").then(() => {
				setDislikes(Dislikes + 1);
			});

			if ("vibrate" in navigator) {
				// Trigger a short vibration
				navigator.vibrate(100);
			}
		} else {
			setIsDisliked(false);
			postData("/social/posts/" + post?._id + "/undislike").then(() => {
				setDislikes(Dislikes - 1);
			});
		}
		setIsDisliked(!isDisliked);
		setIsLiked(false);
	};

	return (
		<div className="h-16 lg:h-12 flex items-center gap-x-10 justify-center sm:gap-x-14 lg:gap-x-10">
			{isPost && (
				<Fragment>
					<button
						onClick={handleLike}
						className="flex items-center gap-x-1 border-none bg-transparent"
					>
						<motion.span
							className="inline-flex"
							animate={isLiked ? "animate" : "default"}
							variants={reactionVariant}
							transition={{ duration: 1.2 }}
						>
							{!isLiked && (
								<ThumbUpOffAltIcon
									sx={{ fontSize: { xs: 16, md: 20, lg: 24 } }}
									className="text-white lg:text-black"
								/>
							)}
							{isLiked && (
								<ThumbUpIcon
									sx={{ fontSize: { xs: 16, md: 20, lg: 24 } }}
									style={{ color: "#3E80E5" }}
								/>
							)}
						</motion.span>
						<p
							className={`text-xs text-white ${
								isLiked ? "text-[#3E80E5] lg:text-[#3E80E5]" : "lg:text-black"
							}`}
							style={{ fontSize: window.innerWidth >= 640 && "1rem" }}
						>
							{Likes}
						</p>
					</button>
					<button
						onClick={handleDislike}
						className="flex items-center gap-x-1 border-none bg-transparent"
					>
						<motion.span
							className="inline-flex"
							animate={isDisliked ? "animate" : "default"}
							variants={reactionVariant}
							transition={{ duration: 0.5 }}
						>
							{!isDisliked && (
								<ThumbDownOffAltIcon
									sx={{ fontSize: { xs: 16, md: 20, lg: 24 } }}
									className="text-white lg:text-black"
								/>
							)}
							{isDisliked && (
								<ThumbDownIcon
									sx={{ fontSize: { xs: 16, md: 20, lg: 24 } }}
									style={{ color: "#E91D45" }}
								/>
							)}
						</motion.span>
						<p
							style={{ fontSize: window.innerWidth >= 640 && "1rem" }}
							className={`text-xs text-white ${
								isDisliked ? "text-[#E91D45] lg:text-[#E91D45]" : "lg:text-black"
							}`}
						>
							{Dislikes}
						</p>
					</button>
					<button
						onClick={showComment}
						className="flex items-center gap-x-1 border-none bg-transparent"
					>
						<motion.span className="inline-flex">
							<CommentOutlinedIcon
								sx={{ fontSize: { xs: 16, md: 18, lg: 22 } }}
								className="text-white lg:text-black"
							/>
						</motion.span>
						<p
							className="text-xs text-white lg:text-black"
							style={{ fontSize: window.innerWidth >= 640 && "1rem" }}
						>
							{post?.comments?.length}
						</p>
					</button>
				</Fragment>
			)}
		</div>
	);
};

export default ReactionBar;
