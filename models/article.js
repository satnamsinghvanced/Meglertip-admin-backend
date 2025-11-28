const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    articlePosition: { type: Number },
    slug: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    excerpt: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "articleCategory",
      required: false,
    },
    showDate: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split("T")[0],
    },
    articleTags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
