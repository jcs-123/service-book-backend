const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    title: String,
    academicYear: String,
    certificate: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Interactions ||
  mongoose.model("Interactions", interactionSchema);
