const express = require('express');

const router = express.Router();
const salesController = require('../controllers/sales.controller');
const salesProductsController = require('../controllers/sales_products.controller');

router.get('/:id', salesController.findSaleById);

router.get('/', salesController.listAllSales);

router.post('/', salesProductsController.createNewSale);

router.delete('/:id', salesController.removeSale);

module.exports = router;
