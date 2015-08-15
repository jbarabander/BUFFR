var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
require('./');

var bufferSchema = new mongoose.Schema({
  volume: { 
    type: {
      value: {type: Number},
      units: {
        type: String, 
        enum: ['L', 'cL', 'dL', 'mL', 'uL']
      }
    },
    required: true
  },
  compounds: [{
    value: {
      type: ObjectId, 
      ref: 'Compound'
    },
    concentration: {
      value: Number,
      units: {type: String, enum: ['M', 'mM', 'uM', 'nM', 'pM']}
    }
  }],
  user: {type: ObjectId, ref: 'User'}
});


var Buffer = mongoose.model('Buffer', bufferSchema);


module.exports = Buffer;