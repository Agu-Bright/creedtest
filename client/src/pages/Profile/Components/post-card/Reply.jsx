import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import { fetchData } from "../../../../api/fetchData";
import { postData } from "../../../../api/postData";
import { deleteData } from "../../../../api/deleteData";
import avatarImage from "../../../../assets/Dashboard/avatar.jpeg";
import { CircularProgress } from "@mui/material";
import { linkUsernames } from "../../../../functions/linkUsername";

const Reply = ({
	reply,
	userId,
	comments,
	comment,
	setComments,
	index,
	repIndex,
}) => {
	const [deleted, setDeleted] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [replyVal, setReplyVal] = useState("");

	const [showReplyForm, setShowReplyForm] = useState(false);

	// handle likes and dislike
	const handleLike = () => {
		if (!isLiked) {
			if (isDisliked) {
				setIsDisliked(false);
				setDislikes(dislikes - 1);
				postData("/social/replies/" + id + "/undislike");
			}
			setIsLiked(true);
			setLikes(likes + 1);
			postData("/social/replies/" + id + "/like");
		} else {
			setIsLiked(false);
			setLikes(likes - 1);
			postData("/social/replies/" + id + "/unlike");
		}
	};

	const handleDislike = () => {
		if (!isDisliked) {
			if (isLiked) {
				setIsLiked(false);
				setLikes(likes - 1);
				postData("/social/replies/" + id + "/unlike");
			}
			setIsDisliked(true);
			setDislikes(dislikes + 1);
			postData("/social/replies/" + id + "/dislike");
		} else {
			setIsDisliked(false);
			setDislikes(dislikes - 1);
			postData("/social/replies/" + id + "/undislike");
		}
	};

	// Reaction animation
	const animation = {
		animate: {
			scale: [1, 1.5, 1],
		},
		default: {
			scale: 1,
		},
	};

	const [user, setUser] = useState(null);
	useEffect(() => {
		setId(reply?._id);
		setLikes(reply?.likes?.length);
		setDislikes(reply?.dislikes?.length);
		fetchData(`/users/${reply?.createdBy}/get-user`).then((data) => {
			setUser(data);
		});
	}, []);
	useEffect(() => {
		if (reply?.likes?.includes(userId)) {
			setIsLiked(true);
		}
		if (reply?.dislikes?.includes(userId)) {
			setIsDisliked(true);
		}
	}, [reply, userId]);
	const handleDelete = () => {
		deleteData(`/social/replies/${id}/delete`).then(() => {
			setDeleted(true);
		});
	};
	return (
		!deleted && (
			<Container>
				<img
					src={user?.photo?.url || avatarImage}
					className="object-cover"
					alt=""
				/>
				<div className="comment__info__container">
					<CommentInfo>
						<div className="header">
							<div className="left flex gap-2">
								<Link
									style={{ textTransform: "capitalize" }}
									to={"/profile/" + user?.username + "/posts"}
								>
									{user?.name}
								</Link>
								<p
									className="bg-zinc-500 text-white py-1 rounded"
									style={{
										paddingInline: "8px",
										fontSize: "10px",
										paddingTop: "2px",
									}}
								>
									{user?.occupation}
								</p>
							</div>
						</div>
						<p className="comment">{linkUsernames(reply.content)}</p>
					</CommentInfo>
					<Reactions>
						<div className="reaction">
							<span
								onClick={handleLike}
								style={{ color: isLiked ? "#3E80E5" : "#000" }}
							>
								<motion.span
									variants={animation}
									animate={isLiked ? "animate" : "default"}
								>
									<ThumbUpIcon
										style={{ fontSize: "18px" }}
										className="text-lg cursor-pointer"
									/>
								</motion.span>{" "}
								{likes}
							</span>
						</div>
						<div className="reaction">
							<span
								onClick={handleDislike}
								style={{ color: isDisliked ? "#E91D45" : "#000" }}
							>
								<motion.span
									variants={animation}
									animate={isDisliked ? "animate" : "default"}
								>
									<ThumbDownIcon
										style={{ fontSize: "18px" }}
										className="text-lg cursor-pointer"
									/>
								</motion.span>{" "}
								{dislikes}
							</span>
						</div>
						<div
							className="reaction cursor-pointer"
							onClick={() => {
								setShowReplyForm(true);
								setReplyVal(`@${user?.username} `);
							}}
						>
							<button>Reply</button>
						</div>
						{userId == user?._id && (
							<div className="reaction" onClick={handleDelete}>
								<button style={{ color: "red" }}>Delete</button>
							</div>
						)}
					</Reactions>
					{showReplyForm && (
						<ReplyForm>
							<div className="add__comment__container">
								<form
									className="bg-zinc-100"
									onSubmit={(e) => {
										e.preventDefault();
										if (replyVal) {
											setLoading(true);
											postData(`/social/${comment._id}/add-a-reply`, {
												content: replyVal,
												index: repIndex,
											}).then((res) => {
												setLoading(false);
												res.json().then((r) => {
													const localComments = comments;
													localComments[index]?.replies.splice(
														repIndex + 1,
														0,
														r.data.newReply
													);
													setComments([...localComments]);
													setReplyVal("");
													setShowReplyForm(false);
												});
											});
										}
									}}
								>
									<input
										type="text"
										placeholder="Type a reply"
										value={replyVal}
										onChange={(e) => setReplyVal(e.target.value)}
										className="bg-zinc-100 p-2"
									/>
									<button disabled={loading}>
										{loading ? (
											<CircularProgress size={"20px"} sx={{ color: "gray" }} />
										) : (
											<SendIcon />
										)}
									</button>
								</form>
							</div>
						</ReplyForm>
					)}
				</div>
			</Container>
		)
	);
};

