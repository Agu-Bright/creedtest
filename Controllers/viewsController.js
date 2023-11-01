const catchAsync = require("../utils/catchAsync");

exports.welcomeController = catchAsync(async(req, res, next)=>{
    try {
        res.render("welcome")
    } catch (error) {
        console.error(error)
    }
})