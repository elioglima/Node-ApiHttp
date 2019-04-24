var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('bots/analytictools', { 
          Title: 'MaxBots',
          PathRoot: '../'
        });
});

module.exports = router;