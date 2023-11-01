const moment = require("moment");
const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
	content: { type: String, required: true },
	comment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment",
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	replies: [
		{
			type: String,
		},
	],
	
}, {timestamps: true});
const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;

const commentSchema = new mongoose.Schema({
	content: String,
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SocialPost",
	},
	replies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Reply",
		},
	],
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
},{timestamps: true});
const Comment = mongoose.model("Comment", commentSchema);
const socialPostSchema = new mongoose.Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	publicity: {
		type: String,
		enum: ["Anyone"],
	},
	description: {
		type: String,
	},
	photos: [
		{
			public_id: {
				type: String,
			},
			url: {
				type: String,	
			},
			type: {
				type: String,	
			},
		},
	],
	video: {
		type: String,
	},
	location: {
		type: String,
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	stringifiedTime: {
		type: String,
	},
},{timestamps: true});
// socialPostSchema.pre("save", function (next) {
// 	const postTime = this.createdAt;
// 	this.stringifiedTime = moment(postTime).fromNow();
// 	next();
// });
const SocialPost = mongoose.model("SocialPost", socialPostSchema);
module.exports = { SocialPost, Comment, Reply };
