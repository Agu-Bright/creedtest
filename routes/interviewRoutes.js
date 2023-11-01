const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authcontroller");
const upload = require("../utils/imageUpload");
const interviewController = require("../Controllers/interviewController");
router.post(
  "/createInterview",
  upload.array("photos", 5),
  authController.protect,
  interviewController.createInterview
);
router.post(
  "/:id/apply-for-interview",
  upload.fields([
    { name: "CV", maxCount: 1 },
    { name: "Resume", maxCount: 1 },
  ]),
  authController.protect,
  interviewController.applyForInterview
);
router.get("/getInterviews", interviewController.getInterviews);
router.get(
  "/:id/view-applicants",
  authController.protect,
  interviewController.viewApplicants
);
router.get(
  "/get-my-Interview",
  authController.protect,
  interviewController.getMyInterviews
);
router.get(
  "/get-posted-interviews",
  authController.protect,
  interviewController.getpostedInterviews
);
router.get(
  "/get-interview/:id",
  authController.protect,
  interviewController.getAnInterview
);
router.get(
  "/get-interview-application/:id",
  authController.protect,
  interviewController.getInterviewApplicant
);
router.get(
  "/get-assigned-interviews",
  authController.protect,
  interviewController.getAssignedInterviews
);

router.patch(
  "/:id/update-interview",
  authController.protect,
  interviewController.updateInterview
);
router.get(
  "/:id/invite-an-applicant",
  authController.protect,
  interviewController.inviteForAnInterview
);
router.delete(
  "/:id/deleteInterview",
  authController.protect,
  interviewController.deleteInterview
);

module.exports = router;
