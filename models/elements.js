var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./');

var pt = require('periodic-table');


var elementSchema = new mongoose.Schema({
  mW: {type: Number, required: true },
  formula: {type: String, required: true},
});

var getWeight = function (formula) {
  return Number(pt.symbols[formula].atomicMass.slice(0, -3));
};

elementSchema.path('mW').validate(function (given) {
  var realMW = getWeight(this.formula);
  return Math.abs(realMW - given) < 0.1;
})

elementSchema.virtual('name').get(function () {
  return pt.symbols[this.formula].name;
});

elementSchema.pre('validate', function (next) {
  if (this.formula && !this.mW) this.mW = getWeight(this.formula);
  next();
});


var Element = mongoose.model('Element', elementSchema);

module.exports = Element;
