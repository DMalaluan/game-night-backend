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
          //birthday: new Date(Date.parse(req.body.birthday)), //Need to format to date not string
          email: req.body.email,
          favGame: req.body.favGame,
        }).save().then((newAccount) => {
          req.session.username = req.body.username;
          res.status(201).json({
            status: 201,
            message: 'Account created successfully',
            user: { // Send message back w info
              username: req.body.username,
              id: newAccount.id,
              //birthday: req.body.birthday, //Need to format to date not string
              //birthday: new Date(Date.parse(req.body.birthday)), 
              state: req.body.state,
              city: req.body.city,
              email: req.body.email,
              favGame: req.body.favGame,
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
  const valid = ajv.validateLogin(req.body);
  console.log(req.session);
  if (req.session.user !== undefined) {
    res.redirect(301, (req.query.redirectTo || '/'));
  } else if (valid === null) {
    models.users.findOne({
      username: req.body.username,
    }, {
      _id: 0,
    }, async (err, user) => {
      console.log(user);
      if (user) {
        if (bcrypt.compare(req.body.password.value, user.password)) {
          req.session.user = {
            id: user.id,
            username: user.username,
          };
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
});

router.post('/createEvent', (req, res) => {
  const valid = ajv.validateEvent(req.body);
  console.log(req.body);
  if (valid === null) {
    models.events.findOne({
      event: req.body.eventName,
    }).then((event) => {
      if (!event) {
        new models.events({
          eventName: req.body.eventName,
          eventHostname: req.body.eventHostname,
          eventDescription: req.body.eventDescription,
          eventGame: req.body.eventGame,
          eventAddress: req.body.eventAddress,
        }).save().then((newEvent) => {
          req.session.eventName = req.body.eventName;
          res.status(201).json({
            status: 201,
            message: 'Event created successfully',
            event: { // Send message back w info
              id: newEvent.id,
              eventName: req.body.eventName,
              eventHostname: req.body.eventHostname,
              eventDescription: req.body.eventDescription,
              eventGame: req.body.eventGame,
              eventAddress: req.body.eventAddress,
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
          message: `An event with the name of: ${req.body.eventName} already exsists`,
        });
      }
    });
  } else {
    res.status(403).send({ status: 403, message: 'Invalid request body', reason: valid });
  }
});

router.get('/whoami', (req, res) => {
  if (req.session && req.session.user && req.session.user.username !== null && req.session.user.username !== undefined) {
    res.send(`Logged in as: ${req.session.user.username}`);
  } else {
    res.send('Currently not logged in');
  }
});

router.get('/', (req, res) => {
    res.send(req.session.user || req.session);
    //console.log(req.session.user);
});

//currentUser
router.get('/curUser', (req, res) => {
  if (req.session && req.session.user && req.session.user.username !== null && req.session.user.username !== undefined) {
    models.users.findOne({ username: req.session.user.username }, { _id: 0 }).then((user) => {
      if (user) {
        res.status(200).json({
          status: 201,
          message: `User: ${user.username} found`,
          user,
        });
      } else {
        res.status(404).json({ status: 404, message: 'User not found' });
      }
    });
  } else {
    res.status(404).json({ status: 401, message: 'Not Signed In' });
  }
});

module.exports = router;
