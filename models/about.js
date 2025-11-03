const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, required: true },
    subHeading: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    heading1: { type: String, trim: true, required: true },
    subHeading1: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
