const allSalesProducts = [
  {
    id: 1,
    itemsSold: [{ productId: 1, quantity: 5 }],
  },
  {
    id: 2,
    itemsSold: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 5 },
    ],
  },
];

const newSaleResponse = {
  id: 1,
  itemsSold: [
    { productId: 1, quantity: 3 },
    { productId: 2, quantity: 7 },
  ],
};

const newSaleInformations = [
  { saleId: 1, productId: 1, quantity: 3 },
  { saleId: 1, productId: 2, quantity: 7 },
];

const salesWithInvalidQuantity = [
  { productId: 1, quantity: 0 },
  { productId: 2, quantity: 0 },
];

const salesWithInvalidProducts = [
  { productId: 999, quantity: 1 },
  { productId: 1, quantity: 5 },
];

const salesWithoutProductId = [{ quantity: 1 }, { quantity: 5 }];
const salesWithoutQuantity = [{ productId: 1 }, { productId: 2 }];

const saleFromDB = [{ sale_id: 1, product_id: 1, quantity: 5 }];
const formattedSale = [{ saleId: 1, productId: 1, quantity: 5 }];

const saleDate = "2022-10-12 16:58:00";
const saleDateFromDB = { id: 1, date: saleDate };

const editedSaleResponse = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};

module.exports = {
  allSalesProducts,
  newSaleInformations,
  salesWithInvalidProducts,
  salesWithoutProductId,
  salesWithoutQuantity,
  salesWithInvalidQuantity,
  newSaleResponse,
  formattedSale,
  saleDate,
  saleFromDB,
  saleDateFromDB,
  editedSaleResponse,
};
