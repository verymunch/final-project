const Customer = require("../models/customer");

exports.getTopCustomers = (req, res, next) => {
    Customer.topFive().then((rows, fieldData) => {
        res.status(200).json(rows[0]);
    })
}

exports.getCustomers = (req, res, next) => {
    Customer.fetchAll().then((rows, fieldData) => {
        res.status(200).json(rows[0]);
    })
}

exports.postAddCustomer = ( req, res, next) => {
    let n = req.body.customerName;
    let e = req.body.customerEmail;

    let obj = {n, e};
    const customer = new Customer(n, e);
    customer.save();
    const parameters = [n, e];
    console.log(parameters);
}

exports.getCustomerByID = (req, res, next) => {
    let id = req.params.id;
    Customer.findByID(id).then((rows, fieldData) => {
        res.status(200).json(rows[0][0]);
    }).catch(err => {
        console.log("Database Fetch Error ->"); console.log(err);
    })
}

exports.editCustomer = (req, res, next) => {
    let id = req.params.id;
    Customer.findByID(id)
        .then((rows, fieldData) => {
            res.status(200).json(rows[0][0]);
        }).catch(err => {
            console.log("DB Update Error ->");
            console.log(err);
    })
}

exports.postUpdateCustomer = (req, res, next) => {
    let id = req.body.id;
    let n = req.body.CustomerName;
    let e = req.body.CustomerEmail;
    const customer = new Customer(n, e);
    console.log("Value for query");
    console.log(id);
    console.log(n);
    console.log(e);
    customer.update(id).then((rows, fieldData) => {
        res.redirect('/')
    }).catch(err => {
        console.log("Database Post Error -> " + err);
    })
}

exports.deleteCustomer = ( req, res, next ) => {
    let id = req.params.id;
    console.log("Ready to delete------");
    console.log(`id:${id}`);
    Customer.delete(id)
        .then((result) => {
            res.redirect('/');
        }).catch(err => {
        console.log("Error on delete");
        console.log(err);
    })
}