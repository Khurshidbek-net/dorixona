const db = require("../config/db");


const getDistricsInRegion = (req, res) => {
    const regionId = req.body.region_id;
    db.query(`
        SELECT * FROM District WHERE region_id = ?
    `, [regionId], (error, result) => {
        if (error) {
            console.log("Error retrieving districts: ", error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
        // res.json(result);
        res.render("main", { districts: result });
    });
}
module.exports = {
    getDistricsInRegion
}