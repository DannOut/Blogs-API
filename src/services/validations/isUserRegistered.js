// const { Op } = require('sequelize');
const { User } = require('../../models');

module.exports = async ({ email }) => {
  const isEmailRegistered = await User.findOne({ where: { email } });
  if (isEmailRegistered !== null) {
    return { type: 'email.inUse', message: 'User already registered' };
  }
  // const teste = await User.findAll({ where: { [Op.or]: [{ email }, { id }] } });
  // console.log(teste);
  // if (teste !== null) {
  //   return { type: 'email.inUse', message: 'User already registered' };
  // }

  return { type: null, message: '' };
};
