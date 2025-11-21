const mongoose = require("mongoose");

const partnersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferences: { type: String },
    address: { type: String },
    city: { type: String },
    postalCodes: [{ type: String }],
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    leads: {
      lastMonth: { type: Number, default: 0 },
      currentMonth: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CollaboratePartners", partnersSchema);
