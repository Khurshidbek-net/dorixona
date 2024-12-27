const db = require("../config/db");

const getAllPharmacies = (req, res) =>{
    const regionId = req.body.region_id;
    
    db.query(`
        SELECT * FROM District WHERE region_id = ?
    `, [regionId], (error, results) => {
        if (error) {
            console.log("Error retrieving districts: ", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        
        db.query("select * from Pharmacies", (error, result) =>{
            if (error) {
                console.log("Error selecting pharmacies: ", error);
                return res.status(500).json({
                    error: "Internal Server Error",
                });
            }
            if(result.length == 0){
                return res.status(200).json({
                    message: "No pharmacies yet",
                });
            }
            res.render("main", { pharmacies: result, districts: results });
        });
    });
};



const addPharmacy = (req, res) => {
    const { name, address, phone, email } = req.body;
    const district_id = req.params.id;
    db.query(`
        SELECT region_id FROM District WHERE id=?
    `, [district_id], (error, result) => {
        if (error) {
            console.log("Error occurred", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }

        const region_id = result[0].region_id;
        db.query(
            `INSERT INTO Pharmacies (name, address, phone, email, region_id, district_id) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [name, address, phone, email, region_id, district_id],
            (error, result) => {
                if (error) {
                    console.log("Error occurred while adding a new pharmacy: ", error);
                    return res.status(500).json({
                        error: "Internal Server Error",
                    });
                }
                res.redirect("/");
            }
        );
    });
};




const getCreatePage = (req, res) =>{
    const id = req.params.id;
    res.render("createPharmacy", {id});
}





const getPharmacyById = (req, res) =>{
    const id = req.params.id;

    db.query(`
        select * from Pharmacies where id=?    
    `,[id], (error, result) =>{
        if(error){
            console.log("Error selecting pharmacy by Id: ", error);
            return res.status(500).json({
                message: "Error selecting a pharmacy",
                error: "Internal Server Error",
            });
        }

        if(result.length == 0){
            return res.status(404).json({
                message: "Pharmacy not found"
            })
        }

        res.json(result[0])
    })
};

const getPharmacyByName = (req, res) =>{
    const name = req.params.name;

    db.query(
        `
            select * from Pharmacies where name like '${name}'
        `,[name], (error, result) =>{
            if(error){
                console.log("Error retreving pharmacy by name: ", error);
                return res.status(500).json({
                    message: "Error finding a pharmacy",
                    error: "Internal Server Error",
                });
            }

            if(result.length == 0){
                return res.status(404).json({
                    message: "Customer not found"
                })
            }
            res.json(result);
        }
    )

}

const updatePharmacy = (req, res) =>{
    const id = req.params.id;
    const {name, address, phone, email} = req.body;

    db.query(
        `
            update Pharmacies set name=?, address=?, phone=?, email=? where id=?`, 
        [name, address, phone, email, id],
        (error, result) =>{
            if(error){
                console.log("Error retreiving pharmacy by Id: ", error);
                return res.status(500).json({
                    message: "Error updating pharmacy",
                    error: "Internal Server Error",
                });
            }

            res.json({
                message: "Updated successfully",
                flowerId: id
            });
        }
    )
};

const deletePharmacy = (req, res) =>{
    const id = req.params.id;

    db.query(`
        delete * from Pharmacies where id=?    
    `,[id], (error, result) =>{
        if (error) {
            console.log("Error deleting pharmacy by Id: ", error);
            return res.status(500).json({
                message: "Error retreiving a pharmacy",
                error: "Internal Server Error",
            });
        }   
        res.json({
            message: "Pharmacy deleted successfully",
        });
    })
};



const getPharmaciesInDistrict = (req, res) => {
    const districtId = req.params.id;

    db.query(`
        SELECT * FROM Pharmacies WHERE district_id = ?
    `, [districtId], (error, result) => { 
        if (error) {
            console.log("Error selecting pharmacies: ", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        // if (result.length == 0) {
        //     return res.status(200).json({
        //         message: "No pharmacies yet",
        //     });
        // }
        res.render("pharmaciesInRegions", { pharmacies: result, districtId });
    });
};


module.exports = {
    getAllPharmacies,
    addPharmacy,
    getPharmacyById,
    getPharmacyByName,
    updatePharmacy,
    deletePharmacy,
    getPharmaciesInDistrict,
    getCreatePage
}