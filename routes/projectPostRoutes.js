const authController = require("../Controllers/authcontroller");
const postController = require("../Controllers/projectPostController");
const express = require("express");
const upload = require("../utils/imageUpload");

// const catchAsync = require("../utils/catchAsync")
// const AppError = require("../utils/appError")
const router = express.Router();
router.post(
  "/createProject",
  upload.array("photos", 5),
  authController.protect,
  // authController.isLoggedIn,
  postController.createProject
);
router.get(
  "/get-posted-projects",
  authController.protect,
  postController.postedProjects
);
router.get(
  "/get-assigned-projects",
  authController.protect,
  postController.getAssignedProjects
);
router.get("/get-all-posts", postController.getAllProjects);
router.patch(
  "/:id/completed-project",
  authController.protect,
  postController.CompletedProject
);
router.patch(
  "/:id/submit-project",
  authController.protect,
  postController.submitProject
);
router.get(
  "/get-a-post/:id",
  authController.protect,
  postController.getProject
);
router.post(
  "/:id/:bidsId/award-project",
  authController.protect,
  postController.awardProject
);
router.get("/get-my-jobs", authController.protect, postController.getMyJobs);
router.patch(
  "/:id/update-Project",
  authController.protect,
  authController.protect,
  postController.updateProject
);
router.delete(
  "/:id/delete-Project",
  authController.protect,
  authController.protect,
  postController.deleteProject
);

module.exports = router;
