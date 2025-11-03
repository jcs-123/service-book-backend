const mongoose = require("mongoose");

const administrativeWorkSchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    nameOfWork: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

const AdministrativeWork = mongoose.model("AdministrativeWork", administrativeWorkSchema);
module.exports = AdministrativeWork;
