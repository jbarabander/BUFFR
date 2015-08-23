var express = require('express');
var router = express.Router();
var Buffer = require('../models/buffers');
var Element = require('../models/elements');

/* GET home page. */
router.get('/', function(req, res, next) {
  Element.find()
  .then(function (buffers) {
    res.render('index', { title: 'BUFFR', buffers: buffers });
  })
});

module.exports = router;
