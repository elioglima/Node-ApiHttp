# API HTTP

## install dependencies:
$ npm install

## run the app:
$ DEBUG=apihttp:* npm start

# Conexão DB MySQL
    database.conexao.connect(function(err){
        if(err) return console.log(err);
        console.log('conectou!');
    });

### Consulta SQL
    database.conexao.query(sqlQry, function(error, results, fields){
    if(error) 
        res.json(error);
    else
        res.json(results);

    connection.end();
    console.log('executou!');
    });

### Fechar Conexão
database.conexao.end();

### Threads
    
    // thread

    async function Thread() {  
        // tempo de para o loop    
        await delay(1000); 
        
        // função a ser executada
        
        // retorno da thread
        Thread();
    }

    Thread1();

# TTD - Test Driven Development 
## building APIs

+ Folder /TTD
    + tdd_routers.js

# 
    tdd_usuarios();


# Token de Acesso
    // CHAVE DE AUTHENTICAÇÃO 
    CHVA = Q0hBVkVBVVRIRU5USUNBQ0FP
    DVS  = base64(200420191842) = MjAwNDIwMTkxODQy

    // json de validação
    {
        CHVA: 'Q0hBVkVBVVRIRU5USUNBQ0FP'
        DVS: 'MjAwNDIwMTkxODQy'
    }

## montagem do token

P1 - DATA DO TOKEN
 #  
    A1 dia  = 20
    A2 mes  = 04
    A3 ano  = 2019
    A4 hora = 16
    A5 min  = 01

    A1  A3   A2  A5 A4
    20  2019 04  01 16    = 202019040116

P2 - OPTIONS
#
    A6 CD Empresa = 0001
    A7 TP Identificador = 5001
    A8 ID Identificador = 000000000000000
    
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