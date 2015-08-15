var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./')

var ObjectId = mongoose.Schema.Types.ObjectId;

var compoundSchema = new mongoose.Schema({
  formula: {type: String, required: true},
  mW: {type: ObjectId, required: true, ref: 'MW'},
  elements: {
    type: [{
      value: {
        type: ObjectId, 
        ref: 'Element'
      },
      number: {
        value: Number,
        units: {type: String, enum: ['M', 'mM', 'uM', 'nM', 'pM']}
      }
    }],
    required: true
  }
});

var Compound = mongoose.model('Compound', compoundSchema);

module.exports = Compound;
