const mongoose = require("mongoose")
const reportSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialPost"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reason: {
        type: String,
        required: [true, "Please give us a reason for reporting this post"]
    }
},{timestamps:true})
const Report = mongoose.model("Report", reportSchema)
module.exports = Report