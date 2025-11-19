const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    countyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "County",
      required: true,
    },
    slug: { type: String, required: true },
    excerpt: { type: String },
    title: { type: String },
    description: { type: String },
    isRecommended: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
    companiesId:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Company",
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Places", placeSchema);
