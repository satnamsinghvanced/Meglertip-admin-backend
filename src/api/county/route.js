const express = require("express");
const {
  createCounty,
  getCounties,
  getCountyById,
  updateCounty,
  deleteCounty,
  getCountiesForPlace
} = require("../county/controller");

const router = express.Router();


router.post("/create", createCounty);
router.get("/", getCounties);
router.get("/detail/:id", getCountyById);
router.get("/counties-for-place", getCountiesForPlace);
router.put("/update/:id", updateCounty);
router.delete("/delete/:id", deleteCounty);

module.exports = router;
