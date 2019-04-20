const querystring = require('querystring');                                                                                                                                                                                                
const https = require('http');

module.exports.executa = () => {
    var postData = querystring.stringify({
        'msg' : 'Hello World!'
    });

    
    var options = {
      hostname: 'localhost',
      port: 3000,
      path: '/bots',
      method: 'GET',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postData.length
         }
    };
    
    var req = https.request(options, (res) => {
        console.log("\nstatus code: ", res.statusCode);
        res.on('data', function(data) {
            console.log( JSON.parse(data) );
        });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.write(postData);
    req.end();


}
