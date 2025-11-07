const mongoose = require("mongoose");

const contactFieldSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    placeholder: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["text", "email", "tel", "textarea", "number"],
    },
    required: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const partnerSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    subHeading: { type: String, required: true, trim: true },
    contactFormTitle: { type: String, required: true, trim: true },
    buttonText: { type: String, trim: true },
    formText: { type: String, trim: true },
    contactFields: [contactFieldSchema],
    title: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
