const mongoose = require("mongoose");

const homePageSchema = new mongoose.Schema(
  {
    heroSection: {
      title: { type: String },
      subtitle: { type: String },
      backgroundImage: { type: String },
      buttonText: { type: String },
      ctaLink: { type: String },
    },
    bannerSection1: {
      heading: { type: String },
    },
    bannerSectionCards1: [
      {
        title: { type: String },
        icon: { type: String },
        description: { type: String },
      },
    ],
    bannerSection2: {
      heading: { type: String },
    },
    bannerSectionCards2: [
      {
        title: { type: String },
        icon: { type: String },
        description: { type: String },
      },
    ],
    bannerSection3: {
      heading: { type: String },
    },
    bannerSectionCards3: [
      {
        title: { type: String },
        icon: { type: String },
        description: { type: String },
      },
    ],
    bannerSection4: {
      heading: { type: String },
    },
    bannerSectionCards4: [
      {
        title: { type: String },
        image: { type: String },
        icon: { type: String },
        lists: [{ type: String }],
        buttonText: { type: String },
      },
    ],
    citySection: {
      title: { type: String },
      description: { type: String },
    },
    bannerSectionCards5: [
      {
        title: { type: String },
        description: { type: String },
        image: { type: String },
        buttonText: { type: String },
      },
    ],
    bannerSectionCards6: [
      {
        title: { type: String },
        subTitle: { type: String },
        image: { type: String },
        buttonText: { type: String },
        icon: { type: String },
        lists: [{ type: String }],
        description: { type: String },
      },
    ],
    articleSection: {
      heading: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("homePage", homePageSchema);
