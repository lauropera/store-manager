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

const editedProduct = { id: 1, name: "Martelo do Batman" };

const invalidProductIdEdit = { id: 999999, name: "Fantasia" };
const invalidProductNameEdit = { id: 1, name: invalidValue };

module.exports = {
  allProducts,
  invalidValue,
  singleProduct,
  newProductResponse,
  invalidProduct,
  editedProduct,
  invalidProductIdEdit,
  invalidProductNameEdit,
};
