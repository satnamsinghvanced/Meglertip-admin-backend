const express = require("express");
const { getAllLeads,getLeadById,updateLeadStatus,updateLeadProfit } = require("./controller");

const router = express.Router();

router.get("/all", getAllLeads);
router.get("/details", getLeadById);
router.patch("/status", updateLeadStatus);
router.patch("/update-profit", updateLeadProfit);


module.exports = router;
