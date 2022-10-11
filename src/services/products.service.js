const productsModel = require('../models/products.model');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const addNewProduct = async (productName) => {
  const newProductId = await productsModel.insert(productName);
  const newProduct = await productsModel.findById(newProductId);
  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  addNewProduct,
};
