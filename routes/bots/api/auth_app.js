var express = require('express');
var router = express.Router();
var pool = require('../../../configs/priv_database.js');
var token = require('../../../libs/token');

/* GET home page. */
router.post('/', function(req, res, next) {
    var mensagens = req.body;    
    res.json(token.keygen(req.body));
});

module.exports = router;
