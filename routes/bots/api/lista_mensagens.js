var express = require('express');
var router = express.Router();
var pool = require('../../../configs/priv_database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.json({teste:"teste"});
    
       
});

module.exports = router;
