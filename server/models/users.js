var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Buffer = require('./buffers');
var Promise = require('bluebird');

var deepPopulate = require('mongoose-deep-populate')(mongoose);


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
  buffers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Buffer'}]
});

userSchema.plugin(deepPopulate);

userSchema.methods.addBuffer = function (buffer) {
  var self = this;
  self.buffers.push(buffer._id);
  return self.save()
  .then(null, function (err) { console.log(err); });
};


userSchema.methods.addBufferStrings = function () {
  var self = this;
  var buffersStore;
  return self.populateBuffers()
  .then(function (user) {
    return Promise.map(user.buffers, function (buffer) {
      return buffer.populateCompounds();
    });
  })
  .then(function (buffers) {
    buffersStore = buffers
    return Promise.map(buffers, function (buffer) {
      return buffer.toString();
    });
  })
  .then(function (bufferStrings) {
    return buffersStore.map(function (buffer, index) {
      buffer.string = bufferStrings[index];
      return buffer;
    });
  });
};


userSchema.methods.populateBuffers = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.deepPopulate('buffers.value', function (err, user) {
      if (err) reject(err);
      resolve(user);
    });
  });
};


var User = mongoose.model('User', userSchema);

module.exports = User;