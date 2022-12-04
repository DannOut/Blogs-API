const { Op } = require('sequelize');
const {
  BlogPost,
  User,
  PostCategory,
  Category,
  sequelize,
} = require('../models');
const {
  categoriesArrayValidation,
  doesPostExists,
  authToUpdate,
} = require('./validations');

// prettier-ignore
const createPost = async ({ categoryIds, title, content }, token) => {
  const transaction = await sequelize.transaction(async (t) => {
    const { type, message } = await categoriesArrayValidation(categoryIds);
    if (type) return { type, message };
    
    const { email, displayName } = token.dataValues;

    const user = await User.findOne({
        where: { [Op.and]: [{ email }, { displayName }] },
      }, { transaction: t });
      
      const creatingPostInfo = await BlogPost
        .create({ userId: user.id, title, content }, { transaction: t });
      
      await Promise.all(
          categoryIds.map((eachCategory) =>
            PostCategory
            .create({ categoryId: eachCategory, postId: creatingPostInfo.id }, { transaction: t })),
        );
        
        return { type: null, message: creatingPostInfo };
      });
      return transaction;
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
  const transaction = await sequelize.transaction(async (t) => {
    const { type, message } = await authToUpdate(id, token);
  
    if (type) return { type, message };
  
    await BlogPost.update(infoToUpdate, { where: { id } }, { transaction: t });
  
    const getPosts = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', throught: { attributes: [] } },
      ],
      transaction: t,
    });
  
    return { type: null, message: getPosts };
  });
  return transaction;
};

// prettier-ignore
const deletePost = async (id, token) => {
  const checkPost = await doesPostExists(id);
  if (checkPost.type) { return { type: checkPost.type, message: checkPost.message }; }

  const auth = await authToUpdate(id, token);
  if (auth.type) return { type: auth.type, message: auth.message };

  const transaction = await sequelize.transaction(async (t) => {
    await PostCategory.destroy({ where: { postId: id } }, { transaction: t });
    await BlogPost.destroy({ where: { id } }, { transaction: t });
  
    return { type: null, message: 'User Deleted' };
  });
  return transaction;
};

const getByQuery = async (query) => {
  const getInfo = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', throught: { attributes: [] } },
    ],
  });
  return { type: null, message: getInfo };
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
  getByQuery,
};
