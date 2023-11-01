const mongoose = require("mongoose");

const mainReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text required"],
  },
  rating: {
    type: Number,
    required: [true, "rating required"],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, "service id required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
  unLike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "revReply",
    },
  ],
},{timestamps: true});
const Review = mongoose.model("rev", mainReviewSchema);

const replyRevSchema = new mongoose.Schema({
  text: { type: String, required: [true, "Text required"] },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  unLike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rev",
  },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "revReply",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "revReply",
    },
  ],
});
const RevReply = mongoose.model("revReply", replyRevSchema);
module.exports = { RevReply, Review };
