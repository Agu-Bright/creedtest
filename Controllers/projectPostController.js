const ProjectPost = require("../Models/projectPostModel");
const Post = require("../Models/projectPostModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const ApiFeatures = require("../utils/apiFeatures");
const Bid = require("../Models/bidModel");
const { User } = require("../Models/userModel");
const multer = require("multer");
const webSocketManager = require("../utils/websocketManager");
const moment = require("moment");
const Notification = require("../Models/notificationModels");
exports.createProject = catchAsync(async (req, res, next) => {
  const files = req.body.files;
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 27);
  const expirationDate = currentDate.getTime();
  let newProject;
  let uploadedImageURLs = [];
  if (files?.length > 0 && files) {
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file, {
        folder: "Photo",
        resource_type: "auto",
      });
      uploadedImageURLs.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }
  if (uploadedImageURLs.length === files?.length && files) {
    newProject = await ProjectPost.create({
      occupation: req.body.occupation,
      title: req.body.title,
      description: req.body.description,
      skills: req.body.skills,
      payType: req.body.payType,
      jobType: req.body.jobType,
      jobLocation: req.body.jobLocation,
      photos: uploadedImageURLs,
      budget: req.body.budget,
      category: req.body.category,
      subcategory: req.body.subcategory,
      bidding: req.body.bidding,
      createdBy: req.user._id,
      expirationDate,
      category: req.body.category,
    });
  } else {
    newProject = await ProjectPost.create({
      occupation: req.body.occupation,
      title: req.body.title,
      description: req.body.description,
      skills: req.body.skills,
      payType: req.body.payType,
      jobType: req.body.jobType,
      jobLocation: req.body.jobLocation,
      budget: req.body.budget,
      category: req.body.category,
      subcategory: req.body.subcategory,
      bidding: req.body.bidding,
      createdBy: req.user._id,
      expirationDate,
      category: req.body.category,
    });
  }
  console.log(newProject.category);
  const matchingUsers = await User.find({
    category: {
      //   $type: "string",
      $eq: newProject.category,
      $ne: "",
    },
  });

  for (const user of matchingUsers) {
    if (user.autoproposal && user.autoproposal._id) {
      newProject.proposals.push(user.autoproposal._id);
    }
  }
  newProject.createdAt = new Date();
  newProject.stringifiedTime = moment(newProject.createdAt).fromNow();

  await newProject.save();
  webSocketManager.emitEventToClients("new project", {
    data: {
      newProject,
    },
  });

  const myProjects = await ProjectPost.find({
    createdBy: req.user._id,
    acceptedPerson: { $exists: false },
  });
  const length = myProjects.length;

  webSocketManager.emitEventToSpecificClient(
    req.user._id.toString(),
    "project length",
    { length }
  );
  res.status(200).json({
    status: "success",
    data: {
      newProject,
    },
  });
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    ProjectPost.find()
      .sort({ createdAt: -1 })
      .populate("proposals")
      .populate("createdBy"),
    req.query
  )
    .searchTitle()
    .paginate()
    .limitFields()
    .filter();
  const rawPost = await features.query;
  const posts = rawPost.reverse();
  res.status(200).json({
    status: "success",
    length: posts.length,
    data: {
      posts,
    },
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const post = await ProjectPost.findById(req.params.id).populate("proposals");
  if (!post) {
    return next(new AppError("No Post with that ID was found!", 404));
  }
  post.visitors += 1;
  await post.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await ProjectPost.findByIdAndDelete(req.params.id);
  await Bid.deleteMany({ project: req.params.id });
  if (!project) {
    return next(new AppError("No Project found with that ID", 404));
  }
  const myProjects = await ProjectPost.find({
    createdBy: req.user._id,
    acceptedPerson: { $exists: false },
  });
  const projectLength = myProjects.length;
  webSocketManager.emitEventToSpecificClient(
    req.user._id.toString(),
    "project length",
    { projectLength }
  );
  res.status(200).json({
    status: "success",
    data: null,
  });
});
exports.getMyJobs = catchAsync(async (req, res, next) => {
  const posts = await ProjectPost.find({ acceptedPerson: req.user._id });
  res.status(200).json({
    status: "success",
    data: { posts },
  });
});

