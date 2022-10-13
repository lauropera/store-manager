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
  editedProduct,
  invalidProductIdEdit,
  invalidProductNameEdit,
} = require("../mocks/productsMock");

describe("Unit tests from products service", function () {
  describe("searching for products", function () {
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

  describe("editing a product", function () {
    it("updates a product with success", async function () {
      sinon.stub(productsModel, "update").resolves({ affectedRows: 1 });
      sinon.stub(productsModel, "findById").resolves(allProducts[0]);

      const result = await productsServices.editProduct(editedProduct);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(editedProduct);
    });

    it("fails if the productId is invalid", async function () {
      sinon.stub(productsModel, "update").resolves(undefined);
      sinon.stub(productsModel, "findById").resolves(undefined);

      const result = await productsServices.editProduct(invalidProductIdEdit);
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("fails if the name is invalid", async function () {
      const result = await productsServices.editProduct(invalidProductNameEdit);
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe("removing products", function () {
    it("should remove a product", async function () {
      sinon.stub(productsModel, "remove").resolves({ affectedRows: 1 });
      sinon.stub(productsModel, "findById").resolves(allProducts[0]);

      const result = await productsServices.removeProduct(allProducts[0].id);
      expect(result.type).to.equal(null);
    });

    it("fails if the productId is invalid", async function () {
      sinon.stub(productsModel, "findById").resolves(undefined);
      sinon.stub(productsModel, "remove").resolves(undefined);

      const result = await productsServices.removeProduct(invalidValue);
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });
  });

  afterEach(sinon.restore);
});
