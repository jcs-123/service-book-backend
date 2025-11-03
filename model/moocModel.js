const mongoose = require("mongoose");

const moocSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    title: { type: String, required: true },
    conductedBy: String,
    fromDate: String,
    toDate: String,
    duration: String,
    sort: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mooc", moocSchema);
