const express = require("express");
const router = express.Router();



const pharmaciesRoute = require("./pharmacies.route");
const medicinesRoute = require("./medicines.route");
const stockRoute = require("./stock.route");


router.use("/pharmacies", pharmaciesRoute);
router.use("/medicines", medicinesRoute);
router.use("/stock", stockRoute);


module.exports = router;