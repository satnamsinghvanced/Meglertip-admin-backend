const express = require("express");
const {
  createHomepage,
  createSection,
  getSection,
  updateSection,
  deleteSection,
} = require("../homepage/controllers");

const router = express.Router();

router.post("/",createHomepage);
router.post("/:homepageId/:section", createSection);
router.get("/:homepageId/:section", getSection);
router.put("/:homepageId/:section", updateSection);
router.delete("/:homepageId/:section", deleteSection);

module.exports = router;
