const { categorySchema } = require('../utils/schema');

module.exports = (req, res, next) => {
  const categoryInfo = req.body;
  const { error } = categorySchema.validate(categoryInfo);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  next();
};
