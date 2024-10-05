const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please prive the title"],
    },

    description: {
      type: String,
      required: [true, "Please provide description."],
    },

    category: {
      type: String,
    },

    country: {
      type: String,
      required: [true, "Please provide country name"],
    },
    city: {
      type: String,
      required: [true, "Please provide city name"],
    },
    location: {
      type: String,
      required: [true, "Please provide location name"],
    },

    fixedSalary: {
      type: Number,
    },
    salaryFrom: {
      type: Number,
    },
    salaryTo: {
      type: Number,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    jobPostedOn: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;
