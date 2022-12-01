const { Op } = require('sequelize');
const { BlogPost, User, PostCategory, Category } = require('../models');
const { categoriesArrayValidation } = require('./validations');

const createPost = async ({ categoryIds, title, content }, token) => {
  const { type, message } = await categoriesArrayValidation(categoryIds);
  if (type) return { type, message };

  const { email, displayName } = token.dataValues;
  //* localizando usuário para criar o Post
  const user = await User.findOne({
    where: { [Op.and]: [{ email }, { displayName }] },
  });

  //* criando a postagem
  const creatingPostInfo = await BlogPost.create({ userId: user.id, title, content });
  
  //* Mapeando Infos de categorys [ ARRAY ]
  await Promise.all(
    categoryIds.map((eachCategory) =>
      PostCategory.create({ categoryId: eachCategory, postId: creatingPostInfo.id })),
  );

  return { type: null, message: creatingPostInfo };
};

const getAll = async () => {
const getPosts = await BlogPost.findAll({
  include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, 
      as: 'categories', 
      throught: { attributes: [] } }],
});

return { type: null, message: getPosts };
};

module.exports = {
  createPost,
  getAll,
};
