const { User, PostCategory, BlogPost } = require('../models');
const {
  loginValidation,
  isUserRegistered,
  doesUserExists,
} = require('./validations');
const generateToken = require('../utils/generateToken');

const createLogin = async ({ email }) => {
  const loginInfo = await User.findOne({ where: { email } });
  const { type, message } = await loginValidation(loginInfo);

  if (type) return { type, message };
  const token = generateToken(loginInfo);
  return { type: null, message: token };
};

const createUser = async (userInfo) => {
  const { type, message } = await isUserRegistered(userInfo);
  if (type) return { type, message };
  await User.create(userInfo);
  const { password, ...values } = userInfo;
  const token = generateToken(values);
  return { type: null, message: token };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { type: null, message: users };
};

const getUser = async (id) => {
  const { type, message } = await doesUserExists(id);
  if (type) return { type, message };
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return { type: null, message: user };
};

const deleteUser = async (userId) => {
  console.log('TOKEN', userId);

  const getAllUserPosts = await BlogPost.findAll({ where: { userId } });
  const filterIdOnly = getAllUserPosts.map(({ id }) => id);
  await Promise.all(
    filterIdOnly.map((eachPost) => PostCategory.destroy({ where: { postId: eachPost } })),
    filterIdOnly.map((eachPost) => BlogPost.destroy({ where: { id: eachPost } })),
  );
  await User.destroy({ where: { id: userId } });

  return { type: null };
};

module.exports = {
  createLogin,
  createUser,
  getAll,
  getUser,
  deleteUser,
};
