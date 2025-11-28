const mongoose = require("mongoose");

const partnersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferences: { type: String },
    address: { type: String },
    city: { type: String },
    postalCodes: {
      exact: [
        {
          code: { type: String }, 
        },
      ],

      ranges: [
        {
          from: { type: String,  }, 
          to: { type: String,  }, 
        },
      ],
    },
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    leads: {
      lastMonth: { type: Number, default: 0 },
      currentMonth: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    leadType:{
      type: String
    },

    wishes: [
      {
        question: { type: String  },
        expectedAnswer: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CollaboratePartners", partnersSchema);
