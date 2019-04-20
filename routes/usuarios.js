var express = require('express');
var router = express.Router();
var pool = require('../configs/priv_database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var sSQL = 'select id, nome from usuarios';
    pool.query(sSQL, function (err, result, fields) {
        if (err) res.json(err)
        res.json(result);
    });
       
});

module.exports = router;
