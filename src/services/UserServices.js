const { User } = require('../models');
const loginValidation = require('./validations/loginValidation');
const isUserRegistered = require('./validations/isUserRegistered');
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

module.exports = {
  createLogin,
  createUser,
  getAll,
};
