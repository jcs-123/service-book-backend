const mongoose = require("mongoose");

const interestedSubjectSchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

const InterestedSubject = mongoose.model(
  "InterestedSubject",
  interestedSubjectSchema
);

module.exports = InterestedSubject;
