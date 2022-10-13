const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model");
const salesModel = require("../../../src/models/sales.model");
const salesProductsModel = require("../../../src/models/sales_products.model");
const salesProductsService = require("../../../src/services/sales_products.service");
const {
  newSaleInformations,
  salesWithInvalidProducts,
  salesWithoutProductId,
  salesWithoutQuantity,
  salesWithInvalidQuantity,
  newSaleResponse,
  allSalesProducts,
} = require("../mocks/sales_productsMock");

describe("Unit tests from sales_products service", function () {
  describe("creating a new sale with invalid values", function () {
    it("fails if one productId is invalid", async function () {
      sinon.stub(productsModel, "findById").resolves(undefined);

      const result = await salesProductsService.createNewSale(
        salesWithInvalidProducts
      );
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("fails if the productId is not passed", async function () {
      sinon.stub(salesProductsModel, "findById").resolves(undefined);

      const result = await salesProductsService.createNewSale(
        salesWithoutProductId
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"productId" is required');
    });

    it("fails if the quantity is not passed", async function () {
      const result = await salesProductsService.createNewSale(
        salesWithoutQuantity
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"quantity" is required');
    });

    it("fails if the quantity is invalid", async function () {
      const result = await salesProductsService.createNewSale(
        salesWithInvalidQuantity
      );
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
  });

  describe("creating a new sale with valid values", function () {
    it("creates a new sale successfully", async function () {
      sinon.stub(productsModel, "findAll").resolves(allSalesProducts);
      sinon.stub(salesModel, "insert").resolves(1);
      sinon.stub(salesProductsModel, "insert").resolves(newSaleInformations);
      sinon.stub(salesProductsModel, "findById").resolves(newSaleResponse);

      const result = await salesProductsService.createNewSale(
        newSaleInformations
      );
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSaleResponse);
    });
  });

  describe("searching for a sale", function () {
    it("finds a new sale", async function () {
      sinon.stub(salesProductsModel, "findById").resolves(allSalesProducts[0]);

      const result = await salesProductsService.findSaleById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(allSalesProducts[0]);
    });

    it("fails if the sale id is invalid", async function () {
      sinon.stub(salesProductsModel, "findById").resolves(undefined);

      const result = await salesProductsService.findSaleById();
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });
  });

  afterEach(sinon.restore);
});
