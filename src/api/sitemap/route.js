const express = require("express");
const router = express.Router();
const {
  getSitemap,
  createSitemap,
  updateSitemap,
} = require("./controller");

router.get("/", getSitemap);

router.post("/", createSitemap);

router.put("/", updateSitemap);

module.exports = router;