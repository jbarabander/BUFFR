var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Buffer = require('../models/buffers');
var Promise = require('bluebird');

/* GET users listing. */


router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('bufferAdd');
});

router.post('/', function(req, res, next) {
  var promiseArr = [];
  var newBuffer = new Buffer();
  if (req.body.userId) {
    promiseArr.push(User.findOne({_id: req.body.userId}).exec());
    newBuffer.user = req.body.userId;
  }
  newBuffer.volume = req.body.volume;
  promiseArr.push(newBuffer.save());
  Promise.all(promiseArr)
  .then(function (returnArr) {
    if (returnArr.length === 2) {
      newBuffer = returnArr[1];
      var user = returnArr[0];
      return user.addBuffer(newBuffer);
    } else newBuffer = returnArr[0];
  })
  .then(function () {
    res.redirect('/buffers/' + newBuffer._id);
  }).catch(next);
});

router.param('bufferId', function (req, res, next, bufferId) {
  Buffer.findOne({_id: bufferId})
  .populate('user')
  .then(function (buffer) {
    buffer.storeAmounts();
    req.buffer = buffer;
    next();
  }).catch(next);
});

router.get('/:bufferId', function (req, res, next) {
  res.render('bufferPage', {buffer: req.buffer});
});

router.post('/:bufferId', function (req, res, next) {
  req.buffer.addCompound(req.body.compound, req.body.concentration)
  .then(function () {
    res.redirect('/buffers/' + req.params.bufferId);
  });
});


module.exports = router;
