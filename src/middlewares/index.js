const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateCategory = require('./validateCategory');

module.exports = {
  validateLogin,
  validateToken,
  validateUser,
  validateCategory,
};