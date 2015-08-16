var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
require('./');
var Compound = require('./compounds');

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

bufferSchema.path('volume').set(function (volStr) {
  return this.strParse(volStr, ['L', 'cL', 'dL', 'mL', 'uL']);
});

bufferSchema.methods.strParse = function (str, possibles) {
  var number = str.match(/\d+/)[0];
  if (!number) throw new Error("No number given");
  var unit = str.match(/[a-zA-Z]+/)[0];
  if (possibles.indexOf(unit) === -1) throw new Error("Could not parse unit")
  return {value: Number(number), units: unit};
}


bufferSchema.methods.addCompound = function (compoundStr, str) {
  var concentration = this.strParse(str, ['M', 'mM', 'uM', 'nM', 'pM']);
  var self = this;
  return Compound.create({formula: compoundStr})
  .then(function (compound) {
    var compObj = {value: compound._id, concentration: concentration};
    self.compounds.push(compObj);
    return compObj;
  }); 
};

bufferSchema.methods.measureAmount = function (compound, volume) {

}

bufferSchema.methods.getAmounts = function (compoundStr, str) {
  this.findOne({_id: this._id}).populate('compounds') // check to make sure this works
  .then(function (buffer) {
    buffer.compounds.forEach(function (compound) {

    });
  });
};

var Buffer = mongoose.model('Buffer', bufferSchema);


module.exports = Buffer;

















