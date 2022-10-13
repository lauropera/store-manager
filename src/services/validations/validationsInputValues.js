const {
  addProductSchema,
  newSaleSchema,
  updateProductSchema,
} = require('./schema');

const validateNewProduct = (productName) => {
  const { error } = addProductSchema.validate(productName);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateNewSale = (sale) => {
  const { error } = newSaleSchema.validate(sale);
  if (error) {
    return {
      type: error.message.includes('greater than')
        ? 'INVALID_VALUE'
        : 'MISSING_FIELD',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

const validateProductEdit = (productInfo) => {
  const { error } = updateProductSchema.validate(productInfo);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
  validateProductEdit,
};
