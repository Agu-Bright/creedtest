const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for your service"],
  },
  category: {
    type: String,
    // required: [true, "Please provide a category for your service"],
  },
  subcategory: {
    type: String,
    // required: [true, "Please provide a category for your service"],
  },
  location: {
    type: String,
    required: [true, "Please provide a location for your service"],
  },
  photos: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
    required: [true, "Please provide a description for your service"],
  },
  skills: {
    type: [String],
    required: [true, "Please what skills are required for a service"],
  },
  duration: {
    type: String,
    required: [true, "Please provide a duration for the service"],
  },
  selectDuration: {
    type: String,
    enum: ["days", "weeks", "months"],
  },
  methodOfPayment: {
    type: String,
    enum: ["fixed", "hourly"],
  },
  visitDate: {
    type: Date,
    default: Date.now(),
  },
  minimumPrice: {
    type: Number,
  },
  maximumPrice: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  active: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rev",
    },
  ],
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  impressions: {
    type: Number,
    default: 0
  }
}, {timestamps: true});
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
