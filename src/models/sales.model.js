const conn = require('../connection');

const findById = async (saleId) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return result;
};

const insert = async (saleDate) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [saleDate],
  );
  return insertId;
};

module.exports = {
  findById,
  insert,
};
