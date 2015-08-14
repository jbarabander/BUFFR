var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true},
  },
  email: {
    type: String, 
    required: true,
    unique: true
  }
});