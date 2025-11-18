const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    primary: { type: String },
    primarylight: { type: String },
    secondary: { type: String },
    dark: { type: String },
    accent: { type: String },
    background: { type: String },
    cardbg: { type: String },
    navbarbg: { type: String },
    footerbg: { type: String },
    formsteps: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theme", themeSchema);
