const express = require("express");
const { getAllLeads } = require("./controller");

const router = express.Router();

router.get("/all", getAllLeads);

module.exports = router;
