const invalidValue = "a";

const singleProduct = { name: "Traje de encolhimento" };

const newProductResponse = {
  id: 1,
  name: "Traje de encolhimento",
};

const invalidProduct = { name: "a" };

const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
];

const editedProduct = { name: "Martelo do Batman" };

const editedProductResponse = {
  id: 1,
  name: "Martelo do Batman",
};

module.exports = {
  allProducts,
  invalidValue,
  singleProduct,
  newProductResponse,
  invalidProduct,
  editedProduct,
  editedProductResponse,
};
