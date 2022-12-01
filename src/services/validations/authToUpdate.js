const { User, BlogPost } = require('../../models');

module.exports = async (idPost, token) => {
  const permission = await BlogPost.findOne({ where: { id: idPost } });
  console.log('PERMISSION', permission);
  const verify = await User.findOne({
    where: { email: token.dataValues.email },
  });
  console.log('VERIFY', verify);

  if (permission.dataValues.userId !== verify.dataValues.id) {
    return { type: 'Unauthorized', message: 'Unauthorized user' };
  }
  console.log('FINAL VALIDATION');
  return { type: null, message: '' };
};
