const { UserService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createUser = async (req, res) => {
  const userData = req.body;
  const { type, message } = await UserService.createUser(userData);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json({ token: message });
};

module.exports = {
  createUser,
};