export default Reply;

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 5px;

	img {
		height: 30px;
		width: 30px;
		border-radius: 50%;
	}

	.comment__info__container {
		flex: 1;
	}

	@media (min-width: 370px) {
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
`;

const CommentInfo = styled.div`
	background-color: #f2f2f2;
	border-radius: 4px;
	padding: 0.5rem;
	flex: 1;

	.header > .top > .left {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.header > .top > .left > a {
		font-size: 0.75rem;
		font-family: intermedium;
	}

	.header > .top > .left > p {
		font-size: 0.65rem;
		font-family: intermedium;
		color: white;
		background: gray;
		padding: 0.1rem 0.4rem;
		border-radius: 3px;
	}

	.header > p {
		font-size: 0.7rem;
		color: #616161;
		margin-top: 3px;
	}

	.comment {
		margin-top: 10px;
		font-size: 0.72rem;
		line-height: 1.1rem;
		font-family: inter;
	}

	@media (min-width: 370px) {
		padding: 0.8rem;

		.header > .top > .left > a {
			font-size: 0.875rem;
		}

		.comment {
			margin-top: 10px;
			font-size: 0.77rem;
			line-height: 1.2rem;
		}
	}

	@media (min-width: 768px) {
		padding: 1rem 0.8rem;

		.header > .top > .left > a {
			font-size: 0.9rem;
		}

		.header > p {
			font-size: 0.8rem;
		}

		.comment {
			font-size: 0.875rem;
			line-height: 1.4rem;
		}
	}
`;

const Reactions = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-top: 6px;
	padding-left: 10px;

	button {
		background: transparent;
		border: none;
		margin-right: 5px;
	}

	.reaction {
		display: flex;
		align-items: center;
	}

	.reaction:last-child > span {
		margin-left: 5px;
	}

	.reaction > span {
		display: flex;
		align-items: center;
		font-size: 0.75rem;
	}

	.reaction > span > span {
		margin-left: 6px;
	}

	.reaction span .MuiSvgIcon-root {
		font-size: 0.8rem;
		margin-right: 5px;
	}
`;

const ReplyForm = styled.div`
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
		color: gray;
	}

	button {
		border: none;
		background-color: transparent;
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
			color: #a5a4a4;
		}

		input {
			padding: 10px;
		}
	}
`;
