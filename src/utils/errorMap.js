const errorMap = {
  'any.required': 400,
  'any.invalid': 422,
  'email.inUse': 409,
  'pkUser.notFound': 404,
  'pkPost.notFound': 404,
  'email.notfound': 404,
  'catPk.notFound': 400,
  Unauthorized: 401,
  INVALID_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};