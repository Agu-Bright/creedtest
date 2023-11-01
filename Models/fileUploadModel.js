const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
  },
  uploadProgress: {
    type: String,
  },
});
const FileUpload = mongoose.model("FileUpload", fileUploadSchema);
module.exports = FileUpload;
