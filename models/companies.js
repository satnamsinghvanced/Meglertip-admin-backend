const mongoose = require("mongoose");
const slugify = require("slugify");
const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    companyImage: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    description: {
      type: String,
    },
    extractor: {
      type: [String],
    },
    brokerSites: {
      type: [String],
    },
    websiteAddress: {
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    features: { type: [String] },
  },
  { timestamps: true }
);
companySchema.pre("save", function (next) {
  if (this.isModified("companyName") || !this.slug) {
    this.slug = slugify(this.companyName, { lower: true, strict: true });
  }
  next();
});
module.exports = mongoose.model("Company", companySchema);
