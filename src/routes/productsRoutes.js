const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products.controller');

const validateNewProductFields = require('../middlewares/validateNewProductFields');

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProduct);

router.post('/', validateNewProductFields, productsController.addNewProduct);

module.exports = router;
