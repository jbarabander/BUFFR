var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Buffer = require('./buffers');

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
  buffers: [Buffer.schema]
});

userSchema.methods.addBuffer = function (buffer) {
  var self = this;
  return new Promise(function (resolve, reject) {
    buffer.deepPopulate('compounds.value', function(err, buffer) {
      if (err) reject(err);
      resolve(buffer);
    });
  })
  .then(function (buffer) {
    self.buffers.push(buffer);
  });
};



var User = mongoose.model('User', userSchema);

module.exports = User;