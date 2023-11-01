const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  type: {
    type: String,
    required: true,
    enum: [
      "message",
      "like",
      "dislike",
      "comment",
      "reply",
      "award",
      "got-a-proposal",
      "interview-application",
      "job-completed",
      "interview-invite",
      "successful",
      "follow",
      "project-sumbitted",
      "project-submission-declined",
    ],
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
  },
  interviewApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InterviewApplication",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SocialPost",
  },
  updatedAt: {
    type: Date,
  },
},{timestamps: true});

module.exports = mongoose.model("Notification", notificationSchema);
