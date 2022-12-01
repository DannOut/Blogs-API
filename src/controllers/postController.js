const { PostServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const createPost = async (req, res) => {
  const baseBody = req.body;
  const tokenInfo = req.user;
  const { type, message } = await PostServices.createPost(baseBody, tokenInfo);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await PostServices.getAll();
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  createPost,
  getAll,
};
