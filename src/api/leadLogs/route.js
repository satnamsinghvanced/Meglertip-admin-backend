const express = require("express");
const { getAllLeads,getLeadById,updateLeadStatus,updateLeadProfit, getPartnerLeadInvoiceSummary } = require("./controller");

const router = express.Router();

router.get("/all", getAllLeads);
router.get("/details/:id", getLeadById);
router.get("/partner-summary", getPartnerLeadInvoiceSummary);
router.patch("/status", updateLeadStatus);
router.patch("/update-profit", updateLeadProfit);


module.exports = router;
