const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
const { expect } = chai;

const {
  allProducts,
  newProductResponse,
  singleProduct,
} = require("../mocks/productsMock");

const productsServices = require("../../../src/services/products.service.js");
const productsController = require("../../../src/controllers/products.controller");

describe("Unit tests from products controller", function () {
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
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });

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
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  afterEach(sinon.restore);
});
