const jwt = require('jsonwebtoken');
const env = require('./env.js');

function token() {
  return jwt.sign(
    {
      token: {
        info: 'info',
      },
    },
    env.token,
  );
}

console.log(`Token: ${token()}`);

module.exports = token;
