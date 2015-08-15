var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./');

var MW = require('./mW');

var pt = require('periodic-table');

var ObjectId = mongoose.Schema.Types.ObjectId;



var elementSchema = new mongoose.Schema({
  name: {type: String, required: true},
  mW: {type: ObjectId, required: true, ref: 'MW'},
  formula: {type: String, required: true},
});

var fillElement = function (element) {
  if (element.name) {
    element.formula = pt.elements[element.name];
  }
  else if (element.formula) {
    element.name = pt.symbols[element.formula];
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
})


var Element = mongoose.model('Element', elementSchema);

module.exports = Element;
