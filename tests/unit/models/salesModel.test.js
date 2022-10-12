const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/connection");

const salesModel = require("../../../src/models/sales.model");
const { allSales, newSaleInformations } = require("../mocks/salesMock");

describe("Unit tests from sales model", function () {
  it("expects to find a sale by his id", async function () {
    sinon.stub(connection, "execute").resolves([[allSales[0]]]);

    const result = await salesModel.findById(1);
    expect(result).to.deep.equal(allSales[0]);
  });

  it("expects to add a new sale with one product", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesModel.insert(newSaleInformations[0]);
    expect(result).to.equal(1);
  });

  it("expects to add a new sale with multiple products", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 2 }]);

    const result = await salesModel.insert(newSaleInformations);
    expect(result).to.equal(2);
  });

  afterEach(sinon.restore);
});
