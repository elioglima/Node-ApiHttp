'use strict';

const CHVA = 'Q0hBVkVBVVRIRU5USUNBQ0FP'; 
var fdate  = require('./fn_date');
var base64 = require('base-64');

module.exports.keygen = (client) => {

    if(!client.hasOwnProperty('CHVA')) 
        return {StatusCode: 5001, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('DVS')) 
        return {StatusCode: 5002, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('CDE')) 
        return {StatusCode: 5003, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('TPI')) 
        return {StatusCode: 5004, Response:"Authenticação não autorizada."};

    if(!client.hasOwnProperty('IDT')) 
        return {StatusCode: 5005, Response:"Authenticação não autorizada."};

    if (client.CHVA != CHVA) 
        return {StatusCode: 5006, Response:"Authenticação não autorizada."};
    
    var DVS = client.DVS.trim(); 
    if (DVS.length == 0)  
        return {StatusCode: 5007, Response:"Authenticação não autorizada."};        
    
    var DVSdec = base64.decode(DVS).trim();    

    if (DVSdec.length != 12)  
        return {StatusCode: 5008, Response:"Authenticação não autorizada."};
    
    var dia  = DVSdec.substring(0, 2);
    var mes  = DVSdec.substring(2, 4);
    var ano  = DVSdec.substring(4, 8);
    var hora = DVSdec.substring(8, 10);
    var min  = DVSdec.substring(10, 12);

    var sData = ano+'-'+mes+'-'+dia+'T'+hora+':'+min+':00.000Z';
    var data = new Date(sData);        

    if (data < fdate.adds(data, 'minute', -30)) 
        return {StatusCode: 5006, Response:"Authenticação não autorizada."};

    if (data > fdate.adds(data, 'minute', 30)) 
        return {StatusCode: 5007, Response:"Authenticação não autorizada."};
    
    // montagem do token

    // P1 - DATA DO TOKEN

    var data_hoje = new Date();        
    
    var A1 = data_hoje.getDate();
    var A2 = data_hoje.getMonth();
    var A3 = data_hoje.getFullYear();
    var A4 = data_hoje.getHours();
    var A5 = data_hoje.getMinutes();       
            
    // P2 - OPTIONS
    /*
    var A6 CD Empresa = 0001
    var A7 TP Identificador = 5001
    var A8 ID Identificador = 000000000000000
            
            B2   B1   B3
            0001 5001 000000000000000 = 00015001000000000000000
        
        P3 - DATA VALIDADE TOKEN
        #    
            A9 dia  = 20
            A10 mes  = 04
            A11 ano  = 2019
            A12 hora = 16
            A13 min  = 01
        
            A4 A1 A3   A2 A5
            16 20 2019 04 01 = 162020190401
            MTYyMDE5MjUxMTA0    
        
        P4 - Verificar se a data ehora esta na faixa entre data atual e validade
        #
            A14 - VERIFICADOR         
                1 - BASE64 (DATAHORA) = MTYyMDE5MjUxMTA0
                2 - 77 84 89 121 77 68 69 53 77 106 85 120 77 84 65 48 
            
            77848912177686953771068512077846548 
        
        Montagem do token
        #
            A5 A11  A2 A13 A7   A4 A6   A3 A12 A10 A9 A1 A8 			 		   A14 			   
            20 2019 04 01  5001 16 0001 16 16  04  20 20 0000000000000000000000000 MTYyMDE5MjUxMTA
        
        O codigo montado acima é separado em blocos
        #     
            Bloco 1 = A5 A11 A2 A13 A7 = (20201904015001)
            Bloco 2 = A4 A6 A3 A12 A10 A9 A1 = (1600011616042020)
            Bloco 3 = A8      
            Bloco 4 = A14
        
        Cada bloco é codificado em base64 para dificultar o entendimento
        #     
            B1: base64(20201904015001) = MjAyMDE5MDQwMTUwMDE
            B2: base64(1600011616042020) = MTYwMDAxMTYxNjA0MjAyMA==
        
        O bloco 3 é denominado B3 e é codificado conforme os outros blocos porem é separado em 6 blocos
        #
            B3: base64(0000000000000000000000000000000000000000000000000)
                =  MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==
        
        Espera do json do bloco 3
        #
            {
                B31 = MDAwMDAwMDAwMDAwMDAw
                B32 = MDAwMDAwMDAwMDAwMDAw
                B33 = MDAwMDAwMDAwMDAwMDAw
                B34 = MDAwMA==
                B35 =
                B36 =
            }
        
        Bloco 4 de identificação da aplicação
        #
            B4: base64(MTYyMDE5MjUxMTA0) = TVRZeU1ERTVNalV4TVRBMA==
        
        Json de envio para aplicação para futuras transações
        #
            {
                Status:200,
                Mensagem:"Sucesso",    	
                Token: {
                    B1: MjAyMDE5MDQwMTUwMDE,
                    B2: MTYwMDAxMTYxNjA0MjAyMA==,
                    B3: {
                        B31 = MDAwMDAwMDAwMDAwMDAw
                        B32 = MDAwMDAwMDAwMDAwMDAw
                        B33 = MDAwMDAwMDAwMDAwMDAw
                        B34 = MDAwMA==
                        B35 =
                        B36 =
                    },
                    B4: TVRZeU1ERTVNalV4TVRBMA
                }
            }
            */
    // 200420191957
    console.log("Sucesso", sData, dia, mes, ano, hora, min);
    return {token:sData};
}