const mongoose = require("mongoose");

const articleCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    originalSlug: { type: String, required: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("articleCategory", articleCategorySchema);
