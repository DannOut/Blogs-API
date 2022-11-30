const { loginSchema } = require('../utils/schema');

module.exports = (req, res, next) => {
  const loginInfo = req.body;
  const validation = loginSchema.validate(loginInfo);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};
