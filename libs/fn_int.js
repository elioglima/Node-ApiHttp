'use strict';

module.exports.ifthen = (c, t, f) => {
    if (c) 
        return t;
    
    return f;
};  
