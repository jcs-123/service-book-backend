const mongoose = require("mongoose");

const seminarsGuidedSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    category: String,
    title: String,
    programme: String,
    batch: String,
    studentName: String,
    rollNo: String,
    academicYear: String,
    certificate: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.SeminarsGuided ||
  mongoose.model("SeminarsGuided", seminarsGuidedSchema);
