const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Complete", "Archive", "Reject"],
      default: "Pending",
      required: true,
    },

    profit: {
      type: Number,
      default: 0,
    },

    partnerIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "CollaboratePartners",
      },
    ],

    ip: {
      type: String,
      trim: true,
    },

  dynamicFields: { type: mongoose.Schema.Types.Mixed, default: {} }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
