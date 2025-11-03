const mongoose = require("mongoose");

const researchInterestSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResearchInterest", researchInterestSchema);
