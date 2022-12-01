const { userSchema } = require('../utils/schema');

module.exports = (req, res, next) => {
  const userInfo = req.body;
  const { error } = userSchema.validate(userInfo);
  if (error) {
    const { message } = error.details[0];
    return res
      .status(400)
      .json({ message });
  }
  next();
};
