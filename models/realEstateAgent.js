const mongoose = require("mongoose");

const realEstateAgentSchema = new mongoose.Schema(   {
    title: {
      type: String,
      required: true,   
    },
    description: {
      type: String, 
      required: true,
    },
     descriptionBottom: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("RealEstateAgent", realEstateAgentSchema);