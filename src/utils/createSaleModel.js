const createSaleModel = (saleDetails) => {
  const { saleId, productId, quantity } = saleDetails;
  const sale = {
    id: saleId,
    itemsSold: [{ productId, quantity }],
  };
  return sale;
};

module.exports = createSaleModel;
