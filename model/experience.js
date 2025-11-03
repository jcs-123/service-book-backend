const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true, // to fetch user-specific data fast
    },
    title: {
      type: String,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    fromDate: {
      type: String,
      trim: true,
    },
    toDate: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    employmentNature: {
      type: String,
      trim: true,
    },
    dutyNature: {
      type: String,
      trim: true,
    },
    certificate: {
      type: String, // stores uploaded file name
    },
  },
  { timestamps: true }
);


const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;