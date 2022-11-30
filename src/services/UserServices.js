const { User } = require('../models');
const loginValidation = require('./validations/loginValidation');
const generateToken = require('../utils/generateToken');

const createLogin = async ({ email }) => {
  const loginInfo = await User.findAll({ where: { email } });
  const { type, message } = loginValidation(loginInfo);

  if (type) return { type, message };
  const token = generateToken(loginInfo);
  return { type: null, message: token };
};

const createUser = async (userInfo) => {
  await User.create(userInfo);
  const { password, ...values } = userInfo;
  const token = generateToken(values);
  return { type: null, message: token };
};

module.exports = {
  createLogin,
  createUser,
};