exports.postedProjects = catchAsync(async (req, res, next) => {
  const allPostedProjects = await ProjectPost.find({
    createdBy: req.user._id,
  }).populate("createdBy");
  //get all posted proects that have not been assigned

  const projects = allPostedProjects.filter(
    (project) => !project.acceptedPerson
  );
  const proposalArray = projects.map((project) => project.proposals.length);
  function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
  const totalprojectsProposals = sumArray(proposalArray);

  res.status(200).json({
    status: "success",
    data: {
      projects,
      totalProject: totalprojectsProposals,
    },
  });
});

exports.awardProject = catchAsync(async (req, res, next) => {
  const bidId = req.params.bidsId;

  try {
    const project = await ProjectPost.findById(req.params.id).populate({
      path: "proposals",
      populate: {
        path: "createdBy",
        model: "User",
      },
    });

    if (!project) {
      return next(new AppError("No project with that ID was found!", 404));
    }
    let acceptedPerson = null;
    for (const proposal of project.proposals) {
      if (proposal._id.toString() === bidId) {
        acceptedPerson = proposal.createdBy._id;
        break; // If you found the matching bid, you can exit the loop early.
      }
    }

    if (!acceptedPerson) {
      return next(new AppError("No proposal with that ID was found!", 404));
    }

    project.acceptedPerson = acceptedPerson;
    await project.save();

    const myProjects = await ProjectPost.find({
      createdBy: req.user._id,
      acceptedPerson: { $exists: true },
    });
    const length = myProjects.length;
    console.log(length);
    webSocketManager.emitEventToSpecificClient(
      req.user._id.toString(),
      "award project length",
      { length }
    );

    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (err) {
    return next(
      new AppError("Something went wrong while awarding the project.", 500)
    );
  }
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await ProjectPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return next(new AppError("No Document find with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: project,
    },
  });
});

// write for getting assigned project

exports.getAssignedProjects = catchAsync(async (req, res, next) => {
  const posts = await ProjectPost.find({ createdBy: req.user._id })
    .populate("acceptedPerson")
    .populate("createdBy");
  const assignedPosts = posts.filter((post) => post.acceptedPerson);

  res.status(200).json({
    status: "success",
    data: { assignedPosts },
  });
});
exports.CompletedProject = catchAsync(async (req, res, next) => {
  const project = await ProjectPost.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});
exports.CompletedProject = catchAsync(async (req, res, next) => {
  const project = await Post.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true, runValidators: true }
  );
  await Notification.create({
    receiver: project.acceptedPerson,
    sender: [req.user._id],
    type: "job-completed",
    title: "Job Completed",
    description: `${project.title} completed`,
    project: project._id,
  });
  const result = await Notification.find({
    $and: [{ receiver: project.acceptedPerson }, { read: false }],
  });
  const length = result.length;
  //emit event to the receiver
  webSocketManager.emitEventToSpecificClient(
    project.acceptedPerson.toString(),
    "new notification",
    length
  );
  await ProjectPost.findByIdAndDelete(req.params.id);
  await Bid.deleteMany({ project: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.submitProject = catchAsync(async (req, res, next) => {
  const project = await ProjectPost.findByIdAndUpdate(
    req.params.id,
    { submitted: req.query.decline ? false : true },
    { new: true, runValidators: true }
  );
  const worker = await ProjectPost.findOne({
    $and: [{ acceptedPerson: project.acceptedPerson }, { _id: project._id }],
  }).populate("acceptedPerson");

  if (!worker) {
    return next(new AppError("No worker with the id was found", 404));
  }
  if (!req.query.decline) {
    await Notification.create({
      receiver: project.createdBy,
      sender: [req.user._id],
      type: "project-sumbitted",
      title: "Project Submitted",
      description: `${worker.acceptedPerson.name} have submitted a project`,
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
    // webSocketManager.emitEventToSpecificClient(
    //   req.user.toString(),
    //   "job submitted",
    //   project
    // );
  } else if (req.query.decline) {
    console.log("creating notification");
    await Notification.create({
      receiver: worker.acceptedPerson._id,
      sender: [req.user._id],
      type: "project-submission-declined",
      title: "Project Submition Declined",
      description: `Submission for the project ${project.title} was declined`,
      project: worker._id,
    });
    const result = await Notification.find({
      $and: [{ receiver: worker.acceptedPerson._id }, { read: false }],
    });
    const length = result.length;
    //emit event to the receiver
    webSocketManager.emitEventToSpecificClient(
      worker.acceptedPerson._id.toString(),
      "new notification",
      length
    );
  }

  res.status(200).json({
    status: "success",

    data: {
      project,
    },
  });
});
