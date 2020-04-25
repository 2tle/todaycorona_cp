var express = require('express');
var router = express.Router();
var main = require('./route/main');
var req = require('./route/request');

router.use('/',main);
router.use('/request',req);

module.exports = router;