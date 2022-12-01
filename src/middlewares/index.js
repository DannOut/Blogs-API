const validateUser = require('./validateUser');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateCategory = require('./validateCategory');
const validatePosts = require('./validatePosts');
const validatePostsUpdate = require('./validatePostsUpdate');

module.exports = {
  validateLogin,
  validateToken,
  validateUser,
  validateCategory,
  validatePosts,
  validatePostsUpdate,
};