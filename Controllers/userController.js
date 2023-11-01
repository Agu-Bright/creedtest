const multer = require("multer");
const express = require("express");
const Notification = require("../Models/notificationModels");
const FileUpload = require("../Models/fileUploadModel");
const { Review, User } = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const correctPassword = require("../utils/passwordUtils");
const upload = require("../utils/imageUpload");
const cloudinary = require("cloudinary").v2;
const ApiFeatures = require("../utils/apiFeatures");
const webSocketManager = require("../utils/websocketManager");
const fs = require("fs");
const fsExtra = require("fs-extra");

cloudinary.config({
  cloud_name: "dighewixb",
  api_key: "999648751199222",
  api_secret: "Wlq7lsmTYKxhhvrGku4PMdVjg3I",
  cloud_name: "dighewixb",
  api_key: "999648751199222",
  api_secret: "Wlq7lsmTYKxhhvrGku4PMdVjg3I",
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User.find(), req.query)
    .searchWorker()
    .sort()
    .filter()
    .paginate()
    .limitFields();
  // .filter()
  const users = await features.query;
  // const users = await User.find(keyword)
  res.status(200).json({
    result: users.length,
    data: users,
  });
});
exports.getUnfollowedUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User.find(), req.query)
    .searchWorker()
    .sort()
    .filter()
    .paginate()
    .limitFields();
  // .filter()
  const users = await features.query;
  users.filter((item) => !item.followers.includes(req.params.id));
  // const users = await User.find(keyword)
  res.status(200).json({
    result: users.length,
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId).populate({
    path: "reviews",
    populate: "createdBy",
  });
  if (!user) {
    return next(new AppError("No User with that ID was found!", 404));
  }
  res.status(200).json({
    data: user,
    status: "success",
  });
});
exports.getUserUsername = catchAsync(async (req, res, next) => {
  const username = req.params.username;

  const user = await User.findOne({ username }).populate({
    path: "reviews",
    populate: "createdBy",
  });
  res.status(200).json({
    data: user,
    status: "success",
  });
});
exports.getUserEmail = catchAsync(async (req, res, next) => {
  const email = req.params.email;

  const user = await User.findOne({ email });
  res.status(200).json({
    data: user,
    status: "success",
  });
});
exports.addQualifications = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const qualification = req.body.value;

  const user = await User.findById(userId);
  user.qualifications.push(qualification);
  await user.save();
  res.status(200).send("Added Successfully");
});
exports.addHourlyPay = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  user.hourlyPay = req.body.value;
  await user.save();
  res.status(200).send("Publication Added Successfully");
});
exports.addPublications = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const publication = req.body.value;

  const user = await User.findById(userId);
  user.publications.push(publication);
  await user.save();
  res.status(200).send("Publication Added Successfully");
});
exports.addEducation = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const education = req.body.value;
  const user = await User.findById(userId);
  user.education.push(education);
  await user.save();
  res.status(200).send("Experience Added Successfully");
});
exports.addExperiences = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const experience = req.body.value;
  const user = await User.findById(userId);
  user.experiences.push(experience);
  await user.save();
  res.status(200).send("Experience Added Successfully");
});
exports.addFile = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  const result = await cloudinary.uploader.upload(req.body.value, {
    resource_type: "auto",
  });

  user.additionalFiles.push({
    title: req.body.title,
    size: req.body.size,
    public_id: result.public_id,
    url: result.secure_url,
  });
  await user.save();
  res.status(200).send("Experience Added Successfully");
});
exports.postedProject = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  user.postedProject = true;
  await user.save();
  res.status(200).send("Cover Letter Added Successfully");
});
exports.postedInterview = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  user.postedInterview = true;
  await user.save();
  res.status(200).send("Cover Letter Added Successfully");
});
exports.addCoverLetter = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const coverLetter = req.body.value;
  const user = await User.findById(userId);
  user.coverLetter = coverLetter;
  await user.save();
  res.status(200).send("Cover Letter Added Successfully");
});
exports.addEmploymentAvailability = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const availability = req.body.value;
  const user = await User.findById(userId);
  user.availability = availability;
  await user.save();
  res.status(200).send("Availability Added Successfully");
});
exports.addToAboutMeSection = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const aboutMe = req.body.value;

  const user = await User.findById(userId);
  user.aboutMe = aboutMe;
  await user.save();
  res.status(200).send("Added Successfully");
});
// exports.uploadUserPhoto =  upload.single("photo");
exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for updating passsword", 400));
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "email",
    "phoneNumber",
    "DateOfBirth",
    "countryOfResidence",
    "nationality",
    "NextofKin",
    "NextofKinPhoneNumber",
    "homeAddress",
    "listMe",
    "accountType",
    "allowFreelancer",
    "hidePrice"
  );
  let photo;
  //update avatar
  if (req.body.photo) {
    const user = await User.findById(req.user._id);
    if (user.photo.public_id) {
      const image_id = user?.photo?.public_id;
      await cloudinary.uploader.destroy(image_id);
    }
    const result = await cloudinary.uploader.upload(req.body.photo, {
      folder: "Photo",
      width: 300,
      crop: "scale",
    });

    photo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  let update;
  if (photo) {
    update = {
      ...filteredBody,
      photo,
    };
  } else {
    update = filteredBody;
  }
  console.log(update);
  const updatedUser = await User.findByIdAndUpdate(req.user._id, update, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
exports.followUser = catchAsync(async (req, res, next) => {
  const followerId = req.user._id;
  const user = await User.findById(req.params.userId);
  const follower = await User.findById(followerId);
  if (!user || !follower) {
    return next(new AppError("No user Found with that ID", 404));
  }
  if (user.followers.includes(followerId)) {
    res.status(400).json({ message: "Already following" });
    return;
  }
  user.followers.push(followerId);
  follower.following.push(user._id);
  await user.save({ validateBeforeSave: false });
  await follower.save({ validateBeforeSave: false });
  const followers = user.followers.length;
  const newNotification = await Notification.create({
    receiver: user._id,
    sender: [req.user._id],
    title: `${follower.name} followed you `,
    type: "follow",
    description:
      followers === 1
        ? `${follower.name} followed you`
        : followers === 2
        ? `${follower.name} and 1 other followed you`
        : `${follower.name}  and ${followers} others followed you`,
  });
  const result = await Notification.find({
    $and: [{ receiver: user._id }, { read: false }],
  });
  const length = result.length;
  //emit event to the receiver
  webSocketManager.emitEventToSpecificClient(
    user._id.toString(),
    "new notification",
    length
  );

  if (user._id !== follower._id) {
    user.notifications.push(newNotification._id);
    await user.save();
  }
  res.status(200).json({
    status: "success",
    followers: user.followers.length,
    following: user.following.length,
    data: {
      newNotification,
    },
  });
});
exports.unfollowUser = catchAsync(async (req, res, next) => {
  const followerId = req.user._id;
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError("No user found with that ID", 400));
  }
  if (!user.followers.includes(req.user._id)) {
    return next(new AppError("You are not a follower", 404));
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { followers: req.user._id } },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    message: "successfully unfollowed user!",
    followersAmount: updatedUser.followers.length,
  });
});

