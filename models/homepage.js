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
    howDoesItworks: {
      heading: { type: String },
    },
    howDoesItworksCards: [
      {
        title: { type: String },
        icon: { type: String },
        description: { type: String },
      },
    ],
    ourArticlesHeading: {
      heading: { type: String },
    },
    whyChooseMeglertipHeading: {
      heading: { type: String },
    },
    whyChooseMeglertipCards: [
      {
        title: { type: String },
        icon: { type: String },
        description: { type: String },
      },
    ],
   
    citySectionHeading: {
      title: { type: String },
      description: { type: String },
    },
    prosSection:[
      {
        title:{type:String},
        subHeading:{type:String},
        description:[{type:String}],
        image:{
        type:String
        },
        imagePosition:{type :String
        },
        buttonText:{
          type:String
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("homePage", homePageSchema);
