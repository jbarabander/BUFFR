var Promise = require('bluebird');
var Element = require('./models/elements');


compoundMatcher = function (str) {
  var formula = formulaParser(str);
  return Object.keys(formula).map(function(element) {
    if(formula[element] === 1) return element;
    return element + formula[element];
  });
};


function formulaParser(formula) {
    formula = simplify(formula);
    return objectComposer(formula);
 }


function simplify(formula) {
    var regEx = /(\(([A-Z][a-z]?\d*)+\)\d*|\[([A-Z][a-z]?\d*)+\]\d*|\{([A-Z][a-z]?\d*)+\}\d*)/g;
    var f = formula.match(regEx);
         while(f) {
             f.forEach(function(element) {
             var number = element.match(/\d+$/g);
             if(number) number = parseInt(number);
             else number = 1;
             var innerMatch = element.match(/[A-Z][a-z]?\d*/g);
             var str = '';
             innerMatch.forEach(function(subStr) {
                var subNumber = subStr.match(/\d+$/g);
                if(subNumber) subStr = subStr.replace(subNumber, parseInt(subNumber) * number);
                else {
                    if(number !== 1) subStr += number;
                }
                str += subStr;
            })
             formula = formula.replace(element, str);
        });
         f = formula.match(regEx);
     }
     return formula;
}


 function objectComposer(formula) {
    var elementsObj = {}, newMatches = formula.match(/[A-Z][a-z]?\d*/g),
    el, number;
    newMatches.forEach(function(element) {
        el = element.match(/[A-Z][a-z]?/g);
        var number = parseInt((element.match(/\d+/g) || '1')[0]);
        if(elementsObj[el]) elementsObj[el] += number;
        else elementsObj[el] = number;
    })
    return elementsObj;
 }


elementMatcher = function (str) {
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

getNumbers = function (formula) {
  var elArr = compoundMatcher(formula);
  return elArr.map(function (el) {
    if (/\d/.test(el)) {
      return el.match(/\d+/)[0];
    } else return 1;
  });
};

///////////////////Justin's suggestions////////////////
// What do you think of this?
getElements = function (formula) {
  var self = this;
  var elArr = compoundMatcher(formula);
  elArr = elArr.map(function (el) {
    var number = parseInt((el.match(/\d+/) || '1')[0]);
    var elStripped = el.replace(/\d+/, '');
    var elObj = {
      value: Element.findOne({formula: elStripped}).exec(),
      number: number
    };
    return Promise.resolve(elObj);
  });
  console.log(elArr);
  Promise.all(elArr).then(elementIdFetcher).then(function(elements) {});
};
//Instead of building out a whole elementMatcher why not do this instead?
function elementIdFetcher(elArr) {
  return elArr.map(function(el) {
    var newObj = {value: el.value._id, number: el.number};
    return newObj;
  });
}

module.exports = {
  getElements: getElements,
  getNumbers: getNumbers,
  compoundMatcher: compoundMatcher,
  elementIdFetcher: elementIdFetcher
};

// new regex: /(\(([A-Z][a-z]?\d*)+\)\d+|[A-Z][a-z]?\d*)/g
