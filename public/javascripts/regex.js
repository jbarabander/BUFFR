
function compoundMatcher(str){
  var str = str.replace(/\(/g,'').replace(/\)/g, '');
  return str.match(/[A-Z][a-z]?\d?/g);
}

var x = compoundMatcher('NaCl2');

var molecularWeight = x.reduce(function())
