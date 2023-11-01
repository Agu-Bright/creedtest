const { SocialPost, Comment, Reply } = require("../Models/socialPosts");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const upload = require("../utils/imageUpload");
const cloudinary = require("cloudinary").v2;
const Notification = require("../Models/notificationModels");
const { User } = require("../Models/userModel");
const moment = require("moment");

const webSocketManager = require("../utils/websocketManager");

cloudinary.config({
  cloud_name: "dighewixb",
  api_key: "999648751199222",
  api_secret: "Wlq7lsmTYKxhhvrGku4PMdVjg3I",
});

exports.createPosts = async (req, res, next) => {
  const files = req.files;
  // console.log(files)

  // if (!req.body.description) {
  //   return next(new AppError("Please Include a caption for your post", 400));
  // }
  try {
    const uploadedImageURLs = [];

    if (files && files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: "Photo",
          });
          uploadedImageURLs.push({
            public_id: result.public_id,
            url: result.secure_url,
            type:file.type
          });
        })
      );
    }

    const post = await SocialPost.create({
      publicity: req.body.publicity,
      content: req.body.content,
      location: req.body.location,
      description: req.body.description,
      photos: uploadedImageURLs,
      createdBy: req.user._id,
    });

    post.createdAt = new Date();
    post.stringifiedTime = moment(post.createdAt).fromNow();

    const savedPost = await (await post.save()).populate("createdBy");

    webSocketManager.emitEventToClients("new post", {
      data: {
        savedPost,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        savedPost,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addComments = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  // console.log(user)
  const { postId } = req.params;
  const post = await SocialPost.findById(postId);
  if (!post) {
    return next(new AppError("No Post was found with That ID", 404));
  }
  const newComment = await Comment.create({
    createdBy: req.user._id,
    content: req.body.content,
    post: postId,
  });
  post.comments.push(newComment);
  await post.save();
  const commentOwnerId = newComment._id;
  const postOwnerId = post.createdBy;
  const postOwner = await User.findById(postOwnerId);

  if (postOwner._id.toString() !== user._id.toString()) {
    const NotificationAlreadyExist = await Notification.findOne({
      type: "comment",
      post: postId,
      receiver: postOwnerId,
    });
    console.log(NotificationAlreadyExist);
    if (NotificationAlreadyExist) {
      NotificationAlreadyExist.updatedAt = new Date();
      NotificationAlreadyExist.title = `${user.name} commented on your post.`;
      NotificationAlreadyExist.sender.push(req.user._id);
      NotificationAlreadyExist.description =
        post.comments.length === 1
          ? `${user.name} commented on your post.`
          : `${user.name} and ${
              post.comments.length - 1
            } others commented on your post.`;
      NotificationAlreadyExist.read = false;
      await NotificationAlreadyExist.save();
      console.log("Notification Already Exists:", NotificationAlreadyExist);
    } else {
      const newNotification = await Notification.create({
        sender: [req.user._id],
        receiver: postOwnerId,
        title: `${user.name} commented on your post.`,
        type: "comment",
        read: false,
        description: newComment.content,
        post: postId,
      });
      postOwner.notifications.push(newNotification._id);
      await postOwner.save({ validateBeforeSave: false });
      console.log(newNotification);
    }
    const result = await Notification.find({
      $and: [{ receiver: post.createdBy }, { read: false }],
    });
    const length = result.length;
    //emit event to the receiver
    webSocketManager.emitEventToSpecificClient(
      post.createdBy.toString(),
      "new notification",
      length
    );
  }

  webSocketManager.emitEventToClients("new post comment", {
    length: post.comments.length,
    data: { newComment },
  });

  res.status(200).json({
    status: "success",
    data: { newComment },
  });
});

//  const result = await Notification.find({
//    $and: [{ receiver: updatedPost.createdBy }, { read: false }],
//  });
//  const length = result.length;
//  //emit event to the receiver
//  webSocketManager.emitEventToSpecificClient(
//    updatedPost.createdBy,
//    "new notification",
//    length
//  );
exports.likeComment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new AppError("No Comment was found with that ID", 404));
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  );

  const commentLikes = updatedComment.likes.length;
  const commentOwner = await User.findById(updatedComment.createdBy);

  if (commentOwner._id.toString() !== user._id.toString()) {
    const newNotification = await Notification.create({
      receiver: commentOwner,
      title: `${user.name} liked your comment`,
      type: "like",
      description:
        commentLikes === 1
          ? `${user.name} liked your comment`
          : `${user.name} and ${commentLikes - 1} others liked your comment`,
    });
    commentOwner.notifications.push(newNotification._id);
    await commentOwner.save();
    const result = await Notification.find({
      $and: [{ receiver: updatedComment.createdBy }, { read: false }],
    });
    const length = result.length;
    //emit event to the receiver
    webSocketManager.emitEventToSpecificClient(
      updatedComment.createdBy.toString(),
      "new notification",
      length
    );
  }
  webSocketManager.emitEventToClients("new comment like", {
    length: updatedPost.likes.length,
    data: {
      updatedComment,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedComment,
    },
  });
});

