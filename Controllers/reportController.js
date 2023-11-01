const Report = require("../Models/reportModel");
const SocialPost = require("../Models/socialPosts");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.CreateReport = catchAsync(async(req, res, next)=>{
    const postId = req.params.postId
    const post = await SocialPost.findById(postId)
    if(!post){
        return next(new AppError("We could not find the post you were looking for"));
    }
    const report = await Report.create({
        post: post,
        user: req.user._id,
        reason: req.body.reason,
    })
    res.status(201).json({
      status: "success",
      message: "Report Created Successfully",
      data: {
        report
      }
    });
})
exports.getReports = catchAsync(async(req, res, next)=>{
    const reports = await Report.find().populate()
    res.status(201).json({
        status: "success",
        data:{
            reports
        }
    })
})