const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Email = require("../utils/Emails");
const userReviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Text required"],
  },
  rating: {
    type: Number,
    required: [true, "rating required"],
  },
  reviewTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {timestamps: true});
const Review = mongoose.model("userRev", userReviewSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    select: true,
  },
  hourlyPay: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please Tell us your username"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required!"],
    minlength: 8,
  },
  skills: [
    {
      skillName: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
    },
  ],
  photo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  coverPhoto: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  role: {
    type: String,
  },
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    required: [true, "please insert your phone Number!"],
  },
  DateOfBirth: {
    type: String,
    // required: [true, "please insert your birth month!"],
  },
  occupation: {
    type: String,
    required: [true, "please tell us your occupation!"],
  },
  NextofKin: {
    type: String,
  },
  NextofKinPhoneNumber: {
    type: String,
  },
  state: {
    type: String,
    // required: [true, "please tell us your state!"],
  },
  city: {
    type: String,
    // required: [true, "please tell us your city!"],
  },
  countryOfResidence: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  homeAddress: {
    type: String,
  },
  nationality: {
    type: String,
  },
  images: [String],
  publications: {
    type: [String],
  },
  education: {
    type: [String],
  },
  experiences: {
    type: [String],
  },
  qualifications: {
    type: [String],
  },
  aboutMe: {
    type: [String],
  },
  description: {
    type: [String],
  },
  availability: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
  accountType: {
    type: String,
    enum: ["work", "hire"],
    default: "work",
  },
  listMe: {
    type: Boolean,
    default: false,
  },
  allowFreelancer: {
    type: Boolean,
    default: false,
  },
  hidePrice: {
    type: Boolean,
    default: false,
  },
  AverageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    set: (val) => Math.round(val * 10) / 10,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  postedProject: {
    type: Boolean,
    default: false,
  },
  postedInterview: {
    type: Boolean,
    default: false,
  },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRev",
    },
  ],
  online: {
    type: Boolean,
    default: false,
  },
  autoproposal: {
    type: {},
    default: null,
  },
  cac_file: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  additionalFiles: [],

  date_of_business_creation: {
    type: String,
  },
  businessLocation: {
    type: String,
  },
  business_description: {
    type: String,
  },
  charge_per_hour: {
    type: Number,
  },
  services_offered: {
    type: String,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
}, {timestamps: true});
userSchema.index({ username: 1, email: 1 });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 16);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = { Review, User };
