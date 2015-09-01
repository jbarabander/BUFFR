var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Promise = require('bluebird');

/* GET users listing. */


router.get('/', function(req, res, next) {
  
  User.find()
  .then(function (users) {
    res.render('users', {users: users});
  });
});

router.get('/add', function(req, res, next) {
  res.render('userAdd');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  User.create(req.body)
  .then(function (user) {
    res.send(user);
  });
});

router.param('userId', function (req, res, next, userId) {
  User.findOne({_id: userId})
  .then(function (user) {
    req.user = user;
    next();
  }).catch(next);
});

router.get('/:userId', function (req, res, next) {
  req.user.addBufferStrings()
  .then(function (buffers) {
    console.log(buffers);
    res.render('userPage', {user: req.user, buffers: buffers});
  })
});


module.exports = router;
