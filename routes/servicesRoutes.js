const express = require("express");
const router = express.Router();
const servicesController = require("../Controllers/servicesController");
const authController = require("../Controllers/authcontroller");
const upload = require("../utils/imageUpload");
router.post(
  "/create-service",
  upload.array("photos", 5),
  authController.protect,
  servicesController.createService
);
router.post(
  "/create-update-service-review/:id",
  authController.protect,
  servicesController.createUpdateServiceReview
);

router.post(
  "/review-reply/:id",
  authController.protect,
  servicesController.replyMessage
);
router.post(
  "/reply-reply/:id/:revId",
  authController.protect,
  servicesController.replyReply
);

router.get("/get-all-services", servicesController.getAllServices);
// router.get(
//   "/get-all-service-reviews",
//   authController.protect,
//   servicesController.getAllServicesReview
// );
router.get(
  "/get-all-my-services",
  authController.protect,
  servicesController.getAllMyServices
);
router.get(
  "/get-service-reviews/:id",
  authController.protect,
  servicesController.getServiceReviews
);
router.get(
  "/get-reply-replies/:id",
  authController.protect,
  servicesController.getReplyReplies
);
//router.post(
//   "/:userId/:serviceId/addRating",
//   authController.protect,
//   servicesController.addRating
// );
router.get(
  "/:id/get-a-service",
  authController.protect,
  servicesController.getService
);
router.get(
  "/get-my-services",
  authController.protect,
  servicesController.getMyServices
);
router.get(
  "/get-review/:id",
  authController.protect,
  servicesController.getReview
);
router.get(
  "/get-reply/:id",
  authController.protect,
  servicesController.getReply
);
router.get(
  "/:id/likeReview",
  authController.protect,
  servicesController.reviewReaction
);
router.get(
  "/:id/likeReply",
  authController.protect,
  servicesController.replyReaction
);
router.get(
  "/services/:serviceId/visitors",
  authController.protect,
  servicesController.getVisitorsInTheLastThirtyDays
);
// router.patch(
//   "/services/:id/like",
//   authController.protect,
//   servicesController.addLikes
// );
// router.patch(
//   "/services/:id/like",
//   authController.protect,
//   servicesController.AddUnLikes
// );
router.post(
  "/reviews/:id/reply",
  authController.protect,
  servicesController.replyMessage
);
router.delete(
  "/:id/delete-a-service",
  authController.protect,
  servicesController.deleteService
);

module.exports = router;
