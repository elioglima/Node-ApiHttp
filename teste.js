var templateString = null;
var fs = require('fs');
var templateString = fs.readFileSync('./templates/header.ejs', 'utf-8')

console.log(templateString)