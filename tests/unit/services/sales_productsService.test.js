const { expect } = require("chai");
const sinon = require("sinon");

const {
  productsModel,
  salesModel,
  salesProductsModel,
} = require("../../../src/models");
const { salesProductsService } = require("../../../src/services");

const { allProducts } = require("../mocks/productsMock");
const {
  newSaleInformations,
  salesWithInvalidProducts,
  salesWithoutProductId,
  salesWithoutQuantity,
  salesWithInvalidQuantity,
  newSaleResponse,
  allSalesProducts,
  editedSaleResponse,
  saleId,
} = require("../mocks/sales_productsMock");

describe("Unit tests from sales_products service", function () {
  describe("creating a new sale with invalid values", function () {
    it("fails if a productId is invalid", async function () {
      sinon.stub(productsModel, "findAll").resolves(allProducts);
      sinon.stub(productsModel, "findById").resolves(undefined);
      sinon.stub(salesModel, "insert").resolves(undefined);
      sinon.stub(salesProductsModel, "insert").resolves(undefined);

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

  describe("editing a sale", function () {
    it("should edit a product from a sale", async function () {
      sinon.stub(productsModel, "findAll").resolves(allProducts);
      sinon.stub(salesProductsModel, "findById").resolves(allSalesProducts[0]);
      sinon.stub(salesProductsModel, "update").resolves({ changedRows: 1 });

      const result = await salesProductsService.editSale(saleId, [
        {
          productId: 1,
          quantity: 50,
        },
      ]);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(editedSaleResponse);
    });

    it("fails if the sale does not exist", async function () {
      sinon.stub(productsModel, "findAll").resolves(allProducts);
      sinon.stub(salesProductsModel, "findById").resolves(undefined);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const invalidValue = "a";
      const result = await salesProductsService.editSale(
        invalidValue,
        newSaleInformations
      );
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    it("fails if a productId is invalid", async function () {
      sinon.stub(productsModel, "findAll").resolves(allProducts);
      sinon.stub(salesProductsModel, "findById").resolves(newSaleResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.editSale(
        saleId,
        salesWithInvalidProducts
      );
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("fails if the productId is not passed", async function () {
      sinon.stub(productsModel, "findById").resolves(newSaleResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.editSale(
        saleId,
        salesWithoutProductId
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"productId" is required');
    });

    it("fails if the quantity is not passed", async function () {
      sinon.stub(productsModel, "findById").resolves(newSaleResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.editSale(
        saleId,
        salesWithoutQuantity
      );
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"quantity" is required');
    });

    it("fails if the quantity is invalid", async function () {
      sinon.stub(productsModel, "findById").resolves(newSaleResponse);
      sinon.stub(salesProductsModel, "update").resolves(undefined);

      const result = await salesProductsService.editSale(
        saleId,
        salesWithInvalidQuantity
      );
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
  });

  afterEach(sinon.restore);
});
