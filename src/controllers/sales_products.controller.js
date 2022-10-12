const salesProductsService = require('../services/sales_products.service');
const errorMap = require('../utils/errorMap');

const createNewSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesProductsService.createNewSale(sale);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  createNewSale,
};
