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
router.get("/detail/:id", getCompanyById);
router.put("/update/:id", updateCompany);
router.delete("/delete", deleteCompany);

module.exports = router;
