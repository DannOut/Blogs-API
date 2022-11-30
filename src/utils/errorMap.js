const errorMap = {
  'any.required': 400,
  'any.invalid': 422,
  INVALID_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};