exports.unlikeComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  );
  webSocketManager.emitEventToClients("new unlike comment", {
    length: updatedPost.likes.length,
    data: {
      comment,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});
exports.dislikeComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new AppError("No Comment was found with That ID", 404));
  }
  comment.dislikes.push(req.user._id);
  await comment.save();
  webSocketManager.emitEventToClients("new dis like comment", {
    length: updatedPost.likes.length,
    data: {
      comment,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});
exports.undislikeComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { $pull: { dislikes: req.user._id } },
    { new: true, runValidators: true }
  );
  webSocketManager.emitEventToClients("new undislike comment", {
    length: updatedPost.likes.length,
    data: {
      comment,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});
exports.likeReply = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { replyId } = req.params;
  const reply = await Reply.findById(replyId);
  if (!reply) {
    return next(new AppError("No Reply was found with That ID", 404));
  }
  const updatedReply = await Reply.findByIdAndUpdate(
    replyId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  );
  const replyOwner = reply.createdBy;

  if (replyOwner._id.toString() !== user._id.toString()) {
    const newNotification = await Notification.create({
      sender: [req.user._id],
      receiver: replyOwner,
      title: `${user.name} liked your reply`,
      type: "like",
      description:
        reply.likes.length === 1
          ? `${user.name} liked your reply`
          : `${user.name} and ${
              reply.likes?.length - 1
            } others liked your reply`,
    });
    console.log(newNotification);
    replyOwner.notifications.push(newNotification._id);
    await commentOwner.save();
    const result = await Notification.find({
      $and: [{ receiver: replyOwner }, { read: false }],
    });
    const length = result.length;
    //emit event to the receiver
    webSocketManager.emitEventToSpecificClient(
      replyOwner.toString(),
      "new notification",
      length
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      reply,
    },
  });
});
exports.unlikeReply = catchAsync(async (req, res, next) => {
  const { replyId } = req.params;
  const reply = await Reply.findByIdAndUpdate(
    replyId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      reply,
    },
  });
});
exports.dislikeReply = catchAsync(async (req, res, next) => {
  const { replyId } = req.params;
  const reply = await Reply.findById(replyId);
  if (!reply) {
    return next(new AppError("No Reply was found with That ID", 404));
  }
  reply.dislikes.push(req.user._id);
  await reply.save();
  res.status(200).json({
    status: "success",
    data: {
      reply,
    },
  });
});
exports.undislikeReply = catchAsync(async (req, res, next) => {
  const { replyId } = req.params;
  const reply = await Reply.findByIdAndUpdate(
    replyId,
    { $pull: { dislikes: req.user._id } },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      reply,
    },
  });
});
exports.replyAReply = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const reply = await Reply.findById(req.params.replyId);
  if (!reply) {
    return next(new AppError("No Reply was found with That ID", 404));
  }
  const newReply = await Reply.create({
    content: req.body.content,
    createdBy: req.user._id,
    reply: req.params.replyId,
  });
  reply.replies.push(newReply);
  await reply.save();
  const replyOwner = await User.findById(reply.createdBy);
  if (user._id.toString() !== replyOwner.toString()) {
    const newNotification = await Notification.create({
      type: "reply",
      receiver: replyOwner,
      title: `${user.name} sent a reply`,
      description: newReply.content,
    });
    // const newNotification = await Notification.create({
    //   type: "reply",
    //   receiver: replyOwner,
    //   title: `${user.name} sent a reply`,
    //   description: newReply.content,
    // });
    replyOwner.notifications.push(newNotification._id);
    await replyOwner.save();
    const result = await Notification.find({
      $and: [{ receiver: reply.createdBy }, { read: false }],
    });
    const length = result.length;
    //emit event to the receiver
    webSocketManager.emitEventToSpecificClient(
      reply.createdBy.toString(),
      "new notification",
      length
    );
    // const result = await Notification.find({
    //   $and: [{ receiver: reply.createdBy }, { read: false }],
    // });
    // const length = result.length;
    // //emit event to the receiver
    // webSocketManager.emitEventToSpecificClient(
    //   reply.createdBy.toString(),
    //   "new notification",
    //   length
    // );
  }
  res.status(200).json({
    status: "success",
    data: { newReply },
  });
});
exports.replyComment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const comment = await Comment.findById(req.params.commentId);
  const index = req.body.index;
  if (!comment) {
    return next(new AppError("No Comment was found with That ID", 404));
  }
  const newReply = await Reply.create({
    content: req.body.content,
    createdBy: req.user._id,
    comment: req.params.commentId,
  });
  if (index > -1) {
    console.log(index);
    comment.replies.splice(index + 1, 0, newReply);
  } else {
    comment.replies.push(newReply);
  }
  await comment.save();
  const commentOwner = await User.findById(comment.createdBy);
  const newNotification = await Notification.create({
    receiver: comment.createdBy,
    title: `${user.name} replied your comment `,
    type: "reply",
    description: newReply.content,
  });
  if (commentOwner._id.toString() !== user._id.toString()) {
    console.log(newNotification);
    commentOwner.notifications.push(newNotification._id);
    await commentOwner.save({ validateBeforeSave: false });
  }
  res.status(200).json({
    status: "success",
    data: { newReply },
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    SocialPost.find()
      .populate("createdBy")
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          model: "Reply",
        },
      }),
    req.query
  )
    .searchTitle()
    .sort()
    .paginate()
    .limitFields()
    .filter();
  const posts = await features.query;
  res.status(200).json({
    status: "success",
    message: "social posts fetched succesfully",
    data: {
      posts,
    },
  });
});
exports.getPost = catchAsync(async (req, res, next) => {
  const post = await SocialPost.findById(req.params.id)
    .populate("createdBy")
    .populate({
      path: "comments",
      populate: {
        path: "replies",
        model: "Reply",
      },
    });

  res.status(200).json({
    status: "success",
    message: "social post fetched succesfully",
    data: {
      post,
    },
  });
});

