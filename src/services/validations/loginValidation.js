module.exports = (loginInfo) => {
  if (loginInfo.length === 0) return { type: 'INVALID_VALUE', message: 'Invalid fields' };
  return { type: null, message: '' };
};