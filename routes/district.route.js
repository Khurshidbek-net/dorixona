const express = require("express");
const { getDistricsInRegion } = require("../controllers/district.controller");

const router = express.Router();


router.post("/district_in/region", getDistricsInRegion);

module.exports = router;