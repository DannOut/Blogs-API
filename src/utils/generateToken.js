const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (info) => {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign({ ...info }, JWT_SECRET, jwtConfig);
  // const token = jwt.sign({ data }, JWT_SECRET, jwtConfig);

  return token;
};