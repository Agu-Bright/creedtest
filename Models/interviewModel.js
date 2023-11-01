const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const InterviewSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "please give a title for the interview"],
	},
	location: {
		type: String,
		required: [true, "please give a location for the interview"],
	},
	natureOfInterview: {
		type: String,
		required: [true, "please tell us how you want your interview to be."],
		enum: ["on site", "remote"],
	},
	numberOfVacancies: {
		type: String,
		required: [true, "please tell us the number of vacancies you want"],
	},
	budget: {
		type: String,
		required: [true, "please tell us your budget"],
	},
	date: {
		type: Date,
		required: [true, "please tell us the date of your interview"],
		default: Date.now(),
	},
	companyDescription: {
		type: String,
		required: [true, "please give us a little descrption about your company"],
	},
	jobResponsibilities: {
		type: Array,
		required: [true, "please give us the job responsibilities"],
	},
	jobRequirements: {
		type: Array,
		required: [true, "please give us the job requirements"],
	},
	jobOccupation: {
		type: String,
		required: [true, "please give us the job occupation"],
	},
	requiredSkills: {
		type: Array,
		required: [true, "please give us the required Skills"],
	},
	additionalFile: {
		type: String,
		default: "creed.jpg",
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	Applications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "InterviewApplication",
			unique: true,
		},
	],
	title: {
		type: String,
		required: [true, "please give a title for the interview"],
	},
	location: {
		type: String,
		required: [true, "please give a location for the interview"],
	},
	natureOfInterview: {
		type: String,
		required: [true, "please tell us how you want your interview to be."],
		enum: ["on site", "remote"],
	},
	numberOfVacancies: {
		type: String,
		required: [true, "please tell us the number of vacancies you want"],
	},
	budget: {
		type: String,
		required: [true, "please tell us your budget"],
	},
	category: {
		type: String,
		required: [true, "please tell us your category"],
	},
	subcategory: {
		type: String,
		required: [true, "please tell us your subcategory"],
	},
	date: {
		type: Date,
		required: [true, "please tell us the date of your interview"],
		default: Date.now(),
	},
	companyDescription: {
		type: String,
		required: [true, "please give us a little descrption about your company"],
	},
	jobResponsibilities: {
		type: Array,
		required: [true, "please give us the job responsibilities"],
	},
	jobRequirements: {
		type: Array,
		required: [true, "please give us the job requirements"],
	},
	jobOccupation: {
		type: String,
		required: [true, "please give us the job occupation"],
	},
	requiredSkills: {
		type: Array,
		required: [true, "please give us the required Skills"],
	},
	additionalFile: {
		type: String,
		default: "creed.jpg",
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	stringifiedTime: {
		type: String
	},
	Applications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "InterviewApplication",
		},
	],

	createdAt: {
		type: Date,
		expires: 24 * 21 * 60 * 60,
	},
	photos: [
		{
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
	],
	stringifiedTime: {
		type: String,
	},

	acceptedPersons: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	acceptedPersons: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],

	visitors: {
		type: Number,
		default: 0,
	},
});

InterviewSchema.index(
	{ createdAt: 1 },
	{ expireAfterSeconds: 21 * 24 * 60 * 60 }
);

const Interview = mongoose.model("Interview", InterviewSchema);
module.exports = Interview;
