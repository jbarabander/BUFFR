var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('./')

var ObjectId = mongoose.Schema.Types.ObjectId;

var volumeSchema = new mongoose.Schema({
  value: {type: Number, required: true},
  units: {
    type: String, 
    enum: ['L', 'cL', 'dL', 'mL', 'uL'], 
    required: true
  },
});

var Volume = mongoose.model('Volume', volumeSchema);

module.exports = Volume;
