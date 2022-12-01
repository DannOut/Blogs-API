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
console.log('TYPE', type);
console.log('MESSAGE', message);
if (type) return res.status(mapError(type)).json({ message });
res.status(200).json(message);
};

module.exports = {
  createUser,
  getAll,
};