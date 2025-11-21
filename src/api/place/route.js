const express = require("express");
const {
  create,
  getCities,
  getCityById,
  update,
  deleteCity,
} = require("./controller");
const uploadImage = require("../../../service/multer");

const router = express.Router();

router.post("/create", uploadImage.single("image"), create);
router.get("/", getCities);
router.get("/detail/:id", getCityById);
router.put("/update/:id", uploadImage.single("image"), update);
router.delete("/delete/:id", deleteCity);

module.exports = router;
