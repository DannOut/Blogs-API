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

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await PostServices.getById(id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const baseBody = req.body;
  const token = req.user;

  const { type, message } = await PostServices.updatePost(id, baseBody, token);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.user;

  const { type, message } = await PostServices.deletePost(id, token);
  if (type) return res.status(mapError(type)).json({ message });

  // res.status(204).json(message);
  res.status(204).end();
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await PostServices.getByQuery(q);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
  getByQuery,
};
