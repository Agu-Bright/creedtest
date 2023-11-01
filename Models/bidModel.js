const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  bidAmount: {
    type: String,
    // required: [true, "please, tell us the bid Amount"],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  deliveryDay: {
    type: String,
    // required: [
    //   true,
    //   "Please tell us when you will be able to deliver the product.",
    // ],
  },
  coverLetter: {
    type: String,
    // required: [true, "Please give us your cover letter"],
  },
  skills: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamps: true});
bidSchema.pre(/^find/, function (next) {
  this.where({ project: { $ne: null } });
  next();
});

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;
