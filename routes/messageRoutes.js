const express = require("express");
const upload = require("../utils/imageUpload");
const {
  allMessages,
  sendMessage,
  sendPhoto,
  sendFile,
} = require("../Controllers/messageControllers");
const { protect } = require("../Controllers/authcontroller");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route("/upload").post(protect, sendPhoto);
router.route("/upload-file").post(protect, upload.array("files", 5), sendFile);

module.exports = router;
