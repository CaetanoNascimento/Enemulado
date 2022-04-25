const express = require('express');
const router = express.Router();

router.get('/400', (req, res) => {
    res.sendFile(__basedir + '/public/pages/400.html');
});

router.get('/404', (req, res) => {
    res.sendFile(__basedir + '/public/pages/404.html');
});

router.get('/esqueci', (req, res) => {
    res.sendFile(__basedir + '/public/pages/esqueci.html');
});

router.get('/quemsomos', (req, res) => {
    res.sendFile(__basedir + '/public/pages/quemsomos.html');
});

router.get('/escolha', (req, res) => {
    res.sendFile(__basedir + '/public/pages/escolha.html');
});

router.get('/simulado', (req, res) => {
    res.sendFile(__basedir + '/public/pages/simuladoc.html');
});

router.get('/simuladob', (req, res) => {
    res.sendFile(__basedir + '/public/pages/simuladob.html');
});

router.get('/admin', (req, res) => {
    res.sendFile(__basedir + '/public/pages/admin1.html');
});

router.get('/load', (req, res) => {
    res.sendFile(__basedir + '/public/pages/LoadSimulado.html');
});


module.exports = router;