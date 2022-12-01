const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create(name);
  return { type: null, message: category };
};

module.exports = {
  createCategory,
};
