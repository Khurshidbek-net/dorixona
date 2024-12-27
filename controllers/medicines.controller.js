const db = require("../config/db");


const getAllMedicines = (req, res) =>{
    db.query("select * from Medicines", (error, result) =>{
        if (error) {
            console.log("Error selecting medicines: ", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }

        if(result.length == 0){
            return res.status(200).json({
                message: "No medicines yet",
            });
        }
        res.json(result);
        //res.render("main", { pharmacies: result });
    })
};


const getMedicineById = (req, res) => {
    const id = req.params.id;

    db.query(
        `SELECT * FROM Medicines WHERE id = ?`,
        [id],
        (error, result) => {
            if (error) {
                console.log("Error selecting medicine: ", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    error: "Medicine not found",
                });
            }

            const medicine = result[0];

            db.query(
                `SELECT * FROM MedicineType`,
                (error, medicineTypes) => {
                    if (error) {
                        console.log("Error selecting medicine types: ", error);
                        return res.status(500).json({
                            error: "Internal Server Error",
                        });
                    }

                    res.render("updateMedicine", {
                        medicine,
                        medicineTypes,
                    });
                }
            );
        }
    );
};


//`name` VARCHAR(255) NOT NULL,
// `manufacturer` VARCHAR(255) NOT NULL,
// `medicine_type_id` BIGINT NOT NULL,
// `price` FLOAT(53) NOT NULL,
// `expiry_date` DATE NOT NULL,
// `info` TEXT NOT NULL

const addMedicine = (req, res) =>{
    const {name, manufacturer, medicine_type_id, price, expiry_date, info, quantity} = req.body;
    const pharmacyId = req.params.id;

    db.query(`
        insert into Medicines (name, manufacturer, medicine_type_id, price, expiry_date, info) values
        (?, ?, ?, ?, ?, ?)
        `, [name, manufacturer, medicine_type_id, price, expiry_date, info], 
        (error, result) =>{
        if(error){
            console.log("Error occured while adding medicine: ", error);
            return res.status(500).json({
                error: "Internal Server Error",
            })
        }
        // res.status(201).json({
        //     message: "Medicine created successfully",
        //     medicineId: result.insertId
        // });
        const medicineId = result.insertId; 

        db.query(
            `
            INSERT INTO Stock (pharmacy_id, medicine_id, quantity) 
            VALUES (?, ?, ?)
            `,
            [pharmacyId, medicineId, quantity],
            (stockError, stockResult) => {
                if (stockError) {
                    console.log("Error while adding to stock:", stockError);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                res.redirect(`/api/pharmacies`);
            }
        );

    })
};


const getMedicinesInPharmacy = (req, res) =>{
    const pharmacyId = req.params.id;
    const name = req.params.name;
    
    db.query(`
        SELECT 
        m.id AS medicine_id, 
        m.name AS name, 
        m.manufacturer as manufacturer,
        m.price as price,
        m.expiry_date as expiry_date,
        m.info as info,
        s.quantity AS quantity
        FROM 
            stock s
        JOIN 
            medicines m ON s.medicine_id = m.id
        WHERE 
            s.pharmacy_id = ?; 
    `, [pharmacyId], (error, result) =>{
        if (error) {
            console.log("Error selecting medicines: ", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }

        if(result.length == 0){
            return res.status(200).json({
                message: "No medicines yet",
            });
        }
        // res.json(result);
        res.render("medicine", { medicines: result, name, pharmacyId });
    })
};


const getMedicineCreate = (req, res) =>{
    const pharmacyId = req.params.id;
    db.query(`
        select * from MedicineType        
    `, (error, result) =>{
        if (error) {
            console.log("Error occured: ", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        res.render("createMedicine", {medicineTypes: result, pharmacyId});
    })
};  

const updateMedicine = (req, res) => {
    const id = req.params.id; 
    const { name, manufacturer, medicine_type_id, price, expiry_date, info } = req.body;
    console.log("Updating medicine with ID:", id);

    db.query(
        `
        UPDATE Medicines 
        SET 
            name = ?, 
            manufacturer = ?, 
            medicine_type_id = ?, 
            price = ?, 
            expiry_date = ?, 
            info = ?
        WHERE id = ?
        `,
        [name, manufacturer, medicine_type_id, price, expiry_date, info, id],
        (error, result) => {
            if (error) {
                console.log("Error updating medicine:", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    error: "Medicine not found",
                });
            }

            console.log("Medicine updated successfully");
            res.redirect("/api/pharmacies"); 
        }
    );
};

const deleteMedicine = (req, res) =>{
    const id = req.params.id;

    db.query(`
        delete from Medicines where id=?
    `, [id], (error, result) =>{
        if (error) {
            console.log("Error deleting medicine:", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        res.redirect("/api/pharmacies"); 
    })
};


const getExpiredMedicinesInPharmacy = (req, res) =>{
    const {name, expiry_date} = req.body;

    db.query(`
        SELECT 
            m.name AS medicine_name, 
            m.expiry_date AS expiry_date
        FROM 
            stock s
        JOIN 
            medicines m ON s.medicine_id = m.id
        JOIN
            pharmacies p ON s.pharmacy_id = p.id
        WHERE 
            p.name = ?
            AND m.expiry_date <= ?
        `, [name, expiry_date], (error, result) =>{
        if (error) {
            console.log("Error occured:", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Expired medicines not found",
            });
        }

        res.json(result);
    })
};


const getQuantityMedicineInPharmacy = (req, res) =>{
    const{pharmacyName, medicineName} = req.body;

    db.query(`
        select 
        sum(s.quantity) AS total_quantity
        from stock s
        join medicines m ON s.medicine_id = m.id
        join pharmacies p ON s.pharmacy_id = p.id
        where 
            p.name = ?
            and m.name = ?
    `, [pharmacyName, medicineName], (error, result) =>{
        if (error) {
            console.log("Error occured:", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Given medicines not found",
            });
        }

        res.json(result);
    });
};


const findMedicineInPharmacy = (req, res) =>{
    const {medicineName} = req.body;

    db.query(`
        SELECT 
            p.name AS pharmacy_name,
            m.name AS medicine_name,
            m.price AS price,
            s.quantity AS available_quantity
        FROM 
            stock s
        JOIN 
            medicines m ON s.medicine_id = m.id
        JOIN 
            pharmacies p ON s.pharmacy_id = p.id
        WHERE 
            m.name=?
        ORDER BY 
            m.price ASC
    `, [medicineName], (error, result) =>{
        if (error) {
            console.log("Error occured:", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Medicines not found",
            });
        }
        res.json(result);
    });
}


module.exports = {
    getAllMedicines,
    addMedicine,
    getMedicinesInPharmacy,
    getMedicineCreate,
    updateMedicine,
    getMedicineById,
    deleteMedicine,
    getExpiredMedicinesInPharmacy,  //Dorixona loyihasi bo'yicha berilgan dorixona nomi va sana bo'yicha shu sanada muddati o'tib ketgan dorilarni ro'yxatini chiqarish.
    getQuantityMedicineInPharmacy,
    findMedicineInPharmacy
}