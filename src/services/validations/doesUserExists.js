const { User } = require('../../models');

module.exports = async (id) => {
  const doesUserExists = await User.findByPk(id);
  if (!doesUserExists) {
    return { type: 'pk.notFound', message: 'User does not exist' };
  }
  return { type: null, message: '' };
};
