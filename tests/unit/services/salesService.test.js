const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");
const {
  newSaleInformations,
  salesWithInvalidProducts,
  salesWithoutProductId,
  salesWithoutQuantity,
  salesWithInvalidQuantity,
  newSaleResponse,
} = require("../mocks/salesMock");

describe("Service tests from sales", function () {
  describe("creating a new sale with invalid values", function () {
    it("fails if one productId is invalid", async function () {
      sinon.stub(salesModel, "findById").resolves(undefined);

      const result = await salesService.createNewSale(salesWithInvalidProducts);
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("fails if the productId is not passed", async function () {
      sinon.stub(salesModel, "findById").resolves(undefined);

      const result = await salesService.createNewSale(salesWithoutProductId);
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"productId" is required');
    });

    it("fails if the quantity is not passed", async function () {
      const result = await salesService.createNewSale(salesWithoutQuantity);
      expect(result.type).to.equal("MISSING_FIELD");
      expect(result.message).to.equal('"quantity" is required');
    });

    it("fails if the quantity is invalid", async function () {
      const result = await salesService.createNewSale(salesWithInvalidQuantity);
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
  });

  describe("creating a new sale with valid values", function () {
    it("creates a new sale successfully", async function () {
      sinon.stub(salesModel, "findById").resolves(true);
      sinon.stub(salesModel, "insert").resolves(newSaleResponse);

      const result = await salesService.createNewSale(newSaleInformations);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSaleResponse);
    });
  });

  afterEach(sinon.restore);
});
