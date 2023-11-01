const Service = require("../Models/servicemodel");
const catchAsync = require("../utils/catchAsync");
const { Review, RevReply } = require("../Models/revModel");
const cloudinary = require("cloudinary").v2;
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");
const webSocketManager = require("../utils/websocketManager");

exports.createService = catchAsync(async (req, res) => {
  const files = req.body.photos;
  const uploadedImageURLs = [];
  if (files.length > 0) {
    files.forEach((file, index) => {
      cloudinary.uploader.upload(
        file,
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error(error);
          } else {
            uploadedImageURLs.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }

          if (uploadedImageURLs.length === files.length) {
            const service = new Service({
              name: req.body.name,
              description: req.body.description,
              location: req.body.location,
              skills: req.body.skills,
              duration: req.body.duration,
              photos: uploadedImageURLs, // Store the uploaded image URLs
              selectDuration: req.body.selectDuration,
              methodOfPayment: req.body.methodOfPayment,
              minimumPrice: req.body.minimumPrice,
              maximumPrice: req.body.maximumPrice,
              createdBy: req.user._id,
            });

            service
              .save()
              .then((savedService) => {
                console.log("Service saved successfully");
                webSocketManager.emitEventToClients("new service", {
                  data: {
                    savedService,
                  },
                });
                res.status(200).json({
                  data: {
                    savedService,
                  },
                });
              })
              .catch((error) => {
                console.error("Error saving service:", error);
                res.status(500).json({
                  error: "Error saving service",
                });
              });
          }
        }
      );
    });
  } else {
    const service = new Service({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      skills: req.body.skills,
      duration: req.body.duration,
      photos: uploadedImageURLs, // Store the uploaded image URLs
      selectDuration: req.body.selectDuration,
      methodOfPayment: req.body.methodOfPayment,
      minimumPrice: req.body.minimumPrice,
      maximumPrice: req.body.maximumPrice,
      createdBy: req.user._id,
    });

    service
      .save()
      .then((savedService) => {
        console.log("Service saved successfully");
        webSocketManager.emitEventToClients("new service", {
          data: {
            savedService,
          },
        });
        res.status(200).json({
          data: {
            savedService,
          },
        });
      })
      .catch((error) => {
        console.error("Error saving service:", error);
        res.status(500).json({
          error: "Error saving service",
        });
      });
  }
});

exports.getAllServices = catchAsync(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
          { location: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const features = new ApiFeatures(
    Service.find(keyword).populate("createdBy").populate("reviews"),
    req.query
  )
    .paginate()
    .limitFields()
    .filter();

  const services = await features.query;
  res.status(200).json({
    status: "success",
    data: {
      services,
    },
  });
});

