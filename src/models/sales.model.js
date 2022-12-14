const conn = require('../connection');

const findAll = async () => {
  const [result] = await conn.execute(
    `SELECT
    sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return result;
};

const findById = async (saleId) => {
  const [result] = await conn.execute(
    `SELECT
    s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id;`,
    [saleId],
  );
  return result;
};

const insert = async (saleDate) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?);',
    [saleDate],
  );
  return insertId;
};

const remove = async (saleId) => {
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;',
    [saleId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
};
