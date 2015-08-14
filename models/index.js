var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/buffr');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


















