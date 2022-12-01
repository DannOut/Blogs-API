const errorMap = {
  'any.required': 400,
  'any.invalid': 422,
  'email.inUse': 409,
  'pk.notFound': 404,
  INVALID_VALUE: 400,
  test: 404,
  'catPk.notFound': 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};