const express = require("express");
const getAllRegions = require("../controllers/region.controller");

const router = express.Router();


router.get("/", getAllRegions);


module.exports = router;