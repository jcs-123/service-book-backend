// models/ActivityLog.js
const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
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
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    cost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);



const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
module.exports = ActivityLog;