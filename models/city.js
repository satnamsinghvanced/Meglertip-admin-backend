const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("city", citySchema);
