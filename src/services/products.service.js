const productsModel = require('../models/products.model');
const {
  validateNewProduct,
  validateProductEdit,
} = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const addNewProduct = async (product) => {
  const error = await validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.insert(product);
  const newProduct = await productsModel.findById(newProductId);
  return { type: null, message: newProduct };
};

const editProduct = async (productInfo) => {
  const error = await validateProductEdit(productInfo);
  if (error.type) return error;

  const productToEdit = await productsModel.findById(productInfo.id);
  if (productToEdit) {
    await productsModel.update(productInfo);
    return { type: null, message: productInfo };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const removeProduct = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) {
    await productsModel.remove(productId);
    return { type: null };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const findProductByName = async (productName = '') => {
  const formattedName = `%${productName}%`;
  const products = await productsModel.findByQuery(formattedName);
  return { type: null, message: products };
};

module.exports = {
  findAll,
  findById,
  addNewProduct,
  editProduct,
  removeProduct,
  findProductByName,
};
