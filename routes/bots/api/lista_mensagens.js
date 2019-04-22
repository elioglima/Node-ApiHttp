var express = require('express');
var router = express.Router();
var pool = require('../../../configs/priv_database.js');

/* GET home page. */
router.post('/', function(req, res, next) {
    
    var UID = req.body.C1;
    var token = require('../../../libs/token');
    token = token.decodificar(req.body);
    
    if (token.Status != 200) {
        res.json({
            Status:token.Status,
            Response:token.Response,
        });       
    }

    console.log('debug', token);

    var pool = require('../../../configs/priv_database.js');
    
    var sSQL = 'select id, data, mensagem, resposta  from boex_conversa';    
    sSQL += ' where identificador = ' + "'" + token.IDT + "'";
    if (UID != '-1')
        sSQL += ' and id > ' + UID;

    pool.query(sSQL, function (err, result, fields) {
        var json = {
                    api:"mensagens",
                    Token:token.Token.A1,                    
                    UID:UID
                };

        if (err) {
            json.Response = err;            
            res.json(json)
            return false;
        }

        if (result.length == 0) {
            json.Response = 'Nenhum resultado encontrado.';            
        } else {
            json.Response = 'Pesquisa bem sucedida.';
            json.Rows = result;                        
            json.UID  = result[result.length-1].id
        }
        
        res.json(json)

    });
});

module.exports = router;
