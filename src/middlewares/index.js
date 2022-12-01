const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateCategory = require('./validateCategory');
const validatePosts = require('./validatePosts');

module.exports = {
  validateLogin,
  validateToken,
  validateUser,
  validateCategory,
  validatePosts,
};