var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var ObjectId = mongoose.Schema.Types.ObjectId;

var mWSchema = new mongoose.Schema({
  value: {type: Number, required: true},
  units: {
    type: String, 
    enum: ['g/mol', 'mg/mmol'],
    required: true
  }
});

var MW = mongoose.model('MW', mWSchema);

module.exports = MW;
