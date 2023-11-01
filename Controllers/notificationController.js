const Notification = require("../Models/notificationModels");
const { User } = require("../Models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const webSocketManager = require("../utils/websocketManager");

exports.createNotification = catchAsync(async (req, res, next) => {
  const { receiver, type, title, description } = req.body;
  if (!title || !type) {
    return next(new AppError("can't create this notification", 400));
  }
  //create notification based on type
  let newNotification;
  if (type === "award" || "got-a-proposal") {
    newNotification = await Notification.create({
      receiver: receiver,
      sender: [req.user._id],
      type: type,
      title: title,
      description: description,
      project: req.body.project,
    });
  } else if (type === "interview-application") {
    console.log(type);

    newNotification = await Notification.create({
      receiver: receiver,
      sender: [req.user._id],
      type: type,
      title: title,
      description: description,
      interview: req.body.interview,
    });
  } else if (type === "interview-invite") {
    console.log(type);
    newNotification = await Notification.create({
      receiver: receiver,
      sender: [req.user._id],
      type: type,
      title: title,
      description: description,
      interview: req.body.interview,
      interviewApplication: req.body.application,
    });
  } else {
    newNotification = await Notification.create({
      receiver: receiver,
      sender: [req.user._id],
      type: type,
      title: title,
      description: description,
    });
  }

  const result = await Notification.find({
    $and: [{ receiver: receiver }, { read: false }],
  });
  const length = result.length;
  //emit event to the receiver
  webSocketManager.emitEventToSpecificClient(
    receiver,
    "new notification",
    length
  );

  // socket.emit("new notification", length);
  const notification = await Notification.populate(newNotification, "sender");
  res.status(200).json({
    status: "success",
    data: {
      notification,
    },
  });
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("notifications");
  const notifications = user.notifications;
  res.status(200).json({
    status: "success",
    data: {
      notifications,
    },
  });
});

exports.getMyNotifications = catchAsync(async (req, res, next) => {
  const notification = await Notification.find({
    receiver: req.user._id,
  })
    .populate("sender project")
    .populate({
      path: "project",
      populate: {
        path: "proposals",
      },
    });
  const myNotification = notification.reverse();
  res.status(200).json({
    status: "success",
    data: {
      myNotification,
    },
  });
});

exports.readNotifications = catchAsync(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new AppError("No Notification with that ID was found!", 404));
  }
  notification.read = true;
  await notification.save();
  res.status(200).json({
    notification,
  });
});
exports.deleteNotifications = catchAsync(async (req, res, next) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  if (!notification) {
    return next(new AppError("No Notification with that ID was found!", 404));
  }
  res.status(200).json({
    data: null,
  });
});
