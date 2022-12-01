const { BlogPost } = require('../../models');

module.exports = async (id) => {
  const doesPostExists = await BlogPost.findByPk(id);
  if (!doesPostExists) {
    return { type: 'pkPost.notFound', message: 'Post does not exist' };
  }
  return { type: null, message: '' };
};
