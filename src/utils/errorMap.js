const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  MISSING_FIELD: 400,
  INVALID_VALUE: 422,
  SALE_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
