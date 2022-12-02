const { User, BlogPost } = require('../../models');

module.exports = async (idPost, token) => {
  const permission = await BlogPost.findOne({ where: { id: idPost } });
  const verify = await User.findOne({
    where: { email: token.email },
  });

  if (permission.userId !== verify.id) {
    return { type: 'Unauthorized', message: 'Unauthorized user' };
  }
  return { type: null, message: '' };
};