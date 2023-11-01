const {
	comparePassword,
	PasswordChangedAfter,
} = require("../utils/passwordUtils");
const { createResetToken } = require("../utils/tokenUtils");
const { User } = require("../Models/userModel");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Email = require("../utils/Emails");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "dighewixb",
	api_key: "999648751199222",
	api_secret: "Wlq7lsmTYKxhhvrGku4PMdVjg3I",
});

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.EXPIRES_IN,
	});
};
const createAndSendToken = (user, statusCode, req, res) => {
	const token = signToken(user._id);
	res.cookie("jwt", token, {
		expires: new Date(
			Date.now() +
				Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
	});
	user.password = undefined;
	res.status(statusCode).json({
		user,
		token,
	});
};
exports.signUp = catchAsync(async (req, res, next) => {
	const uploadedImageURL = "";
	const file = req.body.photo;
	const result = file ? await cloudinary.uploader.upload(file) : "";
	const password = req.body.password;
	const passwordConfirm = req.body.passwordConfirm;
	if (password !== passwordConfirm) {
		return next(new AppError("Passwords don't match", 400));
	}
	const usernameAlreadyExists = await User.findOne({username: req.body.username})
	if(usernameAlreadyExists){
		return next(new AppError("Username already taken!", 400))
	}
	const emailAlreadyExists = await User.findOne({username: req.body.email})
	if(emailAlreadyExists){
		return next(new AppError("Email has been taken!", 400))
	}
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		photo: result && { url: result?.secure_url, public_id: result.public_id },
		bio: req.body.bio,
		username: req.body.username,
		description: req.body.description,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		occupation: req.body.occupation,
		DateOfBirth: req.body.DateOfBirth,
		state: req.body.state,
		role: "creedlancer",
		city: req.body.city,
		description: req.body.aboutMe,
		category: req.body.category,
		subcategory: req.body.subcategory,
		countryOfResidence: req.body.countryOfResidence,
	});
	const savedUser = await user.save();
	await new Email(savedUser).sendWelcome()
	createAndSendToken(savedUser, 200, req, res);
});
exports.EnterPriseSignUp = catchAsync(async (req, res, next) => {
	const uploadedImageURL = "";
	const photoFile = req.body.photo;
	const cacFile = req.body.cac;
	console.log(photoFile);
	let result;
	if (photoFile) {
		result = await cloudinary.uploader.upload(photoFile, {
			resource_type: "auto",
			folder: "Photo",
		});
	}
	let resumeResult;
	if (cacFile) {
		resumeResult = await cloudinary.uploader.upload(cacFile, {
			resource_type: "raw",
		});
	}
	console.log(result);
	const password = req.body.password;
	const passwordConfirm = req.body.passwordConfirm;
	if (password !== passwordConfirm) {
		return next(new AppError("Passwords don't match", 400));
	}
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		photo: photoFile
		? { public_id: result.public_id, url: result.secure_url }
			: "",
			bio: req.body.bio,
		role: "enterprise",
		description: req.body.description,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		occupation: req.body.occupation,
		cac_file: cacFile
			? {
					public_id: resumeResult.public_id,
					url: resumeResult.secure_url,
			  }
			: "",
		DateOfBirth: req.body.DateOfBirth,
		state: req.body.state,
		role: "creedlancer",
		city: req.body.city,
		hourlyPay: req.body.hourlyPay,
		description: req.body.aboutMe,
		category: req.body.category,
		subcategory: req.body.subcategory,
		countryOfResidence: req.body.countryOfResidence,
	});
	const savedUser = await user.save();
	// //new Email(user).sendWelcome()
	createAndSendToken(savedUser, 200, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(new AppError("Please provide your Email and Password!", 400));
	}
	const user = await User.findOne({ email }).select("+password").populate({
		path: "reviews",
		populate: { path: "createdBy" },
	});;
	if (!user || !(await comparePassword(password, user.password))) {
		return next(new AppError("Incorrect password", 400));
	}
	//await new Email(user, pin).sendLoginMail()
	createAndSendToken(user, 200, req, res);
});
exports.protect = catchAsync(async (req, res, next) => {
	const testToken = req.headers.authorization;
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	if (!token) {
		return next(
			new AppError("You are not logged in!, please login to get access", 401)
		);
	}

	const decodedToken = await promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);
	const currentUser = await User.findById(decodedToken.id);
	if (!currentUser) {
		return next(
			new AppError("The User belonging to this token does not exist!", 401)
		);
	}
	const passwordChangedAfter = async function (user, JWTTimestamp) {
		if (user.passwordChangedAt) {
			const changedTimeStamp = parseInt(
				user.passwordChangedAt.getTime() / 1000,
				10
			);
			return JWTTimestamp < changedTimeStamp;
		}
		return false;
	};
	if (!passwordChangedAfter) {
		return next(
			new AppError("recently changed password, please log in again", 401)
		);
	}

	req.user = currentUser;
	res.locals.user = currentUser;
	next();
});
// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
	if (req.cookies.jwt) {
		try {
			const decoded = await promisify(jwt.verify)(
				req.cookies.jwt,
				process.env.JWT_SECRET
			);
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return next();
			}
			if (currentUser.PasswordChangedAfter(decoded.iat)) {
				return next();
			}
			res.locals.user = currentUser;
			return next();
		} catch (err) {
			return next();
		}
	}
	next();
};

exports.updateMyPassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");
	console.log(user);
	if (!(await comparePassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError("The password you typed is incorrect.", 401));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();
	createAndSendToken(user, 201, req, res);
});

exports.updateMyEmail = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");
	if (!(await comparePassword(req.body.password, user.password))) {
		return next(new AppError("The password you typed is incorrect.", 401));
	}
	user.email = req.body.email;
	user.passwordConfirm = req.body.passwordConfirm;

	await user.save();
	createAndSendToken(user, 201, req, res);
});
exports.updateMyNumber = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");
	if (!(await comparePassword(req.body.password, user.password))) {
		return next(new AppError("The password you typed is incorrect.", 401));
	}
	user.phoneNumber = req.body.phoneNumber;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();
	createAndSendToken(user, 201, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
	res.cookie("jwt", "loggedOut", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({
		status: "success",
	});
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError("There is no user with email address.", 404));
	}

	const resetToken = user.createResetToken();
	await user.save({ validateBeforeSave: false });

	try {
		const resetURL = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;
		await new Email(user, resetURL).sendPasswordReset();

		res.status(200).json({
			status: "success",
			message: "Token sent to email!",
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		console.log(err);
		return next(
			new AppError("There was an error sending the email. Try again later!"),
			500
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) {
		return next(new AppError("Token is invalid or has expired", 400));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();
	createAndSendToken(user, 200, req, res);
});
