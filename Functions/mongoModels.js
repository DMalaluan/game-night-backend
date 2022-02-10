const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
 
  username: String,
  password: String,
  state: String,
  city: String,
  birthday: Date,
  email: String,
  
  
});

module.exports = {
  users: mongoose.model('users', usersSchema),
};