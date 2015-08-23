var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Buffer = require('./buffers');
var Promise = require('bluebird');

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
  },
  buffers: [Object]
});

userSchema.methods.addBuffer = function (buffer) {
  var self = this;
  console.log(self);
  self.buffers.push(buffer);
  return self.save()
  .then(null, function (err) { console.log(err); });
};



var User = mongoose.model('User', userSchema);

module.exports = User;