const express = require("express");
const socialPostController = require("../Controllers/socialPostControlleer");
const authController = require("../Controllers/authcontroller");
const upload = require("../utils/imageUpload");
const router = express.Router();
router.post(
  "/create-a-post",
  authController.protect,
  upload.array("photos", 5),
  socialPostController.createPosts
);

router.get(
  "/get-all-posts",
  authController.protect,
  socialPostController.getAllPosts
);
router.get(
  "/get-my-posts",
  authController.protect,
  socialPostController.getMyPostSocialPosts
);
router.get(
  "/:id/get-user-posts",
  authController.protect,
  socialPostController.getUserSocialPosts
);
router.patch(
  "/:id/update-user-posts",
  authController.protect,
  upload.array("photos", 5),
  socialPostController.updateSocialPost
);
router.post(
  "/posts/:postId/add-a-comment",
  authController.protect,
  socialPostController.addComments
);
router.post(
  "/:commentId/add-a-reply",
  authController.protect,
  socialPostController.replyComment
);
// router.patch(
// 	"/:replyId/like",
// 	authController.protect,
// 	socialPostController.likeReply
// );
router.post(
  "/:replyId/reply-a-reply",
  authController.protect,
  socialPostController.replyAReply
);
router.post(
  "/posts/:postId/like",
  authController.protect,
  socialPostController.addLikes
);
router.post(
  "/posts/:postId/dislike",
  authController.protect,
  socialPostController.addDisLikes
);

router.post(
  "/posts/:postId/unlike",
  authController.protect,
  socialPostController.unlike
);
router.post(
  "/posts/:postId/undislike",
  authController.protect,
  socialPostController.unDislike
);
router.patch(
  "/comments/:commentId/like",
  authController.protect,
  socialPostController.likeComment
);
router.post(
  "/comments/:commentId/dislike",
  authController.protect,
  socialPostController.dislikeComment
);

router.post(
  "/comments/:commentId/unlike",
  authController.protect,
  socialPostController.unlikeComment
);

router.get("/post/:id", authController.protect, socialPostController.getPost);

router.delete(
  "/posts/:id/delete",
  authController.protect,
  socialPostController.deleteSocialPost
);
router.delete(
  "/comments/:id/delete",
  authController.protect,
  socialPostController.deleteComment
);
router.delete(
  "/replies/:id/delete",
  authController.protect,
  socialPostController.deleteReply
);
router.post(
  "/comments/:commentId/undislike",
  authController.protect,
  socialPostController.undislikeComment
);
router.patch(
  "/replies/:replyId/like",
  authController.protect,
  socialPostController.likeReply
);
router.post(
  "/replies/:replyId/dislike",
  authController.protect,
  socialPostController.dislikeReply
);
router.post(
  "/replies/:replyId/unlike",
  authController.protect,
  socialPostController.unlikeReply
);
router.post(
  "/replies/:replyId/undislike",
  authController.protect,
  socialPostController.undislikeReply
);

module.exports = router;
