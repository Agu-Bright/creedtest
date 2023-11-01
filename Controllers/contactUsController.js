const Contact = require("../Models/contactModel");
const catchAsync = require("../utils/catchAsync");

exports.createContact = catchAsync(async(req, res, next)=>{
    const {email, message, subject} = req.body;
    const newContact = await Contact.create({
        email,
        subject,
        message,
    })
    res.status(200).json({
        status: "success",
        data: {
            newContact
        }
    })
})
