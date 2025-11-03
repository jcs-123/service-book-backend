// model/publicationModel.js
const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
  {
    gmail: String,
    category: String,
    title: String,
    nameOfPublication: String,
    patentNo: String,
    indexing: String,
    academicYear: String,
    date: String,
    period: String,
    document: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", publicationSchema);
