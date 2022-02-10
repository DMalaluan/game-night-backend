const jwt = require('jsonwebtoken');
const { env } = require('.');

module.exports = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, env.token, (err, decoded) => {
      if (err) {
        res.sendStatus(400);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};
