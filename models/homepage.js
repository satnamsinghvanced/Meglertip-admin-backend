const mongoose = require("mongoose");

const homePageSchema = new mongoose.Schema(
  {
    heroSection: {
      title: { type: String, trim: true },
      subtitle: { type: String, trim: true },
      backgroundImage: { type: String, trim: true },
      buttonText: { type: String, trim: true },
      ctaLink: { type: String, trim: true },
    },

    howDoesItWorkHeading: {
      heading: { type: String, trim: true },
    },
    howDoesItWorkContent: {
      type: [
        {
          _id: false,
          title: { type: String, trim: true },
          icon: { type: String, trim: true },
          description: { type: String, trim: true },
        },
      ],
      default: [],
    },

    articlesHeading: {
      heading: { type: String, trim: true },
    },
    // articleContent: {
    //   type: [
    //     {
    //       _id: false,
    //       title: { type: String, trim: true },
    //       icon: { type: String, trim: true },
    //       description: { type: String, trim: true },
    //     },
    //   ],
    //   default: [],
    // },

    whyChooseMeglerTipHeading: {
      heading: { type: String, trim: true },
    },
    whyChooseMeglerTipContent: {
      type: [
        {
          _id: false,
          title: { type: String, trim: true },
          icon: { type: String, trim: true },
          description: { type: String, trim: true },
        },
      ],
      default: [],
    },

    factorsAffectingContent: {
      type: [
        {
          _id: false,
          title: { type: String, trim: true },
          image: { type: String, trim: true },
          icon: { type: String, trim: true },
          lists: [{ type: String, trim: true }],
          buttonText: { type: String, trim: true },
        },
      ],
      default: [],
    },

    salesGuide: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
    },

    realEstateAgents: {
      type: [
        {
          _id: false,
          title: { type: String, trim: true },
          description: { type: String, trim: true },
          image: { type: String, trim: true },
          buttonText: { type: String, trim: true },
        },
      ],
      default: [],
    },

    summaryOfBenefit: {
      type: [
        {
          _id: false,
          title: { type: String, trim: true },
          subTitle: { type: String, trim: true },
          lists: [{ type: String, trim: true }],
          image: { type: String, trim: true },
          buttonText: { type: String, trim: true },
          icon: { type: String, trim: true },
          description: { type: String, trim: true },
        },
      ],
      default: [],
    },

    latestInsights: {
      heading: { type: String, trim: true },
    },
    latestInsightButton: {
      buttonText: { type: String, trim: true },
      buttonColor: { type: String, trim: true },
    },

    faqHeading: {
      heading: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomePage", homePageSchema);
