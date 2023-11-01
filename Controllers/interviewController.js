const Interview = require("../Models/interviewModel");
const InterviewApplication = require("../Models/interviewApplicationModel");
const Notification = require("../Models/notificationModels");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;
const webSocketManager = require("../utils/websocketManager");

exports.createInterview = catchAsync(async (req, res, next) => {
  const uploadedImageURLs = [];
  const files = req.body.photos;
  if (files?.length > 0) {
    files.forEach((file, index) => {
      cloudinary.uploader.upload(file, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          uploadedImageURLs.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        if (uploadedImageURLs.length === files.length) {
          const interview = new Interview({
            jobOccupation: req.body.jobOccupation,
            title: req.body.title,
            natureOfInterview: req.body.natureOfInterview,
            numberOfVacancies: req.body.numberOfVacancies,
            category: req.body.category,
            subcategory: req.body.subcategory,
            budget: req.body.budget,
            date: req.body.date,
            location: req.body.location,
            companyDescription: req.body.companyDescription,
            jobResponsibilities: req.body.jobResponsibilities,
            jobRequirements: req.body.jobRequirements,
            photos: uploadedImageURLs,
            requiredSkills: req.body.requiredSkills,
            createdBy: req.user._id,
            location: req.body.location,
          });

          interview
            .save()
            .then((savedInterview) => {
              console.log("Interview saved successfully");

              webSocketManager.emitEventToClients("new interview", {
                data: {
                  savedInterview,
                },
              });
              res.status(200).json({
                data: {
                  savedInterview,
                },
              });
            })
            .catch((error) => {
              console.error("Error saving interview:", error);
              res.status(500).json({
                error: "Error saving interview",
              });
            });
        }
      });
    });
  } else {
    const interview = new Interview({
      jobOccupation: req.body.jobOccupation,
      title: req.body.title,
      natureOfInterview: req.body.natureOfInterview,
      numberOfVacancies: req.body.numberOfVacancies,
      budget: req.body.budget,
      category: req.body.category,
      subcategory: req.body.subcategory,
      date: req.body.date,
      location: req.body.location,
      companyDescription: req.body.companyDescription,
      jobResponsibilities: req.body.jobResponsibilities,
      jobRequirements: req.body.jobRequirements,
      photos: uploadedImageURLs,
      requiredSkills: req.body.requiredSkills,
      createdBy: req.user._id,
      location: req.body.location,
    });

    interview
      .save()
      .then((savedInterview) => {
        console.log("Interview saved successfully");
        webSocketManager.emitEventToClients("new interview", {
          data: {
            savedInterview,
          },
        });
        (async () => {
          const myInterview = await Interview.find({
            createdBy: req.user._id,
            acceptedPersons: { $size: 0 },
          });

          const interviewLength = myInterview.length;
          webSocketManager.emitEventToSpecificClient(
            req.user._id.toString(),
            "interview Length",
            { interviewLength }
          );
        })();

        res.status(200).json({
          data: {
            savedInterview,
          },
        });
      })
      .catch((error) => {
        console.error("Error saving interview:", error);
        res.status(500).json({
          error: "Error saving interview",
        });
      });
  }
});
exports.getInterviews = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(
    Interview.find().populate({
      path: "Applications",
      populate: {
        path: "createdBy",
        model: "User",
      },
    }),
    req.query
  )
    .searchTitle()
    .sort()
    .paginate()
    .limitFields()
    .filter();

  const interviews = await features.query;

  res.status(200).json({
    status: "success",
    data: {
      interviews,
    },
  });
});

exports.getAnInterview = catchAsync(async (req, res, next) => {
  const interview = await Interview.findById(req.params.id).populate(
    "createdBy"
  );
  if (!interview) {
    return next(new AppError("No Interview with that ID was found", 404));
  }
  interview.visitors += 1;
  await interview.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    data: {
      interview,
    },
  });
});

exports.getMyInterviews = catchAsync(async (req, res, next) => {
  //get my id
  const userId = req.user._id;

  //get interviews that the above id applied for
  const interviewApplication = await InterviewApplication.find({
    user: userId,
  }).populate("interview");
  if (!interviewApplication) {
    return next(
      new AppError("No Interview Application with the ID was found", 404)
    );
  }
  const interviewApplications = interviewApplication.filter(
    (item) => item.invite === true && item.interview !== null
  );
  const interviews = interviewApplications.map((item) => item.interview);
  // if(interviews[0] === null){
  // 	return res.status(200).json({
  // 		status: "success",
  // 		data: {
  // 			interviews: []
  // 		},
  // 	});
  // }
  res.status(200).json({
    status: "success",
    data: {
      interviews,
    },
  });
});
exports.inviteForAnInterview = catchAsync(async (req, res, next) => {
  //find the interview application
  const applicant = await InterviewApplication.findById(req.params.id);
  if (!applicant) {
    return next(new AppError("No Applicant with the ID was found", 404));
  }
  //find the applicant user id
  const applicantId = applicant.user;
  //find the interview id
  const InterviewId = applicant.interview;
  const interview = await Interview.findById(InterviewId);
  if (!interview) {
    return next(new AppError("No Interview with the ID was found", 404));
  }
  //check if this user is already invited/ or accepted
  for (let i = 0; i < interview.acceptedPersons.length; i++) {
    if (interview.acceptedPersons[i].toString() === applicantId.toString()) {
      return next(new AppError("Invitaion sent already", 409));
    }
  }

  if (req.query.confirm) {
    //update the interview
    interview.acceptedPersons.push(applicantId);
    interview.save({ validateBeforeSave: false });
  }
  if (!req.query.confirm) {
    await Notification.create({
      receiver: applicant.user,
      type: "interview-invite",
      title: "You have an invite",
      sender: [req.user._id],
      description: `${req.user.name} invited you for an interview`,
      interview: InterviewId,
      interviewApplication: applicant._id,
    });
    const result = await Notification.find({
      $and: [{ receiver: applicant.user }, { read: false }],
    });
    const length = result.length;
    //emit event to the receiver
    webSocketManager.emitEventToSpecificClient(
      applicant.user.toString(),
      "new notification",
      length
    );
  }

  //update the accepted persons in the interview to the applicant id
  applicant.invite = true;
  applicant.save({ validateBeforeSave: false });
  //setInvite to true
  res.status(200).json({
    status: "success",
    applicant,
    interview,
  });
});

