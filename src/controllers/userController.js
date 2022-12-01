const { UserService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createUser = async (req, res) => {
  const userData = req.body;
  const { type, message } = await UserService.createUser(userData);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json({ token: message });
};

const getAll = async (_req, res) => {
const { type, message } = await UserService.getAll();
if (type) return res.status(mapError(type)).json({ message });
res.status(200).json(message);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await UserService.getUser(id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  createUser,
  getAll,
  getUser,
};