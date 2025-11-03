const mongoose = require("mongoose");

const patentSchema = new mongoose.Schema(
  {
    gmail: { type: String, required: true },
    patentNo: { type: String, required: true },
    inventors: String,
    year: String,
    status: String,
    sort: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patent", patentSchema);
