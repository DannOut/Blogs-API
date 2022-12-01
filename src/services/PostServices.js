const { BlogPost, User, PostCategory } = require('../models');
const { categoriesArrayValidation } = require('./validations');

const createPost = async ({ categoryIds, title, content }, token) => {
  const { type, message } = await categoriesArrayValidation(categoryIds);
  if (type) return { type, message };

  //* localizando usuário para criar o Post
  const user = await User.findOne({
    where: { email: token.dataValues.email },
  });
  
  if (!user) return { type: 'email.notfound', message: 'Some required fields are missing' };

  //* criando a postagem
  const creatingPostInfo = await BlogPost.create({ userId: user.id, title, content });
  
  //* Mapeando Infos de categorys [ ARRAY ]
  await Promise.all(
    categoryIds.map((eachCategory) =>
      PostCategory.create({ categoryId: eachCategory, postId: creatingPostInfo.id })),
  );

  return { type: null, message: creatingPostInfo };
};

module.exports = {
  createPost,
};
