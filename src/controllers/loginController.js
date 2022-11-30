const { UserService } = require('../services');
const { mapError } = require('../utils/errorMap');

const createLogin = async (req, res) => {
  const userData = req.body;

  const { type, message } = await UserService.createLogin(userData);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json({ token: message });
};

module.exports = {
  createLogin,
};