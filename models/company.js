const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("company", companySchema);
