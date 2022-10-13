const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const listAllSales = async (req, res) => {
  const { message } = await salesService.findAllSales();
  return res.status(200).json(message);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  listAllSales,
  findSaleById,
};
