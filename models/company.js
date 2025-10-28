const mongoose = require("mongoose")
const companySchema = new mongoose.Schema(
  {

  },
  { timestamps: true }
);
module.exports = mongoose.model("company", companySchema);
