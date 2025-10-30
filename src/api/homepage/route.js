const express = require("express");
const {
  createHomepage,
  createSection,
  getSection,
  updateSection,
  deleteSection,
} = require("../homepage/controllers");

const uploadImage = require("../../../service/multer");
const router = express.Router();

router.post("/", createHomepage);

router.post("/:homepageId/:section", uploadImage.any(), createSection);

router.get("/:homepageId/:section", getSection);

router.put("/:homepageId/:section", uploadImage.any(), updateSection);

router.delete("/:homepageId/:section", deleteSection);

module.exports = router;
