var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var sassMiddleware = require('node-sass-middleware');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(path.join(__dirname, '../bower_components'));

app.use(express.static(path.join(__dirname, '../bower_components')));

// app.use(sassMiddleware({
//   src: path.join(__dirname, 'assets'),
//   dest: path.join(__dirname, 'public'),
//   debug: true
// }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/users', require('./routes/users'));
app.use('/api/buffers', require('./routes/buffers'));


var validFrontendRoutes = ['/', '/buffers', '/users', '/buffers/:id', '/users/:id', '/signup/new', '/signup/login'];
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile('index.html');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
