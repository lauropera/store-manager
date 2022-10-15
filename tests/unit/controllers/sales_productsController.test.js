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
  allSalesProducts,
  editedSaleResponse,
} = require("../mocks/sales_productsMock");

const salesProductsController = require("../../../src/controllers/sales_products.controller");
const salesProductsService = require("../../../src/services/sales_products.service");

describe("Unit tests from sales_products controller", function () {
  describe("creating a new sale", function () {
    it("creates a new sale successfully", async function () {
      const res = {};
      const req = { body: { ...newSaleInformations } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "createNewSale")
        .resolves({ type: null, message: newSaleResponse });

      await salesProductsController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleResponse);
    });

    it("fails if a productId is invalid", async function () {
      const res = {};
      const req = { body: { ...salesWithInvalidProducts } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "createNewSale")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await salesProductsController.createNewSale(req, res);

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
      sinon.stub(salesProductsService, "createNewSale").resolves({
        type: "MISSING_FIELD",
        message: '"productId" is required',
      });

      await salesProductsController.createNewSale(req, res);

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
      sinon.stub(salesProductsService, "createNewSale").resolves({
        type: "MISSING_FIELD",
        message: '"quantity" is required',
      });

      await salesProductsController.createNewSale(req, res);

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
      sinon.stub(salesProductsService, "createNewSale").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesProductsController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  describe("searching for sales", function () {
    it("finds a sale", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "findSaleById")
        .resolves({ type: null, message: allSalesProducts[0] });

      await salesProductsController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesProducts[0]);
    });

    it("fails if the sale id is invalid", async function () {
      const res = {};
      const req = { params: { id: 123123123 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "findSaleById")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      await salesProductsController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });
  });

  describe("editing a sale", function () {
    it("should edit a sale", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "editSale")
        .resolves({ type: null, message: editedSaleResponse });

      await salesProductsController.editSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(editedSaleResponse);
    });

    it("fails if the sale does not exist", async function () {
      const res = {};
      const req = { params: { id: 9999999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "editSale")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      await salesProductsController.editSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });

    it("fails if a productId is invalid", async function () {
      const res = {};
      const req = {
        body: { salesWithInvalidProducts },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesProductsService, "editSale")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await salesProductsController.editSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("fails if the productId is not passed", async function () {
      const res = {};
      const req = {
        body: { salesWithoutProductId },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "editSale").resolves({
        type: "MISSING_FIELD",
        message: '"productId" is required',
      });

      await salesProductsController.editSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required',
      });
    });

    it("fails if the quantity is not passed", async function () {
      const res = {};
      const req = {
        body: { salesWithoutQuantity },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "editSale").resolves({
        type: "MISSING_FIELD",
        message: '"quantity" is required',
      });

      await salesProductsController.editSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required',
      });
    });

    it("fails if the quantity is invalid", async function () {
      const res = {};
      const req = {
        body: { salesWithoutProductId },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesProductsService, "editSale").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesProductsController.editSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });
  });

  afterEach(sinon.restore);
});
