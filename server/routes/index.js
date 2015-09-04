var express = require('express');
var router = express.Router();
var Buffer = require('../models/buffers');
var Element = require('../models/elements');
var path = require('path');

/* GET home page. */
router.use('/', function(req, res, next) {
  res.sendFile(path.resolve('index.html'));
});

module.exports = router;
