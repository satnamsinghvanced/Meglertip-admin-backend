const express = require("express")
const { getFooter, saveFooter } = require( "./controller");

const router = express.Router();

router.get("/", getFooter);     
router.post("/", saveFooter);    

module.exports = router;
