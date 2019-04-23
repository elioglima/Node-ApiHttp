var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var fs = require('fs');
    var templateHeardeString = fs.readFileSync('./templates/header.ejs', 'utf-8')
    
    console.log(templateHeardeString);
  
    res.render('bots', { 
          Title: 'MaxBots',
          Header:templateHeardeString
      });
});

module.exports = router;