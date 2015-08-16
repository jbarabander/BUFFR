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

bufferSchema.methods.concStrParse = function (concStr) {
  var number = concStr.match(/\d+/)[0];
  if (!number) throw new Error("No number given");
  return {value: number};
}
bufferSchema.methods.fn = function () {
  throw new Error();
};

bufferSchema.methods.addCompound = function (compoundStr, concStr) {

};

var Buffer = mongoose.model('Buffer', bufferSchema);


module.exports = Buffer;

















