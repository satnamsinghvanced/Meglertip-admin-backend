const express = require("express");
const router = express.Router();
const uploadImage = require("../../../service/multer");
const { uploadProfileImage } = require("./controller");

router.post(
  "/upload-profile",
  uploadImage.single("avatar"),
  uploadProfileImage
);

module.exports = router;