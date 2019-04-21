'use strict';

const CHVA = 'Q0hBVkVBVVRIRU5USUNBQ0FP'; 
var fdate  = require('./fn_date');
var fstring  = require('./fn_string');
var fint  = require('./fn_int');

var base64 = require('base-64');

module.exports.keygen = (client) => {

    var sizeIDT = 15;

    if(!client.hasOwnProperty('CHVA')) 
        return {StatusCode: 5001, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('DVS')) 
        return {StatusCode: 5002, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('CDE')) 
        return {StatusCode: 5003, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('TPI')) 
        return {StatusCode: 5004, Response:"Authenticação não autorizada."};

    if (client.TPI.toString().trim().length != 4) 
        return {StatusCode: 5005, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('IDT')) 
        return {StatusCode: 5006, Response:"Authenticação não autorizada."};
    
    if (client.IDT.toString().trim().length > sizeIDT) 
        return {StatusCode: 5007, Response:"Authenticação não autorizada."};
    
    if (client.CHVA != CHVA) 
        return {StatusCode: 5008, Response:"Authenticação não autorizada."};
    
    var DVS = client.DVS.trim(); 
    if (DVS.length == 0)  
        return {StatusCode: 5009, Response:"Authenticação não autorizada."};        
    
    var DVSdec = base64.decode(DVS).trim();    

    if (DVSdec.length != 12)  
        return {StatusCode: 5010, Response:"Authenticação não autorizada."};
    
    var dia  = DVSdec.substring(0, 2);
    var mes  = DVSdec.substring(2, 4);
    var ano  = DVSdec.substring(4, 8);
    var hora = DVSdec.substring(8, 10);
    var min  = DVSdec.substring(10, 12);

    var sData = ano+'-'+mes+'-'+dia+'T'+hora+':'+min+':00.000Z';
    var data = new Date(sData);        

    if (data < fdate.adds(data, 'minute', -30)) 
        return {StatusCode: 5011, Response:"Authenticação não autorizada."};

    if (data > fdate.adds(data, 'minute', 30)) 
        return {StatusCode: 5012, Response:"Authenticação não autorizada."};
    
    // montagem do token

    // P1 - DATA DO TOKEN

    var data_hoje = new Date();        
    
    var A1 = data_hoje.getDate();
    var A2 = data_hoje.getMonth();
    var A3 = data_hoje.getFullYear();
    var A4 = data_hoje.getHours();
    var A5 = data_hoje.getMinutes();       
            
    // P2 - OPTIONS
    var A6 = fstring.formatLeft(client.CDE, 4, '0');
    var A7 = client.TPI;
    var A8 = fstring.formatLeft(client.IDT, sizeIDT, '0');
           
    // P3 - DATA VALIDADE TOKEN
    var data_validade = fdate.adds(data_hoje,'minute',30);
    var A9 = data_validade.getDate();
    var A10 = data_validade.getMonth();
    var A11 = data_validade.getFullYear();
    var A12 = data_validade.getHours();
    var A13 = data_validade.getMinutes(); 

    // P4 - VERIFICADOR 
    var Verificador = A4.toString()+A1.toString()+A3.toString()+A2.toString()+A5.toString();
    var Verificador64 = base64.encode(Verificador);
    var A14 = base64.encode(Verificador64);
        
    // Montagem do token
    var Bloco1 = A5.toString()+A11.toString()+A2.toString()+A13.toString()+A7.toString();
    var Bloco2 = A4.toString()+A6.toString()+A3.toString()+A12.toString()+A10.toString()+A9.toString()+A1.toString();
    var Bloco3 = A8.toString();      
    var Bloco4 = A14.toString();

    var B1 = base64.encode(Bloco1);
    var B2 = base64.encode(Bloco2);
    var B3 = base64.encode(base64.encode(base64.encode(base64.encode(Bloco3))));
    var B4 = base64.encode(Bloco4);

    var B31 = '';
    var B32 = '';
    var B33 = '';
    var B34 = '';
    var B35 = '';
    var B36 = '';

    B31 = B3.substring(0, fint.ifthen((B3.toString().trim().length < 20), B3.toString().trim().length, 20));

    if (B3.toString().trim().length > 20)
        B36 = B3.substring(20, fint.ifthen((B3.toString().trim().length > 20) && (B3.toString().trim().length < 40), B3.toString().trim().length, 40));

    if (B3.toString().trim().length > 40)
        B33 = B3.substring(40, fint.ifthen((B3.toString().trim().length > 40) && (B3.toString().trim().length < 60), B3.toString().trim().length, 60));
    
    if (B3.toString().trim().length > 60)
        B35 = B3.substring(60, fint.ifthen((B3.toString().trim().length > 60) && (B3.toString().trim().length < 80), B3.toString().trim().length, 80));
    
    if (B3.toString().trim().length > 80)
        B32 = B3.substring(80, fint.ifthen((B3.toString().trim().length > 80) && (B3.toString().trim().length < 100), B3.toString().trim().length, 100));

    if (B3.toString().trim().length > 1000)
        B34 = B3.substring(100, fint.ifthen((B3.toString().trim().length > 100) && (B3.toString().trim().length < 120), B3.toString().trim().length, 120));

    var retorno = {
        Status:200,
        Mensagem:"Sucesso",    	
        Token: {
            B1: B1,
            B2: B2,
            B3: {
                B31:B31,
                B32:B32,
                B33:B33,
                B34:B34,
                B35:B35,
                B36:B36
            },
            B4: B4
        }
    };
    
    
    console.log("Sucesso", retorno);
    return retorno;
}