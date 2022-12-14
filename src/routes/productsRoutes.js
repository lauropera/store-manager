const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');
const validateProductNameField = require('../middlewares/validateProductNameField');

router.get('/', productsController.listProducts);
router.get('/search', productsController.findProductByName);
router.get('/:id', productsController.getProduct);
router.post('/', validateProductNameField, productsController.addNewProduct);
router.put('/:id', validateProductNameField, productsController.editProduct);
router.delete('/:id', productsController.removeProduct);

module.exports = router;
