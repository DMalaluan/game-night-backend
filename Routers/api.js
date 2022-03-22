const router = require('express').Router();
const moment = require('moment');
const { v4: uuid } = require('uuid');
const {
  ajv, auth, generateQueryString, models,
} = require('../Functions');

router.get('/user/:id', auth, (req, res) => {
  models.users.findOne({ id: req.params.id }, { _id: 0 }).then((user) => {
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
});

router.get('/users', auth, (req, res) => {
  models.users.find(generateQueryString(req.query), { _id: 0 }).then((users) => {
    if (users) {
      res.status(200).json({
        status: 201,
        message: 'Users found',
        users,
      });
    } else {
      res.status(404).json({ status: 404, message: 'Users not found' });
    }
  });
});

router.patch('/user/:id', auth, (req, res) => {
  const valid = ajv.validateUser(req.body);
  if (valid === null) {
    models.users.findByIdAndUpdate(req.params.id , req.body, { new: true }, (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: 500,
          message: 'Account was not updated, please try again',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: `User ${req.params.id} updated successfully`,
        users: updatedUser,
      });
    });
  } else {
    res.status(403).send(valid);
  }
});

router.delete('/user/:id', auth, (req, res) => {
  models.users.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        message: 'Account was either not found or not deleted, please try again',
      });
      return;
    }
    res.sendStatus(204);
  });
});

router.get('/events', auth, (req, res) => {
  models.events.find(generateQueryString(req.query), { _id: 0 }).then((events) => {
    if (events) {
      res.status(200).json({
        status: 201,
        message: 'Events found',
        events,
      });
    } else {
      res.status(404).json({ status: 404, message: 'Events not found' });
    }
  });
});
module.exports = router;
