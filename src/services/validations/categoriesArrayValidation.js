const { Category } = require('../../models');

module.exports = async (categoryArray) => {
  const categories = await Promise.all(
    categoryArray.map((eachCategoryId) => Category.findByPk(eachCategoryId)),
  );

  const validateCategories = categories.includes(null);
  if (validateCategories) {
    return {
      type: 'catPk.notFound',
      message: 'one or more "categoryIds" not found',
    };
  }
  return { type: null, message: '' };
};
