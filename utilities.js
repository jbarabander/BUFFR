var Promise = require('bluebird');
var Element = require('./models/elements');


module.exports.compoundMatcher = function (str) {
  str = str.replace(/\(/g,'').replace(/\)/g, '');
  return str.match(/[A-Z][a-z]?\d*/g);
};

module.exports.elementMatcher = function (str) {
  str = str.replace(/\(/g,'').replace(/\)/g, '');
  var elements = str.match(/[A-Z][a-z]?\d?/g);
  var numbers = elements.map(function (el) {
    if (/\d/.test(el)) {
      return parseInt(el.match(/\d+/)[0]);
    } else return 1;
  });
  var proms = elements.map(function (element) {
    element = element.replace(/\d+/, "");
    return Element.findOne({formula: element});
  });
  return Promise.all(proms)
  .then(function (elements) {
    var realElArr = elements.map(function (realEl, index) {
      return {value: realEl._id, number: numbers[index]};
    });
    return realElArr;
  });
};

module.exports.getNumbers = function (formula) {
  var elArr = compoundMatcher(formula);
  return elArr.map(function (el) {
    if (/\d/.test(el)) {
      return el.match(/\d+/)[0];
    } else return 1;
  });
}

// module.exports.getElements = function (formula) {
//   var elArr = compoundMatcher(formula);
//   var numbers = [];
//   elArr = elArr.map(function (el) {
//     if (/\d/.test(el)) {
//       numbers.push(el.match(/\d+/)[0]);
//     } else numbers.push(1);
//     var elObj = {
//       value: Element.findOne({formula: el}).exec(),
//       number: number //number isn't defined anywhere did you mean numbers?
//     } 
//     return Promise.resolve(elObj);
//   });
//   console.log(elArr);
//   return Promise.all(elArr);
// };

//What do you think of this? 
module.exports.getElements = function (formula) {
  var elArr = compoundMatcher(formula);
  elArr = elArr.map(function (el) {
    var number = parseInt((el.match(/\d+/) || '1')[0]);
    var elObj = {
      value: Element.findOne({formula: el}).exec(),
      number: number
    } 
    return Promise.resolve(elObj);
  });
  console.log(elArr);
  return Promise.all(elArr);
};


