const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please tell us your email"],
  },
  message: {
    type: String,
    required: [true, "Please tell us the message of the mail"],
  },
  subject: {
    type: String,
    required: [true, "Please Write a subject"],
  },
 createdBy:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
}
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact