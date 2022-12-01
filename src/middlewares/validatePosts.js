const { postsSchema } = require('../utils/schema');

module.exports = (req, res, next) => {
  const postInfo = req.body;
  const { error } = postsSchema.validate(postInfo);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};