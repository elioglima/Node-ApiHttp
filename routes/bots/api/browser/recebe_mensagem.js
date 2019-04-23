var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

    if(!req.body.hasOwnProperty('Token')) {
        res.json({
            Status:500,
            Response:"Token não informado",
        });   
        return false;
    }

    var token = require('../../../../libs/token');
    token = token.decodificar(req.body.Token);
    
    if (token.Status != 200) {
        res.json({
            Status:token.Status,
            Response:token.Response,
        });    
        return false;
    }

    var bots = require('../../../../controls/bots/bots.js');
    var Resposta = bots.recebe_mensagem({Token:token});

    res.json(Resposta);
});

module.exports = router;
