const router = require('express').Router();
const moment = require('moment');
const { v4: uuid } = require('uuid');
const { ajv, bcrypt, models } = require('../Functions');

router.post('/signup', (req, res) => {
  const valid = ajv.validateSignup(req.body);
  if (valid === null) {
    models.users.findOne({
      username: req.body.username,
    }).then((user) => {
      if (!user) {
        new models.users({
          username: req.body.username,
          password: bcrypt.generate(req.body.password),
          state: req.body.state,
          city: req.body.city,
          birthday: new Date(req.body.birthday),
          email: req.body.email,
        }).save().then((newAccount) => {
          req.session.username = req.body.username;
          res.status(201).json({
            status: 201,
            message: 'Account created successfully',
            user: { // Check for necessity ID and cakeDay
              username: req.body.username,
              id: newAccount.id,
              birthday: req.body.birthday,
            },
          });
        }).catch((err) => {
          console.error(err);
          res.status(500).json({
            status: 500,
            message: 'An unknown error occured, we will investigate it as soon as possible',
          });
        });
      } else {
        res.status(403).json({
          status: 403,
          message: `An account with an username of: ${req.body.username} already exsists`,
        });
      }
    });
  } else {
    res.status(403).send({ status: 403, message: 'Invalid request body', reason: valid });
  }
});

router.post('/login', (req, res) => {
  //console.log(req.session.user);
  const valid = ajv.validateLogin(req.body);
  if (req.session.user !== undefined) {
    res.redirect(301, (req.query.redirectTo || '/'));
  } else if (valid === null) {
    models.users.findOne({
      username: req.body.username,
    }, {
      _id: 0,
    }, async (err, user) => {
      if (user) {
        if (bcrypt.compare(req.body.password, user.password)) {
          req.session.user = {
            id: user.id,
            username: user.username,
          };
          //console.log("log")
          res.redirect(301, (req.query.redirectTo || '/'));
        } else {
          res.status(400).send('Incorrect username or password.');
        }
      } else {
        res.status(400).send('Incorrect username or password.');
      }
    });
  } else {
    res.status(403).send({ status: 403, message: 'Invalid request body', reason: valid });
  }
  //console.log('tempLogNumber1');
});

router.get('/whoami', (req, res) => {
  if (req.session && req.session.user.username !== null && req.session.user.username !== undefined) {
    res.send(`Logged in as: ${req.session.user.username}`);
  } else {
    res.send('Currently not logged in');
  }
});

router.get('/', (req, res) => {
  //console.log(req.session)
  if (req.session && req.session.user.username !== null && req.session.user.username !== undefined) {
    res.send(`Logged in as: ${req.session.user.username}\nThis is not the front page of the internet.`);
  } else {
    res.send('Currently not logged in');
  }
});

module.exports = router;
