module.exports = (loginInfo) => {
  if (!loginInfo) return { type: 'INVALID_VALUE', message: 'Invalid fields' };
  return { type: null, message: '' };
};