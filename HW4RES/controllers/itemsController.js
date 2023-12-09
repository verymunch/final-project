const Item = require("../models/item");

exports.getItems = (req, res, next) => {
    Item.fetchAll().then((rows, fieldData) => {
        res.status(200).json(rows[0]);
    })
}

exports.postAddItem = (req, res, next) => {
    let n = req.body.itemName;
    let p = req.body.itemPrice;

    let obj = {n, p};
    const item = new Item(n, p);
    item.save();
    const parameters = [n, p];
    console.log(parameters);
}

exports.getItemByID = (req, res, next) => {
    let id = req.params.id;
    Item.findByID(id).then((rows, fieldData) => {
        res.status(200).json(rows[0][0]);
    }).catch(err => {
        console.log("Database Fetch Error ->");
        console.log(err);
    })
}

exports.editItem = (req, res, next) => {
    let id = req.params.id;
    Item.findByID(id)
        .then((rows, fieldData) => {
            res.status(200).json(rows[0][0]);
        }).catch(err => {
        console.log("DB Update Error ->");
        console.log(err);
    })
}

exports.postUpdateItem = (req, res, next) => {
    let id = req.body.id;
    let n = req.body.ItemName;
    let p = req.body.ItemPrice;
    const item = new Item(n, p);
    console.log("Value for query");
    console.log(id);
    console.log(n);
    console.log(p);
    item.update(id).then((rows, fieldData) => {
        res.redirect('/')
    }).catch(err => {
        console.log("Database Post Error -> " + err);
    })
}

exports.deleteItem = (req, res, next) => {
    let id = req.params.id;
    console.log("Ready to delete------");
    console.log(`id:${id}`);
    Item.delete(id)
        .then((result) => {
            res.redirect('/');
        }).catch(err => {
        console.log("Error on delete");
        console.log(err);
    })
}

exports.getTopItems = (req, res, next) => {
    Item.topFive().then((rows, fieldData) => {
        res.status(200).json(rows[0]);
    })
}