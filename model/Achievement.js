const mongoose = require("mongoose");
const achievementSchema = new mongoose.Schema(
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
    academicYear: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;