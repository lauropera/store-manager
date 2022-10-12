const newSaleInformations = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const salesWithInvalidProducts = [
  { productId: 999, quantity: 1 },
  { productId: 123, quantity: 5 },
];

const salesWithoutProductId = [{ quantity: 1 }, { quantity: 5 }];

const salesWithoutQuantity = [{ productId: 1 }, { productId: 2 }];

const salesWithInvalidQuantity = [
  { productId: 1, quantity: 0 },
  { productId: 2, quantity: 0 },
];

const newSaleResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

module.exports = {
  newSaleInformations,
  salesWithInvalidProducts,
  salesWithoutProductId,
  salesWithoutQuantity,
  salesWithInvalidQuantity,
  newSaleResponse,
};
