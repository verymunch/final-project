const express = require('express');
const router = express.Router();
const path = require('path');
const customersController = require("../controllers/customersController");

router.get('/customers/top', customersController.getTopCustomers);
router.get('/customers', customersController.getCustomers);
router.get('/customers/:id', customersController.getCustomerByID);
router.post('/customers', customersController.postAddCustomer);
router.get('/deleteCustomer/:id', customersController.deleteCustomer);
router.get('/updateCustomer/:id', customersController.editCustomer);
router.put('/customers/:id', customersController.postUpdateCustomer);

exports.routes = router;