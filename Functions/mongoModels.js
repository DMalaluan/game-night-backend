const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({

  username: String,
  password: String,
  state: String,
  city: String,
  birthday: Date,
  email: String,
  favGame: String,
});
/*
const eventsSchema = mongoose.Schema({
  eventName: String, 
  eventHostname: String,
  eventDescription: String, //Might remove depending on event popup
  eventGame: String,
  eventAddress: String, //Maybe have to format address data
  eventTime: Date, //Event date and time formatted together
  eventMaxAttendance: Number,
  eventAttendance: Number,
});*/

module.exports = {
  users: mongoose.model('users', usersSchema),
  //events: mongoose.model('events', eventsSchema),
};
