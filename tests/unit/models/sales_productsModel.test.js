const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/connection");

const salesProductsModel = require("../../../src/models/sales_products.model");
const {
  newSaleInformations,
  saleFromDB,
  formattedSale,
} = require("../mocks/sales_productsMock");

describe("Unit tests from sales_products model", function () {
  it("expects to find a sale by his id", async function () {
    sinon.stub(connection, "execute").resolves([[saleFromDB]]);

    const result = await salesProductsModel.findById(1);
    expect(result).to.deep.equal(formattedSale);
  });

  it("expects to add a new sale with one product", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesProductsModel.insert(newSaleInformations[0]);
    expect(result).to.equal(1);
  });

  it("expects to add a new sale with multiple products", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 2 }]);

    const result = await salesProductsModel.insert(newSaleInformations);
    expect(result).to.equal(2);
  });

  afterEach(sinon.restore);
});
