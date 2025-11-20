const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    companyImage: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
      email: {
      type: String,
    },
      zipCode: {
      type: String,
    },
    description: {
      type: String,
    },
    extractor:{
      type: [String],
    },
    brokerSites: {
      type: [String],
    },
    websiteAddress: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Company", companySchema);
