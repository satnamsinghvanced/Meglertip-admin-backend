const mongoose = require("mongoose")
const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"category",

    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("faq", faqSchema);