exports.addLikes = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(req.user._id);
  const { postId } = req.params;
  const updatedPost = await SocialPost.findByIdAndUpdate(
    postId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  );

  const likes = updatedPost.likes;

  const postOwnerId = updatedPost.createdBy;
  const postOwner = await User.findById(postOwnerId);
  //check to see if a notification for this post have been created
  if (req.user._id.toString() !== postOwnerId.toString()) {
    const NotificationAlreadyExist = await Notification.findOne({
      post: postId,
    });

    console.log(NotificationAlreadyExist);
    if (NotificationAlreadyExist) {
      console.log("notificaion already exist");
      NotificationAlreadyExist.updatedAt = new Date();
      NotificationAlreadyExist.title = `${user.name} liked your post.`;
      NotificationAlreadyExist.sender.push(req.user._id);
      NotificationAlreadyExist.description =
        updatedPost.likes.length === 1
          ? `${user.name} liked your post.`
          : `${user.name} and ${updatedPost.likes.length} others liked your post.`;
      NotificationAlreadyExist.read = false;
      await NotificationAlreadyExist.save();
    } else {
      console.log("creating new notification");
      const newNotification = await Notification.create({
        sender: [req.user._id],
        receiver: postOwnerId,
        title:
          updatedPost.likes.length === 1
            ? `${user.name} liked your post.`
            : `${user.name} and ${updatedPost.likes.length} other liked your post.`,
        type: "like",
        read: false,
        post: postId,
        description: `${user.name} liked your post.`,
      });
      postOwner.notifications.push(newNotification._id);
      await postOwner.save({ validateBeforeSave: false });
    }
    const result = await Notification.find({
      $and: [{ receiver: postOwnerId }, { read: false }],
    });
    const length = result.length;
    //emit event to the receiver
    webSocketManager.emitEventToSpecificClient(
      postOwnerId.toString(),
      "new notification",
      length
    );
  }

  // if (user._id !== postOwnerId && newNotification) {
  //   postOwner.notifications.push(newNotification._id);
  //   await postOwner.save();
  // }
  webSocketManager.emitEventToClients("new social post like", {
    length: updatedPost.likes.length,
    data: {
      updatedPost,
    },
  });
  res.status(200).json({
    status: "success",
    length: updatedPost.likes.length,
    data: {
      updatedPost,
    },
  });
});

