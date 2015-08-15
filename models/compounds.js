var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./');

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

function compoundMatcher(str){
  var str = str.replace(/\(/g,'').replace(/\)/g, '');
  return str.match(/[A-Z][a-z]?\d?/g);
}


var Compound = mongoose.model('Compound', compoundSchema);

module.exports = Compound;
