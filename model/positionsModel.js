const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    position: String,
    academicYear: String,
    period: String,
    startDate: String,
    endDate: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.PositionsHeld ||
  mongoose.model("PositionsHeld", positionSchema);
