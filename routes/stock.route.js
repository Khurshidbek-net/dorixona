const express = require("express");
const { addStock } = require("../controllers/stock.controller");
const router = express.Router();


router.post("/", addStock);


module.exports = router;