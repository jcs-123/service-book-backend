const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true, // Helps fast lookup by email
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    discipline: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
      type: String,
      required: true,
      trim: true,
    },
    percentage: {
      type: String,
      trim: true,
    },
    registrationYear: {
      type: String,
      trim: true,
    },
    passingYear: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
    certificate: {
      type: String, // path or filename of uploaded file
    },
  },
  {
    timestamps: true, // automatically adds createdAt / updatedAt
  }
);

// Optional index for performance
qualificationSchema.index({ email: 1, degree: 1 });

const Qualification = mongoose.model("Qualification", qualificationSchema);
module.exports = Qualification;