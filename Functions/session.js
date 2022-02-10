const session = require('express-session');
const env = require('./env.js');

const { sessionSecret } = env;

module.exports = session({
  cookie: {
    httpOnly: false,
    path: '/',
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  secret: sessionSecret,
});
