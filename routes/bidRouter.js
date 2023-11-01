const express = require("express");
const bidController = require("../Controllers/bidController");
const authController = require("../Controllers/authcontroller");
const router = express.Router();

router.post(
  "/projects/:id/place-a-bid",
  authController.protect,
  bidController.BidAProject
);
router.get("/getallproposals", bidController.getAllProposals);
router.get(
  "/getMyProposals",
  authController.protect,
  bidController.getMyProposals
);
router.get(
  "/:id/get-project-proposals",
  authController.protect,
  bidController.getProjectProposals
);
router.get(
  "/get-a-proposal/:id/:postId",
  authController.protect,
  bidController.getAProposal
);
router.post(
  "/create-auto-proposals",
  authController.protect,
  bidController.createAutoProposal
);
router.patch(
  "/update-auto-proposals",
  authController.protect,
  bidController.createAutoProposal
);
router.patch(
  "/delete-auto-proposal",
  authController.protect,
  bidController.deleteAutoProposal
);

module.exports = router;
