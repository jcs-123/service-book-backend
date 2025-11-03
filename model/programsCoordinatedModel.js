const mongoose = require("mongoose");

const programsCoordinatedSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    title: String,
    category: String,
    organisedBy: String,
    fromDate: String,
    toDate: String,
    academicYear: String,
    certificate: String, // uploaded file path
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
module.exports =
  mongoose.models.ProgramsCoordinated ||
  mongoose.model("ProgramsCoordinated", programsCoordinatedSchema);
