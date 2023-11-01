const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authcontroller");
const upload = require("../utils/imageUpload");
router.post("/signup", upload.single("photo"), authController.signUp);
router.post(
  "/enterprise/signup",
  // upload.single("photo"),
  upload.fields([{ name: "photo" }, { name: "cac_file" }]),
  authController.EnterPriseSignUp
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.patch(
  "/postedProject",
  authController.protect,
  userController.postedProject
);
router.post(
  "/upload-image",
  authController.protect,
  userController.uploadProfWithProgress
);
router.patch(
  "/postedInterview",
  authController.protect,
  userController.postedInterview
);
router.patch(
  "/:userId/hourlypay",
  authController.protect,
  userController.addHourlyPay
);
router.patch(
  "/:userId/education",
  authController.protect,
  userController.addEducation
);
router.patch(
  "/:userId/qualification",
  authController.protect,
  userController.addQualifications
);
router.patch(
  "/:userId/experience",
  authController.protect,
  userController.addExperiences
);
router.patch("/:userId/aboutme", userController.addToAboutMeSection);
router.patch("/addSkills", authController.protect, userController.addSkills);
router.patch(
  "/:id/deleteSkill",
  authController.protect,
  userController.deleteSkill
);
router.patch("/:userId/coverletter", userController.addCoverLetter);
router.patch("/:userId/addfile", userController.addFile);
router.patch(
  "/:userId/employmentavailability",
  userController.addEmploymentAvailability
);
router.post("/forgotPassword", authController.forgotPassword);
router.post(
  "/:userId/follow",
  authController.protect,
  userController.followUser
);
router.patch(
  "/:userId/unfollow",
  authController.protect,
  userController.unfollowUser
);
router.get(
  "/:userId/my-followers",
  authController.protect,
  userController.getMyFollowers
);
router.get(
  "/:userId/get-following",
  authController.protect,
  userController.getFollowing
);
router.patch(
  "/updateMypassword",
  authController.protect,
  authController.updateMyPassword
);
router.patch(
  "/updateProfilePhoto",
  authController.protect,
  userController.updateProfilePhoto
);
router.patch(
  "/updateCoverPhoto",
  authController.protect,
  userController.updateCoverPhoto
);
router.patch(
  "/updateMyEmail",
  authController.protect,
  authController.updateMyEmail
);
router.patch(
  "/updateMyNumber",
  authController.protect,
  authController.updateMyNumber
);
router.patch("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/update/:id", authController.protect, userController.updateUser);
// router.post("/users/:id/additional-files", userController.addFiles);
router.get("/get-users", userController.getUsers);
router.get("/get-users", authController.protect, userController.getUser);
router.get("/get-unfollowed-users/:id", userController.getUnfollowedUsers);
// router.get("/get-allusers", userController.allUsers);
router.get("/:id/get-user", authController.protect, userController.getUser);

// Chidera Please this is here for a reason 🥲🥲
router.get(
  "/:username/get-user-username",
  // authController.protect,
  userController.getUserUsername
);
router.get(
  "/:email/get-user-email",
  // authController.protect,
  userController.getUserEmail
);
router.patch(
  "/deactivate-my-account",
  authController.protect,
  userController.deactivateAccount
);
router.patch(
  "/upload-cover-photo",
  authController.protect,
  upload.single("coverPhoto"),
  userController.updateCoverPhoto
);
router.delete(
  "/delete-my-account",
  authController.protect,
  userController.deleteMyAccount
);
router.patch(
  "/:id/add-review-to-user",
  authController.protect,
  userController.addReviewsToUser
);
module.exports = router;
