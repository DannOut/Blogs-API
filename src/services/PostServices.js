const { Op } = require('sequelize');
const { BlogPost, User, PostCategory, Category } = require('../models');
const {
  categoriesArrayValidation,
  doesPostExists,
  authToUpdate,
} = require('./validations');

// prettier-ignore
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
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', throught: { attributes: [] } },
    ],
  });

  return { type: null, message: getPosts };
};

const getById = async (id) => {
  const { type, message } = await doesPostExists(id);
  if (type) return { type, message };
  const getPosts = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', throught: { attributes: [] } },
    ],
  });
  return { type: null, message: getPosts };
};

const updatePost = async (id, infoToUpdate, token) => {
  const { type, message } = await authToUpdate(id, token);

  if (type) return { type, message };

  await BlogPost.update(infoToUpdate, { where: { id } });

  const getPosts = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', throught: { attributes: [] } },
    ],
  });

  return { type: null, message: getPosts };
};

const deletePost = async (id, token) => {
  const checkPost = await doesPostExists(id);
  if (checkPost.type) return { type: checkPost.type, message: checkPost.message };

  const auth = await authToUpdate(id, token);
  if (auth.type) return { type: auth.type, message: auth.message };

  await PostCategory.destroy({ where: { postId: id } });
  await BlogPost.destroy({ where: { id } });

  return { type: null, message: 'User Deleted' };
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
};
