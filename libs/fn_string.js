'use strict';

module.exports.formatLeft = (input, size, character) => {
    var texto = input;
    var sizeEnd = size-input.toString().trim().length;
    for (let index = 0; index < sizeEnd; index++) {
        texto = character + texto; 
    }     

    return texto;
};  


module.exports.formatRigth = (input, size, character) => {
    var texto = input;
    var sizeEnd = size-input.toString().trim().length;
    for (let index = 0; index < sizeEnd; index++) {
        texto += character; 
    }     

    return texto;
};  