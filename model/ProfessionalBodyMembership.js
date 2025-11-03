const mongoose = require("mongoose");

const professionalBodySchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    bodyName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    memberId: {
      type: String,
      trim: true,
    },
    memberSince: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const ProfessionalBodyMembership = mongoose.model("ProfessionalBodyMembership", professionalBodySchema);
module.exports = ProfessionalBodyMembership;
