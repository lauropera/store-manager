const express = require('express');

const router = express.Router();

const { salesController, salesProductsController } = require('../controllers');

router.get('/:id', salesController.findSaleById);
router.get('/', salesController.listAllSales);
router.post('/', salesProductsController.createNewSale);
router.delete('/:id', salesController.removeSale);
router.put('/:id', salesProductsController.editSale);

module.exports = router;
