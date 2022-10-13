const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.model.js");
const salesServices = require("../../../src/services/sales.service.js");
const {
  invalidValue,
  allSalesById,
  allSales,
} = require("../mocks/salesMock");

describe("Unit tests from sales service", function () {
  describe("searching for sales", function () {
    it("shows all sales", async function () {
      sinon.stub(salesModel, "findAll").resolves(allSales);

      const result = await salesServices.findAllSales();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });

    it("fails if the saleId is invalid", async function () {
      sinon.stub(salesModel, "findById").resolves(undefined);

      const result = await salesServices.findSaleById(invalidValue);
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    it("shows a sale if the saleId is valid", async function () {
      sinon.stub(salesModel, "findById").resolves(allSalesById);

      const result = await salesServices.findSaleById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(allSalesById);
    });
  });

  describe("removing a sale", function () {
    it("should remove a sale", async function () {
      sinon.stub(salesModel, "findById").resolves(allSales[0]);
      sinon.stub(salesModel, "remove").resolves({ affectedRows: 1 });

      const result = await salesServices.removeSale(1);
      expect(result.type).to.equal(null);
    });

    it("fails if the saleId is invalid", async function () {
      sinon.stub(salesModel, "findById").resolves(undefined);
      sinon.stub(salesModel, "remove").resolves(undefined);

      const result = await productsServices.removeSale(invalidValue);
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });
  });

  afterEach(sinon.restore);
});
