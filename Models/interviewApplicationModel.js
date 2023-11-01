const mongoose = require("mongoose");

const interviewApplicationSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },

  CV: {
    public_id: {
      type: String,
      required: [true, "Cv upload is required"],
    },
    url: {
      type: String,
      required: [true, "Cv upload is required"],
    },
  },
  message: {
    type: String,
  },
  resume: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  invite: {
    type: Boolean,
    default: false,
  },
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
  },
});

const InterviewApplication = mongoose.model(
  "InterviewApplication",
  interviewApplicationSchema
);
module.exports = InterviewApplication;
