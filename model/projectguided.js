const mongoose = require("mongoose");

const projectGuidedSchema = new mongoose.Schema(
  {
    email: {
      type: String,
   
    },
    name: {
      type: String,
    
    },
    academicYear: {
      type: String,
     
    },
    isFunded: {
      type: String,
 
    },
    fundedAgency: {
      type: String,
      trim: true,
    },
    coInvestigator: {
      type: String,
 
    },
    level: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProjectGuided = mongoose.model("ProjectGuided", projectGuidedSchema);
module.exports = ProjectGuided;
