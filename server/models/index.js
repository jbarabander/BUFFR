var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!

// use database in process.env.BUFFR_DB
mongoose.connect('mongodb://localhost/' + process.env.BUFFR_DB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


















