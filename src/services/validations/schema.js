const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).required();

const addProductSchema = Joi.object({
  name: nameSchema,
});

const newSaleSchema = Joi.object({
  productId: idSchema,
  quantity: idSchema,
});

const updateProductSchema = Joi.object({
  id: idSchema,
  name: nameSchema,
});

module.exports = {
  idSchema,
  addProductSchema,
  newSaleSchema,
  updateProductSchema,
};
