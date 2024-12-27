const db = require("../config/db");


const addStock = (req, res) =>{
    const {pharmacy_id, medicine_id, quantity} = req.body;

    db.query(
        `insert into Stock (pharmacy_id, medicine_id, quantity) values
        (?, ?, ?)`,
        [pharmacy_id, medicine_id, quantity],
        (error, result) =>{
            if(error){
                console.log("Error occured while adding stock: ", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                })
            }
            res.status(201).json({
                message: "Stock created successfully",
                pharmacyId: result.insertId
            })
        }
    )
};


module.exports = {
    addStock
}