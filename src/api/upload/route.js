const express = require("express");
const router = express.Router();
const uploadImage = require("../../../service/multer");
const { uploadProfileImage } = require("./controller");

router.post(
  "/upload-profile",
  uploadImage.single("avatar"),
  uploadProfileImage
);
router.post(
  "/",
  uploadImage.single("image"),
  uploadProfileImage
);

module.exports = router;