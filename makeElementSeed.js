var fs = require('fs');
var pt = require('periodic-table');

var elements = pt.all();

var seedElements = elements.map(function (element) {
  var newEl = {};
  newEl.formula = element.symbol;
  if (typeof element.atomicMass === 'string')
    var mass = Number(element.atomicMass.slice(0, -3));
  else mass = element.atomicMass[0];
  console.log(mass)
  // element.atomicMass = element.atomicMass.replace(/[\(\)]/, "");
  newEl.mW = Number(mass);
  return newEl;
});

fs.writeFile('seeds/elements.json', JSON.stringify(seedElements, null, '\t'))

console.log(pt.symbols.Uus);