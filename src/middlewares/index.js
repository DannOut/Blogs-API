const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');

module.exports = {
  validateLogin,
  validateToken,
  validateUser,
};