var express = require('express');
var router = express.Router();
var User = require('../models/users');

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
  User.create({
    name: {
      first: req.body.firstName,
      last: req.body.lastName
    },
    username: req.body.username,
    email: req.body.email
  })
  .then(function (user) {
    res.redirect('/users/' + user._id);
  })
  res.end();
});

router.param('userId', function (req, res, next, userId) {
  User.findOne({_id: userId})
  .then(function (user) {
    req.user = user;
    next();
  }).catch(next);
});

router.get('/:userId', function (req, res, next) {
  res.render('userPage', {user: req.user});
});


module.exports = router;
