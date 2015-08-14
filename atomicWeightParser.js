var fs = require('fs');


function atomicParse(){
  var atomicTable = [];
  fs.readFile('../static/csv/pt-data1.csv',function(err, data) {
    if(err){
      throw new Error(err);
    }
    var lines =  data.toString().split('\n');
    var titles = lines[0];
    lines = lines.slice(1);
    for (var i = 0; i < lines.length; i++) {
      var x = lines[i].split(',');
      obj = {};
      obj[titles[3]] = Math.round(Number(x[3].replace(/\(\d+\)$/, '')) * 100) / 100;
      obj[titles[2]] = x[2];
      obj[titles[1]] = x[1];
      obj[titles[0]] = x[0];
      atomicTable.push(obj);
    }
  });
  return atomicTable;
}

module.exports = atomicParse;
