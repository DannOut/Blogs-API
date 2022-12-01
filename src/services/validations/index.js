const doesUserExists = require('./doesUserExists');
const doesPostExists = require('./doesPostExists');
const isUserRegistered = require('./isUserRegistered');
const loginValidation = require('./loginValidation');
const categoriesArrayValidation = require('./categoriesArrayValidation');
const authToUpdate = require('./authToUpdate');

module.exports = {
  doesUserExists,
  isUserRegistered,
  loginValidation,
  categoriesArrayValidation,
  doesPostExists,
  authToUpdate,
}; 