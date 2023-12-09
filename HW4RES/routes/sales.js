const express = require('express');
const router = express.Router();
const path = require('path');
const salesController = require("../controllers/salesController");

router.get('/sales/top', salesController.getMonthly);
router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSaleByID);

exports.routes = router;