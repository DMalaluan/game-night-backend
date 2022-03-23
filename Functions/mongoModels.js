const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  id: String,
  username: String,
  password: String,
  state: String,
  city: String,
  birthday: Date,
  email: String,
  favGame: String,
});

const eventSchema = mongoose.Schema({
  eventName: String, 
  eventHostname: String,
  eventDescription: String, //Might remove depending on event popup
  eventGame: String,
  eventAddress: String, //Maybe have to format address data
  //eventTime: String, //Event date and time formatted together
  //eventMaxAttendance: Number,
  //eventAttending: Number,
});

module.exports = {
  users: mongoose.model('users', usersSchema),
  events: mongoose.model('events', eventSchema),
};
