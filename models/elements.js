var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./');

var MW = require('./mW');

var pt = require('periodic-table');

var ObjectId = mongoose.Schema.Types.ObjectId;



var elementSchema = new mongoose.Schema({
  name: {type: String, required: true},
  mW: {type: Number, required: true},
  formula: {type: String, required: true},
});

var fillElement = function (element) {
  if (element.name) {
    element.formula = pt.elements[element.name].symbol;
    element.mW = Number(pt.elements[element.name].atomicMass.slice(0, -3));
  }
  else if (element.formula) {
    element.name = pt.symbols[element.formula].name;
    element.mW = Number(pt.symbols[element.formula].atomicMass.slice(0, -3));
  } 
};

// elementSchema.path('name').set(function (name) {
//   this.formula = pt.elements[element.name];
//   return name;
// });

// elementSchema.path('formula').set(function (formula) {
//   this.name = pt.symbols[element.formula];
//   return formula;
// });


elementSchema.pre('validate', function (next) {
  fillElement(this);

  next();
});

elementSchema.methods.populateMW = function () {
  return this.constructor.findOne(this._id).populate('mW');
}


var Element = mongoose.model('Element', elementSchema);

module.exports = Element;
