const Sale = require("../models/sale");

exports.getSales = (req, res, next) => {
    Sale.fetchAll().then((rows, fieldData) => {
        res.status(200).json(rows[0]);
    })
}

exports.getSaleByID = (req, res, next) => {
    let id = req.params.id;
    Sale.findByID(id).then((rows, fieldData) => {
        res.status(200).json(rows[0][0]);
    }).catch(err => {
        console.log("Database Fetch Error ->");
        console.log(err);
    })
}

exports.getMonthly = async (req, res, next) => {
    try {
        const [rows, fieldData] = await Sale.getMonthly();
        console.log(`rows: ${rows}`);
        res.status(200).json(rows);
    } catch (err) {
        console.log("Database Fetch Error ->", err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};