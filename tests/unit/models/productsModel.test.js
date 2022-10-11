const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/connection");
const productsModel = require("../../../src/models/products.model.js");
const { allProducts } = require("../mocks/productsMock");

describe("Unit tests from products model", function () {
  it("Expects to show all products", async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);
    const result = await productsModel.findAll();
    expect(result).to.deep.equal(allProducts);
  });

  it("Expects to show a product by his id", async function () {
    sinon.stub(connection, "execute").resolves([[allProducts[0]]]);
    const result = await productsModel.findById(1);
    expect(result).to.deep.equal(allProducts[0]);
  });
  afterEach(sinon.restore);
});
