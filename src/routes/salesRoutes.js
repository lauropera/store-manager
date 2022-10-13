const express = require('express');

const router = express.Router();
const salesProductsController = require('../controllers/sales_products.controller');

router.get('/:id', salesProductsController.getSaleById);

router.post('/', salesProductsController.createNewSale);

module.exports = router;
