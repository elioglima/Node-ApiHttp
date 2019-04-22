var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var pool = require('../../../../configs/priv_database.js');
    var mensagens = [{msg:"oi"}]
    res.json({msg:mensagens});
});

module.exports = router;
