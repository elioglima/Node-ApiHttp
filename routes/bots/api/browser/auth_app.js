var express = require('express');
var router = express.Router();
var pool = require('../../../../configs/priv_database.js');

/* GET home page. */
router.post('/', function(req, res, next) {
    var token = require('../../../../libs/token');
    var mensagens = req.body;    
    res.json(token.keygen(req.body));
});

module.exports = router;
