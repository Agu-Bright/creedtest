const express = require("express");
const authController = require("../Controllers/authcontroller");
const reportController = require("../Controllers/reportController");
const router = express.Router()
router.post("/posts/:postId/report", authController.protect, reportController.CreateReport);
router.get("/reports",reportController.getReports);



module.exports= router