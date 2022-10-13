const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model.js");
const productsServices = require("../../../src/services/products.service.js");
const {
  allProducts,
  invalidValue,
  newProductResponse,
  singleProduct,
  invalidProduct,
} = require("../mocks/productsMock");

describe("Unit tests from products service", function () {
  describe("Searching for products", function () {
    it("shows all products", async function () {
      sinon.stub(productsModel, "findAll").resolves(allProducts);

      const result = await productsServices.findAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });

    it("shows a product by his id", async function () {
      sinon.stub(productsModel, "findById").resolves(allProducts[0]);

      const result = await productsServices.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });

    it("fails if the product does not exist", async function () {
      sinon.stub(productsModel, "findById").resolves(undefined);

      const result = await productsServices.findById(invalidValue);
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });
  });

  describe("adding a new product", function () {
    it("product added successfully", async function () {
      sinon.stub(productsModel, "insert").resolves([{ insertId: 1 }]);
      sinon.stub(productsModel, "findById").resolves(newProductResponse);

      const result = await productsServices.addNewProduct(singleProduct);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newProductResponse);
    });

    it("fails if the name has invalid length", async function () {
      const result = await productsServices.addNewProduct(invalidProduct);
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.deep.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  afterEach(sinon.restore);
});
