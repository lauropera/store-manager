const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/connection");
const productsModel = require("../../../src/models/products.model.js");
const {
  allProducts,
  singleProduct,
  editedProduct,
  specificProducts,
} = require("../mocks/productsMock");

describe("Unit tests from products model", function () {
  it("expects to show all products", async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);

    const result = await productsModel.findAll();
    expect(result).to.deep.equal(allProducts);
  });

  it("expects to show a product by his id", async function () {
    sinon.stub(connection, "execute").resolves([[allProducts[0]]]);

    const result = await productsModel.findById(1);
    expect(result).to.deep.equal(allProducts[0]);
  });

  it("expects to add a new product", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await productsModel.insert(singleProduct);
    expect(result).to.equal(1);
  });

  it("expects to edit a product", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await productsModel.update(editedProduct);
    expect(result).to.deep.equal({ affectedRows: 1 });
  });

  it("expects to remove a product", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await productsModel.remove(allProducts[0].id);
    expect(result).to.deep.equal({ affectedRows: 1 });
  });

  it("expects to return specific products by their names", async function () {
    sinon.stub(connection, "execute").resolves([specificProducts]);

    const result = await productsModel.findByQuery("%martelo%");
    expect(result).to.deep.equal(specificProducts);
  });

  it("expects to return all products when the query is empty", async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);

    const result = await productsModel.findByQuery();
    expect(result).to.deep.equal(allProducts);
  });

  afterEach(sinon.restore);
});
