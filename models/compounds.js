var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promise = require('bluebird');
require('./');
var utils = require('../utilities.js');
var compoundMatcher = utils.compoundMatcher;
var Element = require('./elements');

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

compoundSchema.methods.getElements = function () {
  var elArr = compoundMatcher(this.formula);
  var promArr = [];
  elArr.forEach(function (el) {
    var number = parseInt((el.match(/\d+/) || '1')[0]);
    var elStripped = el.replace(/\d+/, '');

    promArr.push(findOne({formula: elStripped}).exec().then(function(element) {
      return {value: element._id, number: number};
    }));
  });
  Promise.all(promArr).then(function(elements) {
    this.elements = elements;
  });
};


compoundSchema.pre('validate', function (next) {
  if (!this.formula) return next();
  this.getElements().catch(next);
});


var Compound = mongoose.model('Compound', compoundSchema);

module.exports = Compound;
