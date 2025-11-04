const mongoose = require("mongoose");

const subjectEngagedSchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
    },
    subjects: [
      {
        academicYear: { type: String, required: true },
        batch: { type: String, default: "" },
        semester: { type: String, default: "" },
        subjectCode: { type: String, required: true },
        subjectName: { type: String, required: true },
        courseDiary: { type: String, default: "" },
        passPercentage: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubjectEngaged", subjectEngagedSchema);
