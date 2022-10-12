const camelize = require('camelize');
const conn = require('../connection');

const findById = async (saleId) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );
  return camelize(result);
};

const insert = async (saleInformations) => {
  const { saleId, productId, quantity } = saleInformations;
  const [{ insertId }] = await conn.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );
  return insertId;
};

module.exports = {
  findById,
  insert,
};
