const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/connection");

const salesModel = require("../../../src/models/sales.model");
const { allSales, allSalesById, saleDate } = require("../mocks/salesMock");

describe("Unit tests from sales model", function () {
  it("expects to show all sales", async function () {
    sinon.stub(connection, "execute").resolves([allSales]);

    const result = await salesModel.findAll();
    expect(result).to.deep.equal(allSales);
  });

  it("expects to find a sale by his id", async function () {
    sinon.stub(connection, "execute").resolves([allSalesById]);

    const result = await salesModel.findById(1);
    expect(result).to.deep.equal(allSalesById);
  });

  it("expects to add a new sale", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesModel.insert(saleDate);
    expect(result).to.equal(1);
  });

  afterEach(sinon.restore);
});
