const express = require("express");
const contactController = require("../Controllers/contactController");
const router = express.Router()
router.post("/contactus", contactController.createContact);

module.exports = router;
