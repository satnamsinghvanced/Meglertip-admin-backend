const express = require("express");
const {
  createPartner,
  getPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
  questionForPartner,
  getAnwserOptionsForQuestion,
  setPartnerLimit
} = require("./controller");

const router = express.Router();

router.post("/create", createPartner);
router.get("/", getPartners);
router.get("/details", getPartnerById);
router.put("/update", updatePartner);
router.delete("/delete", deletePartner);
router.get("/questions", questionForPartner);
router.get("/answer", getAnwserOptionsForQuestion);
router.put("/limit",setPartnerLimit )

module.exports = router;
