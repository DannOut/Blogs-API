const { CategoryServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const createCategory = async (req, res) => {
  const categoryData = req.body;

  const { message } = await CategoryServices.createCategory(categoryData);
  res.status(201).json(message);
};

const getAllCategories = async (_req, res) => {
  const { type, message } = await CategoryServices.getAllCategories();
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  createCategory,
  getAllCategories,
};
