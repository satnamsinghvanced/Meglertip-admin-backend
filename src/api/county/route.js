const express = require("express");
const {
  createCounty,
  getCounties,
  getCountyById,
  updateCounty,
  deleteCounty,
} = require("../county/controller");

const router = express.Router();


router.post("/create", createCounty);
router.get("/", getCounties);
router.get("/:id", getCountyById);
router.put("/update/:id", updateCounty);
router.delete("/delete/:id", deleteCounty);

module.exports = router;
