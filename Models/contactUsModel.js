const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please tell us your email"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email required"]
  },
  message: {
    type: String,
    required: [true, "Please tell us the message of the mail"],
  },
  subject: {
    type: String,
    required: [true, "Please Write a subject"],
  },
 
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact