const express = require("express");
const {
  createTheme,
  getThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
} = require("../theme/controller");

const themeRouter = express.Router();

themeRouter.post("/create", createTheme);
themeRouter.get("/", getThemes);
themeRouter.get("/details/:id", getThemeById);
themeRouter.put("/update/:id", updateTheme);
themeRouter.delete("/delete/:id", deleteTheme);

module.exports = themeRouter;
