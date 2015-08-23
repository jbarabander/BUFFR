var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
  .then(function (users) {
    res.render('users', {users: users});
  })
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
