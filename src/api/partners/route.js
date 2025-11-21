const express = require("express");
const {
  createPartner,
  getPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} = require("./controller");

const router = express.Router();

router.post("/create", createPartner);
router.get("/", getPartners);
router.get("/details", getPartnerById);
router.put("/update", updatePartner);
router.delete("/delete", deletePartner);

module.exports = router;
