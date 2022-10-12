const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const {
  newSaleResponse,
  newSaleInformations,
  salesWithInvalidProducts,
  salesWithoutProductId,
  salesWithoutQuantity,
} = require("../mocks/salesMock");

const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sales.service");

describe("Controller tests from sales", function () {
  describe("creating a new sale", function () {
    it("creates a new sale successfully", async function () {
      const res = {};
      const req = { body: { ...newSaleInformations } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "createNewSale")
        .resolves({ type: null, message: newSaleResponse });

      await salesController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleResponse);
    });

    it("fails if one productId is invalid", async function () {
      const res = {};
      const req = { body: { ...salesWithInvalidProducts } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "createNewSale")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await salesController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("fails if the productId is not passed", async function () {
      const res = {};
      const req = { body: { ...salesWithoutProductId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "createNewSale").resolves({
        type: "MISSING_FIELD",
        message: '"productId" is required',
      });

      await salesController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required',
      });
    });

    it("fails if the quantity is not passed", async function () {
      const res = {};
      const req = { body: { ...salesWithoutQuantity } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "createNewSale").resolves({
        type: "MISSING_FIELD",
        message: '"quantity" is required',
      });

      await salesController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required',
      });
    });

    it("fails if the quantity is invalid", async function () {
      const res = {};
      const req = { body: { ...salesWithoutProductId } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "createNewSale").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });
});
