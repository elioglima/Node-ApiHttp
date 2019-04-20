var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
const mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuarios', require('./routes/usuarios'));
app.use('/bots', require('./routes/bots'));

// api do bot
app.use('/bots/api/acesso/auth', require('./routes/bots/api/auth_app'));
app.use('/bots/api/mensagens', require('./routes/bots/api/lista_mensagens'));
app.use('/bots/api/mensagens/enviar', require('./routes/bots/api/recebe_mensagem'));

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// var postTest = require('./ClientHttp/postTest');
// async function Thread1() {  
//   await delay(1000);     
//   postTest.executa();    
//   Thread1();
// }

// Thread1();