const express = require("express");
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../companies/controller");

const router = express.Router();

router.post("/create", createCompany);
router.get("/", getCompanies);
router.get("/detail", getCompanyById);
router.put("/update", updateCompany);
router.delete("/delete", deleteCompany);

module.exports = router;
