const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    countyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "County",
      required: true,
    },
    slug: { type: String, required: true },
    excerpt: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isRecommended: { type: Boolean, default: false },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("cities", citySchema);
