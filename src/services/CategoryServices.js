const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create(name);
  return { type: null, message: category };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { type: null, message: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};
