const { User } = require('../models');
const loginValidation = require('./validations/loginValidation');
const isUserRegistered = require('./validations/isUserRegistered');
const doesUserExists = require('./validations/doesUserExists');
const generateToken = require('../utils/generateToken');

const createLogin = async ({ email }) => {
  const loginInfo = await User.findAll({ where: { email } });
  const { type, message } = await loginValidation(loginInfo);

  if (type) return { type, message };
  const token = generateToken(loginInfo);
  return { type: null, message: token };
};

const createUser = async (userInfo) => {
  const { type, message } = await isUserRegistered(userInfo);
  if (type) return { type, message };
  await User.create(userInfo);
  const { password, ...values } = userInfo;
  const token = generateToken(values);
  return { type: null, message: token };
};

const getAll = async () => {
  const users = await User.findAll({
  attributes: { exclude: ['password'] },
});
return { type: null, message: users };
};

const getUser = async (id) => {
  const { type, message } = await doesUserExists(id);
  if (type) return { type, message };
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return { type: null, message: user };
};

module.exports = {
  createLogin,
  createUser,
  getAll,
  getUser,
};
