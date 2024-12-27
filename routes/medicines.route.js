const express = require("express");
const { getAllMedicines, addMedicine, getMedicinesInPharmacy, getMedicineCreate, getMedicineById, updateMedicine, deleteMedicine, getExpiredMedicinesInPharmacy, getQuantityMedicineInPharmacy, findMedicineInPharmacy } = require("../controllers/medicines.controller");

const router = express.Router();

router.get("/", getAllMedicines);
router.post("/add/medicine/:id", addMedicine);
router.get("/expired", getExpiredMedicinesInPharmacy);
router.get("/getQuantity", getQuantityMedicineInPharmacy);
router.get("/findMedicineInPharmacy", findMedicineInPharmacy);
router.get("/:id", getMedicineById);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);
router.get("/add/medicine/:id", getMedicineCreate);
router.get("/:id/medicines/:name", getMedicinesInPharmacy);


module.exports = router;