exports.unlike = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const post = await SocialPost.findByIdAndUpdate(
    postId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  );
  const posts = await SocialPost.find().sort({ createdAt: -1 });
  // main.io.emit("remove-like", posts);
  webSocketManager.emitEventToClients("new unlike social post", {
    length: post.likes.length,
    data: {
      post,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
exports.addDisLikes = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { postId } = req.params;
  const post = await SocialPost.findById(postId);
  post.dislikes.push(userId);
  await post.save();

  webSocketManager.emitEventToClients("new dislike social post", {
    length: post.dislikes.length,
  });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
exports.unDislike = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const post = await SocialPost.findByIdAndUpdate(
    postId,
    { $pull: { dislikes: req.user._id } },
    { new: true, runValidators: true }
  );
  webSocketManager.emitEventToClients("new undislike social post", {
    data: {
      post,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
exports.deletePost = catchAsync(async (req, res, next) => {
  const doc = await SocialPost.findByIdAndDelete(req.user._id);
  if (!doc) {
    return next(new AppError("No Post with that ID was found", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
exports.getMyPostSocialPosts = catchAsync(async (req, res, next) => {
  const myPosts = await SocialPost.find({ createdBy: req.user._id })
    .populate("createdBy")
    .populate({
      path: "comments",
      populate: {
        path: "replies", // Assuming you have a field named "replies" in your Comment schema
        model: "Reply", // Replace with the actual model name for replies
      },
    });
  res.status(200).json({
    status: "success",
    data: {
      myPosts,
    },
  });
});
exports.getUserSocialPosts = catchAsync(async (req, res, next) => {
  const userPosts = await SocialPost.find({ createdBy: req.params.id })
    .populate("createdBy")
    .populate({
      path: "comments",
      populate: {
        path: "replies", // Assuming you have a field named "replies" in your Comment schema
        model: "Reply", // Replace with the actual model name for replies
      },
    });
  res.status(200).json({
    status: "success",
    data: {
      userPosts,
    },
  });
});
exports.updateSocialPost = catchAsync(async (req, res, next) => {
  const { description, photos } = req.body;
  const currentSocialPost = await SocialPost.findById(req.params.id);
  const data = {
    description: description || currentSocialPost.description,
    photos: photos || currentSocialPost.photos,
  };
  if (req.body.photos && req.body.photos.length > 0) {
    for (const image of currentSocialPost.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }
    const newImages = await Promise.all(
      req.body.images.map(async (imageData) => {
        const newImage = await cloudinary.uploader.upload(imageData, {
          folder: "posts",
          width: 1200,
          crop: "scale",
        });
        return {
          public_id: newImage.public_id,
          url: newImage.secure_url,
        };
      })
    );

    data.images = newImages;
  }
  const postUpdate = await SocialPost.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  console.log(postUpdate.photos);
  res.status(200).json({
    success: true,
    postUpdate,
  });
});
exports.deleteSocialPost = catchAsync(async (req, res, next) => {
  const socialPost = await SocialPost.findByIdAndDelete(req.params.id);
  if (!socialPost) {
    return next(new AppError("No social post with that ID was founnd"));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
    return next(new AppError("No Reply with that ID was founnd"));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
exports.deleteReply = catchAsync(async (req, res, next) => {
  const reply = await Reply.findByIdAndDelete(req.params.id);
  if (!reply) {
    return next(new AppError("No Reply with that ID was founnd"));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
