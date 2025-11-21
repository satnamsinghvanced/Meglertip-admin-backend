const mongoose = require("mongoose");

const articleCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    categoryPosition: { type: String, unique: true, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("articleCategory", articleCategorySchema);
