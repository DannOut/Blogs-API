const { User, BlogPost } = require('../../models');

module.exports = async (idPost, token) => {
  const permission = await BlogPost.findOne({ where: { id: idPost } });
  const verify = await User.findOne({
    where: { email: token.dataValues.email },
  });

  if (!permission || permission.dataValues.userId !== verify.dataValues.id) {
    return { type: 'Unauthorized', message: 'Unauthorized user' };
  }

  return { type: null, message: '' };
};
