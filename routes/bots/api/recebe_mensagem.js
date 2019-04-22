var express = require('express');
var router = express.Router();
var pool = require('../../../configs/priv_database.js');

/* GET home page. */
router.post('/', function(req, res, next) {
    var mensagens = [{msg:"oi"}]
    res.json({msg:mensagens});
});

module.exports = router;
