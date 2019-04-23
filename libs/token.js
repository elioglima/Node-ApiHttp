'use strict';

const sizeIDT = 15;
const CHVA = 'Q0hBVkVBVVRIRU5USUNBQ0FP'; 

var fdate  = require('./fn_date');
var fstring  = require('./fn_string');
var fint  = require('./fn_int');

module.exports.CHVA = CHVA; 



var keygen = (client) => {

    var base64 = require('base-64');

    if(!client.hasOwnProperty('CHVA')) 
        return {Status: 5001, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('DVS')) 
        return {Status: 5002, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('CDE')) 
        return {Status: 5003, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('TPI')) 
        return {Status: 5004, Response:"Authenticação não autorizada."};

    if (client.TPI.toString().trim().length != 4) 
        return {Status: 5005, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('IDT')) 
        return {Status: 5006, Response:"Authenticação não autorizada."};    
    
    if (client.CHVA != CHVA) 
        return {Status: 5007, Response:"Authenticação não autorizada."};
    
    var DVS = client.DVS.trim(); 
    if (DVS.length == 0)  
        return {Status: 5008, Response:"Authenticação não autorizada."};        
    
    var DVSdec = base64.decode(DVS).trim();    

    if (DVSdec.length != 12)  
        return {Status: 5009, Response:"Authenticação não autorizada."};
    
    var dia  = DVSdec.substring(0, 2);
    var mes  = DVSdec.substring(2, 4);
    var ano  = DVSdec.substring(4, 8);
    var hora = DVSdec.substring(8, 10);
    var min  = DVSdec.substring(10, 12);

    var sData = ano+'-'+mes+'-'+dia+'T'+hora+':'+min+':00.000Z';
    var data = new Date(sData);        

    if (data < fdate.adds(data, 'minute', -30)) 
        return {Status: 5010, Response:"Authenticação não autorizada."};

    if (data > fdate.adds(data, 'minute', 30)) 
        return {Status: 5011, Response:"Authenticação não autorizada."};
    
    // montagem do token

    // P1 - DATA DO TOKEN

    var data_hoje = new Date();       
    var A1 = fstring.ifthen(parseInt(data_hoje.getDate())<10,'0','')+data_hoje.getDate().toString();
    var A2 = fstring.ifthen((parseInt(data_hoje.getMonth())+1)<10,'0','')+(parseInt(data_hoje.getMonth())+1).toString();
    var A3 = data_hoje.getFullYear();
    var A4 = fstring.ifthen(parseInt(data_hoje.getHours())<10,'0','')+data_hoje.getHours().toString();
    var A5 = fstring.ifthen(parseInt(data_hoje.getMinutes())<10,'0','')+data_hoje.getMinutes().toString();
            
    // P2 - OPTIONS
    var A6 = fstring.formatLeft(client.CDE, 4, '0');
    var A7 = client.TPI;
    var A8 = client.IDT;
    // console.log(client);

    // P3 - DATA VALIDADE TOKEN
    var data_validade = fdate.adds(data_hoje,'minute',30);
    
    var A9 = fstring.ifthen(parseInt(data_validade.getDate())<10,'0','')+data_validade.getDate().toString();
    var A10 = fstring.ifthen((parseInt(data_validade.getMonth())+1)<10,'0','')+(parseInt(data_validade.getMonth())+1).toString();
    var A11 = data_validade.getFullYear();
    var A12 = fstring.ifthen(parseInt(data_validade.getHours())<10,'0','')+data_validade.getHours().toString();
    var A13 = fstring.ifthen(parseInt(data_validade.getMinutes())<10,'0','')+data_validade.getMinutes().toString();
    
    // P4 - VERIFICADOR - 2=getHours 2=getDate 4=getFullYear 2=getMonth 2=getMinutes  
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
        Response:"Authenticação efetuada com sucesso.",    	
        A1: {
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
    return retorno;
}
module.exports.keygen = keygen;

module.exports.decodificar = (client) => {    

    var base64 = require('base-64');
    var Bloco1 = base64.decode(client.B1);
    var Bloco2 = base64.decode(client.B2);          
    
    var Bloco3 = '';
    
    if(!client.hasOwnProperty('B3')) 
        return {Status: 5001, Response:"Token inválido."};

    Bloco3 = client.B3.B31;

    if(client.B3.hasOwnProperty('B36')) 
        Bloco3 += client.B3.B36;

    if(client.B3.hasOwnProperty('B33')) 
        Bloco3 += client.B3.B33;

    if(client.B3.hasOwnProperty('B35')) 
        Bloco3 += client.B3.B35;

    if(client.B3.hasOwnProperty('B32')) 
        Bloco3 += client.B3.B32;

    if(client.B3.hasOwnProperty('B34')) 
        Bloco3 += client.B3.B34;

    
    var Bloco4 = base64.decode(client.B4);
    
    var A1  = Bloco2.substring(16,18);
    var A2  = Bloco1.substring(6,8);
    var A3  = Bloco2.substring(6,10);
    var A4  = Bloco2.substring(0,2);
    var A5  = Bloco1.substring(0,2);

    var A6  = Bloco2.substring(2,6); // CDE 
    var A7  = Bloco1.substring(10,14); // TPI
    var A8  = base64.decode(base64.decode(base64.decode(base64.decode(Bloco3)))); // IDT    

    var A9  = Bloco2.substring(14,16);
    var A10 = Bloco2.substring(12,14);
    var A11 = Bloco1.substring(2,6);
    var A12 = Bloco2.substring(10,12);
    var A13 = Bloco1.substring(8,10);

    var A14 = base64.decode(base64.decode(Bloco4));    

    // bloco1 = 2 4 2 2 4
    // bloco2 = 2 4 4 2 2 2 2

    var sdata_token = A3+'-'+A2+'-'+A1+'T'+A4+':'+A5+':00.000Z';
    var data_token = new Date(sdata_token);

    var sdata_validade = A11+'-'+A10+'-'+A9+'T'+A12+':'+A13+':00.000Z';
    var data_validade = new Date(sdata_validade);

    // P4 - VERIFICADOR - 2=getHours 2=getDate 4=getFullYear 2=getMonth 2=getMinutes  
    var sdata_verificador = A14.substring(4,8) + '-' + A14.substring(8,10) + '-' + A14.substring(2,4) + 'T' + A14.substring(0,2) + ':' + A14.substring(10,12)+':00.000Z';
    var data_verificador = new Date(sdata_verificador);    

    var data_hoje = fdate.NowToDHM();
    if (data_token.getTime() != data_verificador.getTime())
        return {Status: 5002, Response:"Não foi possível validar o token."};
    
    if (data_token < fdate.adds(data_hoje, 'minute', -30)) 
        return {Status: 5003, Response:"Authenticação não autorizada."};

    if (data_token > fdate.adds(data_hoje, 'minute', 30)) 
        return {Status: 5004, Response:"Token inválido."};
        
    if (data_validade < fdate.adds(data_hoje, 'minute', -30)) 
        return {Status: 5005, Response:"Token expirou."}; 

    if (data_validade > fdate.adds(data_hoje, 'minute', 30)) 
        return {Status: 5006, Response:"Token inválido."};

    return {
        Status: 200, 
        Response:"Token decodificado com sucesso",
        Data:data_token,
        Validade:data_validade,   
        CDE:A6,
        TPI:A7,
        IDT:A8,
        Token:keygen({ CHVA: CHVA, DVS: base64.encode(fdate.NowToDecimal()), CDE:A6, TPI:A7, IDT:A8})    
    }
}

module.exports.validacao = (token) => {

 
    var data_hoje = fdate.NowToDHM();;   

    if (token.Data > fdate.adds(data_hoje, 'minute', 30)) 
        return {Status: 5002, Response:"Token inválido."};
        
    if (token.Validade< fdate.adds(data_hoje, 'minute', -30)) 
        return {Status: 5001, Response:"Token expirou."};    

    return {Status: 200, Response:"Token válido."};    
}