exports.viewApplicants = catchAsync(async (req, res, next) => {
  //get my id
  const { id } = req.params;
  const userId = req.user._id;
  //get interviews that the above id applied for
  const applicants = await InterviewApplication.find({
    $and: [{ interview: id }, { invite: false }],
  }).populate("user");

  res.status(200).json({
    status: "success",
    data: {
      applicants,
    },
  });
});

exports.getpostedInterviews = catchAsync(async (req, res, next) => {
  const interviews = await Interview.find({ createdBy: req.user._id }).populate(
    "createdBy"
  );
  const proposalArray = interviews.map(
    (interview) => interview.Applications.length
  );
  function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
  const totalInterviewProposals = sumArray(proposalArray);
  res.status(200).json({
    status: "success",
    data: {
      interviews,
      NoOfApplicants: totalInterviewProposals,
    },
  });
});

exports.getAssignedInterviews = catchAsync(async (req, res, next) => {
  const interviews = await Interview.find({ createdBy: req.user._id })
    .populate("createdBy")
    .populate("acceptedPersons");
  const myAssignedInterviews = interviews.filter(
    (interview) => interview.acceptedPersons.length > 0
  );
  res.status(200).json({
    status: "success",
    data: {
      myAssignedInterviews,
    },
  });
});

exports.deleteInterview = catchAsync(async (req, res, next) => {
  const interview = await Interview.findByIdAndDelete(req.params.id);
  if (!interview) {
    return next(new AppError("No Interview find with that ID", 404));
  }
  const myInterview = await Interview.find({
    createdBy: req.user._id,
    acceptedPersons: { $size: 0 },
  });

  const interviewLength = myInterview.length;
  webSocketManager.emitEventToSpecificClient(
    req.user._id.toString(),
    "interview Length",
    { interviewLength }
  );
  res.status(200).json({
    status: "success",
    data: null,
  });
});
exports.applyForInterview = catchAsync(async (req, res, next) => {
  const interview = await Interview.findById(req.params.id);
  if (!interview) {
    return next(new AppError("No Interview with that ID was found", 404));
  }
  //check to see if this user already applied for the intervew
  const alreadyApplied = await InterviewApplication.find({
    $and: [{ user: req.user._id }, { interview: interview._id }],
  });

  if (alreadyApplied[0]) {
    return next(new AppError("You alredy applied for this interview", 400));
  }
  const cvResult = await cloudinary.uploader.upload(req.body.cv, {
    pages: "pages",
    folder: "Curriculum_vitae",
    resource_type: "auto",
  });
  const cvData = {
    public_id: cvResult.public_id,
    url: cvResult.secure_url,
  };
  let resumeResult;
  if (req.body.resume)
    resumeResult = await cloudinary.uploader.upload(req.body.resume, {
      resource_type: "auto",
    });
  const resumeData = {
    public_id: resumeResult.public_id,
    url: resumeResult.secure_url,
  };

  const newApplication = await InterviewApplication.create({
    user: req.user._id,
    name: req.body.name,
    email: req.body.email,
    resume: resumeData,
    CV: cvData,
    interview: interview._id,
    message: req.body.message,
  });

  interview.Applications.push(newApplication);
  await interview.save();

  await Notification.create({
    receiver: interview.createdBy,
    type: "interview-application",
    title: "You have a new applicant",
    description: `for the interview ${interview.title}`,
    interview: interview._id,
    sender: [req.user._id],
  });
  const result = await Notification.find({
    $and: [{ receiver: interview.createdBy }, { read: false }],
  });
  const length = result.length;
  //emit event to the receiver
  webSocketManager.emitEventToSpecificClient(
    interview.createdBy.toString(),
    "new notification",
    length
  );

  res.status(200).json({
    status: "success",
    data: {
      newApplication,
    },
  });
});

exports.getInterviewApplicant = catchAsync(async (req, res) => {
  const application = await InterviewApplication.findById(
    req.params.id
  ).populate("user");
  if (!application) {
    return next(new AppError("No Interview with that ID was found!", 404));
  }
  res.json({
    status: "success",
    data: application,
  });
});

exports.updateInterview = catchAsync(async (req, res, next) => {
  const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!interview) {
    return next(new AppError("No Document find with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      interview,
    },
  });
});
