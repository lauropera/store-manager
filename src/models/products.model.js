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

module.exports = {
  findAll,
  findById,
};
