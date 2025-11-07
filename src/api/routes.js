const express = require("express");

const adminRoutes = require("./admin/route");
const imageUpload = require("./upload/route");
const faqRoutes = require("./faq/route");
const categoryRoutes = require("./category/route");
const cityRotes = require("./city/route");
const companiesRoutes = require("./companies/route");
const homepageRoutes = require("./homepage/route");
const articleCategoryRoutes = require("./articleCategory/route");
const articleRoutes = require("./article/route");
const aboutRoutes = require("./about/route");
const partnerRoutes = require("./partner/route");

const router = express.Router();
router.use("/admin", adminRoutes);
router.use("/image", imageUpload);
router.use("/faq", faqRoutes);
router.use("/category", categoryRoutes);
router.use("/companies", companiesRoutes);
router.use("/cities", cityRotes);
router.use("/homepage", homepageRoutes);
router.use("/article-categories", articleCategoryRoutes);
router.use("/article", articleRoutes);
router.use("/about", aboutRoutes);
router.use("/partner", partnerRoutes);

module.exports = router;
