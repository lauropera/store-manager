const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const addNewProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsService.addNewProduct(product);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const productDetails = { id, name };
  const { type, message } = await productsService.editProduct(productDetails);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.removeProduct(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).end();
};

const findProductByName = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.findProductByName(q);
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  addNewProduct,
  editProduct,
  removeProduct,
  findProductByName,
};
