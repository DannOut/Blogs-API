module.exports = (loginInfo) => {
  console.log('LOGIN INFO', loginInfo);
  if (!loginInfo) return { type: 'INVALID_VALUE', message: 'Invalid fields' };
  return { type: null, message: '' };
};