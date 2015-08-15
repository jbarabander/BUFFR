var Promise = require('bluebird');
var Element = require('./models/elements');

module.exports.compoundMatcher = function (str) {
  str = str.replace(/\(/g,'').replace(/\)/g, '');
  return str.match(/[A-Z][a-z]?\d?/g);
};

module.exports.elementMatcher = function (str) {};

module.exports.getNumbers = function (formula) {
  var elArr = compoundMatcher(formula);
  return elArr.map(function (el) {
    if (/\d/.test(el)) {
      return el.match(/\d+/)[0];
    } else return 1;
  });
}

module.exports.getElements = function (formula) {
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



