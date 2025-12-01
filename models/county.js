const mongoose = require("mongoose");

const countySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("County", countySchema);
