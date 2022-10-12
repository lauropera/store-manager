const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  MISSING_FIELD: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
