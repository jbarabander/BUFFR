var Promise = require('bluebird');
var Element = require('./models/elements');


module.exports.compoundMatcher = function (str) {
  var matchedExp = str.match(/(\(([A-Z][a-z]?\d*)+\)\d+|[A-Z][a-z]?\d*)/g);
  var newArr = [];
  for(var i = 0; i < matchedExp.length; i++) {
    var x = matchedExp[i].match(/\)\d+/g);
    if(matchedExp[i].match(/\)\d+/g)) {
        var number = parseInt(x[0].slice(1));
        var iArr = matchedExp[i].match(/[A-Z][a-z]?\d*/g);
        var newElement = '';
        for(var j = 0; j < iArr.length; j++) {
            var y = iArr[j].match(/\d+/g);
            newElement += y ? iArr[j].replace(parseInt(y), parseInt(y) *
            number) : iArr[j] + number;
        }
        newArr.push(newElement);
    }
    else newArr.push(matchedExp[i]);
  }
  return newArr.join('').match(/[A-Z][a-z]?\d*/g);
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
};

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

///////////////////Justin's suggestions////////////////
// What do you think of this?
module.exports.getElements = function (formula) {
  var elArr = module.exports.compoundMatcher(formula);
  elArr = elArr.map(function (el) {
    var number = parseInt((el.match(/\d+/) || '1')[0]);
    var elObj = {
      value: Element.findOne({formula: el}).exec(),
      number: number
    };
    return Promise.resolve(elObj);
  });
  console.log(elArr);
  return Promise.all(elArr).then(elementIdFetcher);
};
//Instead of building out a whole elementMatcher why not do this instead?
function elementIdFetcher(elArr) {
  return elArr.map(function(el) {
    var newObj = {value: el.value._id, number: el.number};
    return newObj;
  });
}

// new regex: /(\(([A-Z][a-z]?\d*)+\)\d+|[A-Z][a-z]?\d*)/g
