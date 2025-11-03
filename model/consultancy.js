const mongoose = require("mongoose");


const ConsultancySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    organisedBy: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    isFunded: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },
    fundAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


const Consultancy = mongoose.model("Consultancy", ConsultancySchema);
module.exports = Consultancy;