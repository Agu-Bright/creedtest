const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  occupation: {
    type: String,
    required: [true, "please select your Occupation"],
  },
  title: {
    type: String,
    required: [true, "please name your project"],
  },
  description: {
    type: String,
    //required: [true, "please tell us about your project"]
  },
  category: {
    type: String,
    required: [true, "please tell us your category"],
  },
  subcategory: {
    type: String,
    required: [true, "please tell us your subcategory"],
  },
  photos: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  skills: {
    type: Array,
    required: [true, "please tell us your skills"],
  },
  payType: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobType: {
    type: String,
    enum: ["onsite", "hybrid", "remote"],
  },
  jobLocation: {
    type: String,
  },
  budget: {
    type: String,
  },
  stringifiedTime: {
    type: String,
  },
  bidding: {
    type: String,
    enum: ["private", "public"],
  },
  proposals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
  createdAt: {
    type: Date,
    expires: 21 * 24 * 60 * 60,
  },
  acceptedPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  visitors: { type: Number, default: 0 },
  expirationDate: {
    type: Date,
    required: true,
  },
},{timestamps: true});
postSchema.index({ createdAt: 1 }, { expireAfterSeconds: 21 * 24 * 60 * 60 });
postSchema.pre(/^find/, function (next) {
  this.find({ completed: { $ne: true } });
  next();
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