exports.getAllMyServices = catchAsync(async (req, res) => {
  const services = await Service.find({ createdBy: req.user._id }).populate([
    {
      path: "reviews",
      populate: {
        path: "createdBy",
      },
    },
    {
      path: "reviews",
      populate: {
        path: "replies",
        populate: {
          path: "createdBy",
        },
      },
    },
  ]);
  let allReviews = [];
  services.map((item) => {
    for (let i = 0; i < item.reviews.length; i++) {
      allReviews.push(item.reviews[i]);
    }
  });
  if (req.query.reviews) {
    return res.status(200).json({
      status: "success",
      data: {
        allReviews,
      },
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      services,
    },
  });
});
exports.getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id).populate("createdBy");
  if (!service) {
    return next(new AppError("No Document with that ID was found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});
exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError("No Document with that ID was found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
exports.getReply = catchAsync(async (req, res, next) => {
  const reply = await RevReply.findById(req.params.id);
  if (!reply) {
    return next(new AppError("No Document with that ID was found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      reply,
    },
  });
});

exports.createUpdateServiceReview = catchAsync(async (req, res, next) => {
  const { rating, review } = req.body;
  if (!rating && !review) {
    return next(new AppError("Review and Rating is required", 400));
  }
  const newReview = {
    text: review,
    service: req.params.id,
    rating: Number(rating),
    createdBy: req.user._id,
  };

  //find service
  const service = await Service.findById(req.params.id).populate("reviews");
  if (!service) {
    return next(new AppError("No service found", 404));
  }
  //check if this service have already been reviewed by this user
  const isReviewed = service.reviews.find(
    (rev) => rev.createdBy.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    //update the review
    await Review.findByIdAndUpdate(isReviewed._id, {
      text: review,
      rating: rating,
    });
  } else {
    //not reviewed, add a new review
    const review = await Review.create(newReview);
    service.reviews.push(review._id);
    service.reviews.reverse();
    service.numberOfReviews = service.reviews.length;
    service.save();
  }

  //calculate the overall rating
  const serviceReviews = await Review.find({ service: service._id });
  const avRating =
    serviceReviews.reduce((acc, item) => {
      return item.rating + acc;
    }, 0) / service.reviews.length;

  const newService = await Service.findByIdAndUpdate(service._id, {
    rating: Number(avRating),
  }).populate([
    {
      path: "reviews",
      populate: {
        path: "service",
      },
    },
    {
      path: "reviews",
      populate: {
        path: "createdBy",
      },
    },
    {
      path: "reviews",
      populate: {
        path: "replies",
        populate: {
          path: "createdBy",
        },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    newService: newService.reviews,
  });
});

exports.getServiceReviews = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id).populate([
    {
      path: "reviews",
      populate: {
        path: "service",
      },
    },
    {
      path: "reviews",
      populate: {
        path: "createdBy",
      },
    },
    {
      path: "reviews",
      populate: {
        path: "replies",
        populate: {
          path: "createdBy",
        },
      },
    },
  ]);

  const reviews = service.reviews;
  res.status(200).json({
    status: "success",
    data: {
      reviews,
      service,
    },
  });
});
exports.getReplyReplies = catchAsync(async (req, res, next) => {
  const reply = await RevReply.find({ reply: req.params.id }).populate(
    "createdBy"
  );

  res.status(200).json({
    status: "success",
    data: {
      replies: reply,
    },
  });
});

exports.deleteService = catchAsync(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return next(new AppError("No Document with that ID was found", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
exports.getMyServices = catchAsync(async (req, res) => {
  const myServices = await Service.find({ createdBy: req.user._id });
  res.status(200).json({
    status: "success",
    data: {
      myServices,
    },
  });
});
exports.getVisitorsInTheLastThirtyDays = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const thirtyDaysago = new Date();
  thirtyDaysago.setDate(thirtyDaysago.getDate() - 30);
  const visitorsCount = await Service.countDocuments({
    _id: serviceId,
    visitDate: { $gte: thirtyDaysago },
  });
  res.status(200).json({
    serviceId,
    status: "success",
    data: {
      visitorsCount,
    },
  });
});
exports.addReview = catchAsync(async (req, res) => {
  const services = await Service.findById(req.params.id);
});

exports.replyMessage = catchAsync(async (req, res, next) => {
  // if (!req.body.text || !req.body.rating) {
  //   return next(new AppError("Review and rating required"));
  // }
  const reviewid = req.params.id;
  //find the review / reply
  const review = await Review.findById(reviewid);
  if (!review) {
    return next(new AppError("Review Not found", 404));
  }
  //create a reply
  const newReply = await RevReply.create({
    text: req.body.text,
    createdBy: req.user._id,
    review: reviewid,
  });
  const reply = await RevReply.findById(newReply._id).populate("createdBy");
  //Add the reply to the parent reply array.
  review.replies.push(reply._id);
  review.replies.reverse();
  review.save({ validateBeforeSave: true });

  res.status(200).json({
    success: "Success",
    reply,
  });
});

exports.replyReply = catchAsync(async (req, res, next) => {
  const replyId = req.params.id;
  //find the review / reply
  const reply = await RevReply.findById(replyId);
  if (!reply) {
    return next(new AppError("Reply Not found", 404));
  }
  //create a reply
  const newReply = await RevReply.create({
    text: req.body.text,
    createdBy: req.user._id,
    reply: replyId,
  });
  console.log(newReply);
  const repReply = await RevReply.findById(newReply._id).populate("createdBy");
  //Add the reply to the parent reply array.
  reply.replies.unshift(reply._id);
  reply.save({ validateBeforeSave: true });

  res.status(200).json({
    success: "true",
    reply: repReply,
  });
});

// ==> /:id/likeReview?action=like
exports.reviewReaction = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id;
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError("No Review With Id found", 404));
  }

  const isliked = review.likes.find(
    (item) => item.toString() === req.user._id.toString()
  );
  const isUnliked = review.unLike.find(
    (item) => item.toString() === req.user._id.toString()
  );
  if (req.query.action === "like") {
    if (isliked) {
      const likeArray = review.likes.map((item) => item.toString());
      const newArray = likeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      review.likes = newArray;
      review.save();
      return res.status(200).json({
        status: "success",
        data: {
          likes: review.likes,
          unLikes: review.unLike,
        },
      });
    }
    if (isUnliked) {
      const unLikeArray = review.unLike.map((item) => item.toString());
      const newArray = unLikeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      review.unLike = newArray;
    }
    review.likes.unshift(req.user._id);
    review.save();
  } else if (req.query.action === "unlike") {
    if (isUnliked) {
      const unLikeArray = review.unLike.map((item) => item.toString());
      const newArray = unLikeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      review.unLike = newArray;
      review.save();
      return res.status(200).json({
        status: "success",
        data: {
          likes: review.likes,
          unLikes: review.unLike,
        },
      });
    }

    if (isliked) {
      const likeArray = review.likes.map((item) => item.toString());
      const newArray = likeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      review.likes = newArray;
    }
    review.unLike.unshift(req.user._id);
    review.save();
  }
  res.status(200).json({
    status: "success",
    data: {
      likes: review.likes,
      unLikes: review.unLike,
    },
  });
});
exports.replyReaction = catchAsync(async (req, res, next) => {
  const replyId = req.params.id;
  const reply = await RevReply.findById(replyId);
  if (!reply) {
    return next(new AppError("No Reply With Id found", 404));
  }
  const isliked = reply.likes.find(
    (item) => item.toString() === req.user._id.toString()
  );
  const isUnliked = reply.unLike.find(
    (item) => item.toString() === req.user._id.toString()
  );
  if (req.query.action === "like") {
    if (isliked) {
      const likeArray = reply.likes.map((item) => item.toString());
      const newArray = likeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      reply.likes = newArray;
      reply.save();
      return res.status(200).json({
        status: "success",
        data: {
          likes: reply.likes,
          unLikes: reply.unLike,
        },
      });
    }
    if (isUnliked) {
      const unLikeArray = reply.unLike.map((item) => item.toString());
      const newArray = unLikeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      reply.unLike = newArray;
    }
    reply.likes.unshift(req.user._id);
    reply.save();
  } else if (req.query.action === "unlike") {
    if (isUnliked) {
      const unLikeArray = reply.unLike.map((item) => item.toString());
      const newArray = unLikeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      reply.unLike = newArray;
      reply.save();
      return res.status(200).json({
        status: "success",
        data: {
          likes: reply.likes,
          unLikes: reply.unLike,
        },
      });
    }

    if (isliked) {
      const likeArray = reply.likes.map((item) => item.toString());
      const newArray = likeArray.filter(
        (item) => item !== req.user._id.toString()
      );
      reply.likes = newArray;
    }
    reply.unLike.unshift(req.user._id);
    reply.save();
  }
  res.status(200).json({
    status: "success",
    data: {
      likes: reply.likes,
      unLikes: reply.unLike,
    },
  });
});
