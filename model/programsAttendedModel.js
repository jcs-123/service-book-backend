const mongoose = require("mongoose");

const programsAttendedSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    category: String,
    subCategory: String,
    title: String,
    period: String,
    fundingAgency: String,
    organisedBy: String,
    fromDate: String,
    toDate: String,
    certificate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProgramsAttended", programsAttendedSchema);
