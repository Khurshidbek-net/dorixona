const express = require("express");
const { getAllPharmacies, addPharmacy, getPharmacyById, getPharmacyByName, updatePharmacy, deletePharmacy, getPharmaciesInDistrict, getCreatePage } = require("../controllers/pharmacies.controller");
const router = express.Router();



router.get("/", getAllPharmacies);
router.post("/", getAllPharmacies);
router.post("/add/pharmacy/:id", addPharmacy);
router.get("/add/pharmacy/:id", getCreatePage);
router.get("/region/:id", getPharmaciesInDistrict);
router.get("/:id", getPharmacyById);
router.get("/search/:name", getPharmacyByName);
router.put("/:id", updatePharmacy);
router.delete("/:id", deletePharmacy);



module.exports = router;