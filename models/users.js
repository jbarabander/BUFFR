var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  name: {
    type: {
      first: String,
      last: String
    },
    required: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;