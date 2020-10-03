var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require("./config/database")
const dbUser = process.env.DB_USER2
const dbPass = process.env.DB_PASS2
const dbName = process.env.DB_NAME2
db(`mongodb+srv://${dbUser}:${dbPass}@cluster0.mjcv6.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`)

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const planta = require('./routes/planta')
app.use('/planta', planta)

const embalagem = require('./routes/embalagem')
app.use('/embalagem', embalagem)

const acessorio = require('./routes/acessorio')
app.use('/acessorio', acessorio)

const pedido = require('./routes/pedido')
app.use('/pedido', pedido)

const pagamento = require('./routes/pagamento')
app.use('/pagamento', pagamento)

const operador = require('./routes/operador')
app.use('/operador', operador)

module.exports = app;
