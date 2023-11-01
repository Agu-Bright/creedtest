const Bid = require("../Models/bidModel");
const { User } = require("../Models/userModel");
const ProjectPost = require("../Models/projectPostModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Notification = require("../Models/notificationModels");
const webSocketManager = require("../utils/websocketManager");

exports.BidAProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.user._id;

  const project = await ProjectPost.findById(projectId).populate({
    path: "proposals",
    populate: [{ path: "project" }, { path: "createdBy" }],
  });

  if (!project) {
    return next(new AppError("No Project was found with that ID", 404));
  }

  const userAlreadySubmittedBid = project.proposals.some((proposal) => {
    return proposal.createdBy._id.equals(userId);
  });

  if (userAlreadySubmittedBid) {
    return next(
      new AppError("You have already submitted a bid for this project.", 400)
    );
  }

  const newProposal = await Bid.create({
    project: project,
    bidAmount: req.body.bidAmount,
    deliveryDay: req.body.deliveryDay,
    coverLetter: req.body.coverLetter,
    createdBy: userId,
  });

  project.proposals.push(newProposal._id);
  await project.save({ validateBeforeSave: false });

  await Notification.create({
    receiver: project.createdBy,
    type: "got-a-proposal",
    sender: [req.user._id],
    title: "You have a new proposal",
    description: `for the project ${project.title}`,
    project: project._id,
  });
  const result = await Notification.find({
    $and: [{ receiver: project.createdBy }, { read: false }],
  });
  const length = result.length;
  //emit event to the receiver
  webSocketManager.emitEventToSpecificClient(
    project.createdBy.toString(),
    "new notification",
    length
  );

  res.status(200).json({
    message: "Bid Created Successfully!",
    status: "success",
  });
});

exports.getAllProposals = catchAsync(async (req, res, next) => {
  const proposals = await Bid.find().populate({
    path: "createdBy",
    select: "_id",
  });
  res.status(200).json({
    message: "Bids fetched successfully!",
    status: "success",
    length: proposals.length,
    data: {
      proposals,
    },
  });
});
exports.getMyProposals = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const proposals = await Bid.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "project",
      model: "Post",
    });
  res.status(200).json({
    status: "success",
    data: {
      proposals,
    },
  });
});

exports.getAProposal = catchAsync(async (req, res, next) => {
  const proposal = await Bid.findOne({
    createdBy: req.params.id,
    project: req.params.postId,
  }).populate("project createdBy");
  res.status(200).json({
    status: "success",
    data: {
      proposal: [proposal],
    },
  });
});

exports.getProjectProposals = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const project = await ProjectPost.findById(req.params.id).populate({
    path: "proposals",
    populate: [{ path: "project" }, { path: "createdBy" }],
  });
  // .populate("project");
  const proposals = project.proposals;
  res.status(200).json({
    status: "success",
    data: {
      proposals,
    },
  });
});
exports.createAutoProposal = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { deliveryDay, budget, letter } = req.body;

  const newAutoProposal = {
    letter,
    budget,
    days: deliveryDay,
  };

  user.autoproposal = newAutoProposal;
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.UpdateAutoProposal = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { autoproposal: req.body },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteAutoProposal = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      autoproposal: null,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
