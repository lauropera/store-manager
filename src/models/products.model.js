const conn = require('../connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const findById = async (productId) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );
  return insertId;
};

const update = async (productInfo) => {
  const [result] = await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [productInfo.name, productInfo.id],
  );
  return result;
};

const remove = async (productId) => {
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};
