const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model.js");
const productsServices = require("../../../src/services/products.service.js");
const { allProducts, invalidValue } = require("../mocks/productsMock");

describe("Service tests from products", function () {
  describe("Searching for products", function () {
    it("show all products", async function () {
      sinon.stub(productsModel, "findAll").resolves(allProducts);
      const result = await productsServices.findAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });

    it("show a product by his id", async function () {
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
    afterEach(sinon.restore);
  });
});