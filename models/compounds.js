var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');
require('./');
var Element = require('./elements');

Element.find({}) //FIXME??

var ObjectId = mongoose.Schema.Types.ObjectId;

var compoundSchema = new mongoose.Schema({
  formula: {type: String, required: true},
  mW: {type: Number, required: true},
  elements: {
    type: [{
      value: {
        type: ObjectId, 
        ref: 'Element'
      },
      number: Number,
    }],
    required: true
  }
});

var compoundMatcher = function (str) {
  str = str.replace(/\(/g,'').replace(/\)/g, '');
  return str.match(/[A-Z][a-z]?\d?/g)
};

var getNumbers = function (formula) {
  var elArr = compoundMatcher(formula);
  return elArr.map(function (el) {
    if (/\d/.test(el)) {
      return el.match(/\d+/)[0];
    } else return 1;
  });
}

var getElements = function (formula) {
  var elArr = compoundMatcher(formula);
  var numbers = [];
  elArr = elArr.map(function (el) {
    if (/\d/.test(el)) {
      numbers.push(el.match(/\d+/)[0]);
    } else numbers.push(1);
    var elObj = {
      value: Element.findOne({formula: el}).exec(),
      number: number 
    }
    return Promise.resolve(elObj);
  });
  console.log(elArr);
  return Promise.all(elArr);
};


// so I was just thinking about making our compound model just have one big
// pre-validate hook, where you could just do something like new Compound({formula: 'NaCl'})
// and then when validated, it would fill in MW, elements array, etc...
// you can see the utility functions I'm thinking about for this with tests
// in utilities.js
compoundSchema.methods.getMW = function(next) {
  return this.constructor.findOne(this).populate('elements.value').exec()
  .then(function(elements) {
    return elements.reduce(function(curr, prev) {
      return curr + prev.value.mW * prev.number;
    },0);
  })
  .catch(next);  
}; //FIXME


compoundSchema.pre('validate', function (next) {
  if (!this.formula) return next();
  getElements(this.formula)
  .then(function (realElArr) {
    this.elements = realElArr;
  }).catch(next);
});


var Compound = mongoose.model('Compound', compoundSchema);

module.exports = Compound;
