const productsModel = require('../models/products.model');
const salesProductsModel = require('../models/sales_products.model');
const { validateNewSale } = require('./validations/validationsInputValues');

const doesProductsExist = async (productsToSale) => {
  const allProducts = await productsModel.findAll();
  const allProductsId = allProducts.map(({ id }) => id);
  const allProductsSaleId = productsToSale.map(({ productId }) => productId);
  if (allProductsSaleId.every((id) => allProductsId.includes(id))) return true;
  return false;
};

const validateSale = (saleInformations) => {
  const validations = saleInformations.map((sale) => validateNewSale(sale));
  const validationError = validations.find(({ type }) => type);
  return validationError || { type: null, message: '' };
};

const createNewSale = async (saleInformations, saleId) => {
  const validationResult = validateSale(saleInformations);
  if (validationResult.type) return validationResult;

  const productsIdValidation = await doesProductsExist(saleInformations);

  if (productsIdValidation) {
    const createAllSales = saleInformations.map((sale) =>
      salesProductsModel.insert({ saleId, ...sale }));

    await Promise.all(createAllSales);
    const sale = await salesProductsModel.findById(saleId);
    console.log(sale);
    return { type: null, message: sale };
  }

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  createNewSale,
};
