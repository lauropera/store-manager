const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sales.service");
const { allSalesById, allSales, invalidValue } = require("../mocks/salesMock");

describe("Unit tests from sales controller", function () {
  describe("searching for sales", function () {
    it("shows all sales", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "findAllSales")
        .resolves({ type: null, message: allSales });

      await salesController.listAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it("shows a sale when the saleId is valid", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "findSaleById")
        .resolves({ type: null, message: allSalesById });

      await salesController.findSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesById);
    });

    it("fails if the saleId is invalid", async function () {
      const res = {};
      const req = { params: { id: invalidValue } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "findSaleById")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      await salesController.findSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });
  });

  describe("removing a sale", function () {
    it("should remove a sale", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(salesService, "removeSale").resolves({ type: null });

      await salesController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it("fails if the saleId is invalid", async function () {
      const res = {};
      const req = { params: { id: invalidValue } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "removeSale")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      await salesController.removeSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
  });

  afterEach(sinon.restore);
});
