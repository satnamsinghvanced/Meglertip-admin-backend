const express = require("express");
const { getDashboardStats } = require("./controller");

const router = express.Router();

router.get("/stats", getDashboardStats);

module.exports = router;
