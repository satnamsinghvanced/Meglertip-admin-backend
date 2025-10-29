const express = require("express");
const {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../city/controller");

const router = express.Router();

router.post("/create", createCity);
router.get("/", getCities);
router.get("/detail", getCityById);
router.put("/update", updateCity);
router.delete("/delete", deleteCity);

module.exports = router;
