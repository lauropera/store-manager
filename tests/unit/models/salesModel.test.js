const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/connection");

const salesModel = require("../../../src/models/sales.model");
const { saleDate, saleDateFromDB } = require("../mocks/salesMock");

describe("Unit tests from sales model", function () {
  it("expects to find a sale by his id", async function () {
    sinon.stub(connection, "execute").resolves([[saleDateFromDB]]);

    const result = await salesModel.findById(1);
    expect(result).to.deep.equal(saleDateFromDB);
  });

  it("expects to add a new sale", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

    const result = await salesModel.insert(saleDate);
    expect(result).to.equal(1);
  });

  afterEach(sinon.restore);
});
