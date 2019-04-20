
const mongoose = require('mongoose');
const mongo = {
    uri: 'mongodb://127.0.0.1:27017',
    opt: {
        user: 'acesso',
        pass: 'acesso',
        useNewUrlParser: true
    }
};

mongoose.connect(
    mongo.uri,
    mongo.opt
    );
