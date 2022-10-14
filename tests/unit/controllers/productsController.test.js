const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const {
  allProducts,
  newProductResponse,
  singleProduct,
  editedProduct,
  editedProductResponse,
  invalidValue,
  specificProducts,
} = require("../mocks/productsMock");

const productsServices = require("../../../src/services/products.service.js");
const productsController = require("../../../src/controllers/products.controller");

describe("Unit tests from products controller", function () {
  describe("searching for products", function () {
    it("shows all products", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findAll")
        .resolves({ type: null, message: allProducts });

      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it("shows a product by his id", async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findById")
        .resolves({ type: null, message: allProducts[0] });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it("fails if the product does not exist", async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findById")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("searching by a name", async function () {
      const res = {};
      const req = {
        query: { q: "martelo" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findProductByName")
        .resolves({ type: null, message: specificProducts });

      await productsController.findProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(specificProducts);
    });

    it("shows all products when the query is empty", async function () {
      const res = {};
      const req = {
        query: { q: "" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findProductByName")
        .resolves({ type: null, message: allProducts });

      await productsController.findProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe("adding a new product", function () {
    it("adds a new product successfully", async function () {
      const res = {};
      const req = { body: { ...singleProduct } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "addNewProduct")
        .resolves({ type: null, message: newProductResponse });

      await productsController.addNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductResponse);
    });

    it("fails if the name does not exist", async function () {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "addNewProduct")
        .resolves({ type: "MISSING_FIELD", message: '"name" is required' });

      await productsController.addNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });
  });

  describe("editing a product", function () {
    it("updates a product with success", async function () {
      const res = {};
      const req = {
        body: { ...editedProduct },
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "editProduct")
        .resolves({ type: null, message: editedProductResponse });

      await productsController.editProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(editedProductResponse);
    });

    it("fails if the productId is invalid", async function () {
      const res = {};
      const req = {
        body: { ...editedProduct },
        params: { id: invalidValue },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "editProduct")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productsController.editProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("removing a product", function () {
    it("should remove a product", async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(productsServices, "removeProduct").resolves({ type: null });

      await productsController.removeProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it("fails if the productId is invalid", async function () {
      const res = {};
      const req = { params: { id: invalidValue } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "removeProduct")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productsController.removeProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  afterEach(sinon.restore);
});
