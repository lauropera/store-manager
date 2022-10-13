const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products.controller');

const validateProductNameField = require('../middlewares/validateProductNameField');

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProduct);

router.post('/', validateProductNameField, productsController.addNewProduct);

router.put('/:id', validateProductNameField, productsController.editProduct);

module.exports = router;
