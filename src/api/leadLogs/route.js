const express = require("express");
const { getAllLeads,getLeadById,updateLeadStatus,updateLeadProfit,getPartnerLeadInvoiceSummary } = require("./controller");

const router = express.Router();

router.get("/all", getAllLeads);
router.get("/details/:id", getLeadById);
router.patch("/status", updateLeadStatus);
router.patch("/update-profit", updateLeadProfit);
router.get("/partner-summary", getPartnerLeadInvoiceSummary);

module.exports = router;
