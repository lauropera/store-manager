const createSaleModel = (saleId, saleDetails) => ({
  id: saleId,
  itemsSold: saleDetails,
});

module.exports = createSaleModel;
