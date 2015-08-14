var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./')

var ObjectId = mongoose.Schema.Types.ObjectId;

var elementSchema = new mongoose.Schema({
  name: {type: String, required: true},
  mW: {type: ObjectId, required: true, ref: 'MW'},
  formula: {type: String, required: true},
});

var Element = mongoose.model('Element', elementSchema);

module.exports = Element;
