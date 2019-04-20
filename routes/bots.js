var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('bots', { title: 'Testing Bot' });
});

module.exports = router;