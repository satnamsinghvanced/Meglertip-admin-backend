const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema(
  {
    heroSection: {
      title: { type: String },
      subtitle: { type: String },
      backgroundImage: { type: String },
      buttonText: { type: String },
      ctaLink: { type: String },
    },

    howItWorks: [
      {
        // propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
        title: { type: String },
        image: { type: String },
        price: { type: Number },
        location: { type: String },
      },
    ],

    agentsSection: {
      title: { type: String },
      agents: [
        {
          agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
          name: { type: String },
          image: { type: String },
          designation: { type: String },
          contactLink: { type: String },
        },
      ],
    },

    testimonials: [
      {
        name: { type: String },
        image: { type: String },
        review: { type: String },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],

    blogSection: {
      title: { type: String },
      blogs: [
        {
          blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
          title: { type: String },
          image: { type: String },
          shortDescription: { type: String },
        },
      ],
    },

    aboutSection: {
      heading: { type: String },
      description: { type: String },
      image: { type: String },
    },

    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Homepage", homepageSchema);
