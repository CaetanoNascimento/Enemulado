require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


global.__basedir = __dirname;
const rotaquestoes = require('./routes/questoes');
const rotausuarios = require('./routes/usuarios');
const rotalogin_google = require('./routes/login_google');
const rotalogout = require('./routes/logout');
const rotaperfil = require('./routes/perfil');
const rotahome = require('./routes/home');
const rotapages = require('./routes/pages');
const rotasimulado = require('./routes/simulado')


const rotateste = require('./routes/teste')

app.use('/teste', rotateste)

app.use('/questoes', rotaquestoes);
app.use('/usuarios', rotausuarios);
app.use('/login', rotalogin_google);
app.use('/logout', rotalogout);
app.use('/perfil', rotaperfil);
app.use('/home', rotahome);
app.use('/pages', rotapages);
app.use('/simulado', rotasimulado)




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname+'/public'));



module.exports = app;