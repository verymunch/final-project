const express = require('express');
const router = express.Router();
const path = require('path');
const itemsController = require("../controllers/itemsController");

router.get('/items/top', itemsController.getTopItems);
router.get('/items', itemsController.getItems);
router.get('/items/:id', itemsController.getItemByID);
router.post('/items', itemsController.postAddItem);
router.get('/deleteItem/:id', itemsController.deleteItem);
router.get('/updateItem/:id', itemsController.editItem);
router.put('/items/:id', itemsController.postUpdateItem);

exports.routes = router;