const productsModel = require('../models/products.model');
const salesProductsModel = require('../models/sales_products.model');
const createSaleModel = require('../utils/createSaleModel');
const salesService = require('./sales.service');
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

const createNewSale = async (saleInformations) => {
  const validationResult = validateSale(saleInformations);
  if (validationResult.type) return validationResult;

  const productsIdValidation = await doesProductsExist(saleInformations);

  if (productsIdValidation) {
    const saleId = await salesService.newSaleRegistry();
    const createAllSales = saleInformations.map(async (sale) => {
      await salesProductsModel.insert({ saleId, ...sale });
    });

    await Promise.all(createAllSales);
    const sale = createSaleModel(saleId, saleInformations);
    return { type: null, message: sale };
  }

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const findSaleById = async (saleId) => {
  const sale = await salesProductsModel.findById(saleId);
  if (sale) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  createNewSale,
  findSaleById,
};
