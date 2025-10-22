const express = require("express")

const adminRoutes = require('./admin/route');

const router = express.Router()
router.use('/admin', adminRoutes);

module.exports = router;