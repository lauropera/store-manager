const salesModel = require('../models/sales.model');
const formatedTimestamp = require('../utils/formatedTimestamp');

const newSaleRegistry = async () => {
  const currentDate = formatedTimestamp();
  const newSaleId = await salesModel.insert(currentDate);
  return newSaleId;
};

module.exports = {
  newSaleRegistry,
};
