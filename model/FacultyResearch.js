const mongoose = require("mongoose");


const facultyResearchSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isCollaborative: {
      type: String, // "Yes" or "No"
      trim: true,
    },
    collaborator: {
      type: String,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true,
      trim: true,
    },
    isFunded: {
      type: String, // "Yes" or "No"
      trim: true,
    },
    status: {
      type: String, // "Ongoing" or "Completed"
      trim: true,
    },
    fundAmount: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);


const FacultyResearch = mongoose.model("FacultyResearch", facultyResearchSchema);
module.exports = FacultyResearch;