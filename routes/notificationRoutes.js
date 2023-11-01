const express = require("express");
const authController = require("../Controllers/authcontroller");
const notificationController = require("../Controllers/notificationController");

const router = express.Router();

router.post(
  "/create-notification",
  authController.protect,
  notificationController.createNotification
);
router.get(
  "/get-My-notifications",
  authController.protect,
  notificationController.getMyNotifications
);

router.patch(
  "/read-notifications/:id",
  authController.protect,
  notificationController.readNotifications
);
router.delete(
  "/delete-notifications/:id",
  authController.protect,
  notificationController.deleteNotifications
);

module.exports = router;
