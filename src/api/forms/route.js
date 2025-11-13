const express = require("express");
const router = express.Router();
const controller = require("./controller")

router.post("/", controller.createForm); 


router.put("/update", controller.updateForm); 


router.get("/", controller.getFormById); 

router.get("/details", controller.getForm) 

module.exports = router;
