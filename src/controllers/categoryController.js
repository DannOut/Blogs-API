const { CategoryServices } = require('../services');
// const { mapError } = require('../utils/errorMap');

const createCategory = async (req, res) => {
const categoryData = req.body;

const { message } = await CategoryServices.createCategory(categoryData);
res.status(201).json(message);
};

module.exports = {
  createCategory,
};