exports.getMyFollowers = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).populate({
    path: "followers",
    select: ["name", "occupation", "followers", "photo", "username"],
  });
  const userFollowers = user.followers;
  res.status(201).json({
    status: "success",
    message: "successfully fetched followers!",
    data: {
      userFollowers,
    },
  });
});
exports.getFollowing = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).populate({
    path: "following",
    select: ["name", "occupation", "followers", "photo", "username"],
  });
  const userFollowers = user.following;
  res.status(201).json({
    status: "success",
    message: "successfully fetched followers!",
    data: {
      userFollowers,
    },
  });
});

exports.deactivateAccount = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, {
    active: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
exports.addSkills = catchAsync(async (req, res, next) => {
  const { value, rating } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { skills: { skillName: value, rating } } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
exports.deleteSkill = catchAsync(async (req, res, next) => {
  const skillIdToDelete = req.params.skillId;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { skills: { _id: skillIdToDelete } } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
exports.deleteMyAccount = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const deletedUser = User.findByIdAndDelete(userId);
  if (!deletedUser) {
    return next(new AppError("No User was found with That ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateProfilePhoto = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("No User was found with that ID", 404));
  }
  if (user.photo.public_id) {
    const image_id = user?.photo?.public_id;
    await cloudinary.uploader.destroy(image_id);
  }
  const result = await cloudinary.uploader.upload(req.body.photo, {
    folder: "Photo",
    width: 300,
    crop: "scale",
  });

  user.photo = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      photo: user.photo,
    },
  });
});
exports.updateCoverPhoto = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("No User was found with that ID", 404));
  }
  if (user.coverPhoto.public_id) {
    const image_id = user?.photo?.public_id;
    await cloudinary.uploader.destroy(image_id);
  }
  const result = await cloudinary.uploader.upload(req.body.photo, {
    folder: "Photo",
  });

  user.coverPhoto = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      photo: user.coverPhoto,
    },
  });
});
exports.addReviewsToUser = catchAsync(async (req, res, next) => {
  const { rating, review } = req.body;
  if (!rating || !review) {
    return next(new AppError("Please fill in the required Details"));
  }
  const newReview = await Review.create({
    createdBy: req.user._id,
    content: review,
    rating: rating,
  });
  const user = await User.findById(req.params.id).populate("reviews");
  user.reviews.push(newReview._id);
  const avRating =
    user.reviews.length > 0
      ? user.reviews.reduce((acc, item) => {
          if (typeof item.rating === "number") {
            return item.rating + acc;
          } else {
            return acc;
          }
        }, 0) / user.reviews.length
      : 0;

  console.log(avRating);

  user.reviews.push(newReview._id);
  user.AverageRating = avRating;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.uploadProfWithProgress = catchAsync(async (req, res, next) => {
  webSocketManager.emitEventToSpecificClient(
    req.user._id.toString(),
    "loading",
    true
  );
  const fileId = req.files.avatar;
  console.log(fileId);
  let progress = 0;
  const totalSize = req.headers["x-total-size"]; // Retrieve total file size from request headers

  //update progress in mongodb
  await FileUpload.create({
    fileName: fileId.name,
    uploadProgress: progress,
  });

  //create file in the tepmfile folder
  fileId.mv(`${__dirname}/tempfile/${fileId.name}`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  const user = await User.findById(req.user._id);
  if (user.photo.public_id) {
    const image_id = user?.photo?.public_id;
    await cloudinary.uploader.destroy(image_id);
  }

  const result = await cloudinary.uploader.upload(
    `./Controllers/tempfile/${fileId.name}`,
    {
      folder: "Photo",
      width: 300,
      crop: "scale",
    }
  );

  photo = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { photo },
    {
      new: true,
      runValidators: false,
    }
  );
  webSocketManager.emitEventToSpecificClient(
    req.user._id.toString(),
    "loading",
    false
  );
  fs.createReadStream(`./Controllers/tempfile/${fileId.name}`)
    .on("data", (chunk) => {
      //calculate the progress based on the size of chunk uploaded
      // progress += Math.round((chunk.length / fileId.size) * 100);
      progress += chunk.length;
      const percentComplete = (progress / totalSize) * 100;
      //update the progress in mongodb
      FileUpload.findOneAndUpdate(
        { fileName: chunk },
        { uploadProgress: progress }
      ).exec();

      //send progress update to connected websocket client
      webSocketManager.emitEventToSpecificClient(
        req.user._id.toString(),
        "upload progress",
        percentComplete
      );
    })
    .on("end", async () => {
      res.status(200).json({
        status: "success",
        data: {
          updatedUser,
        },
      });
      //clean up the tempfile
      fsExtra.emptyDirSync("./Controllers/tempfile");
      await FileUpload.deleteMany();
    });
});
