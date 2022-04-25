const express = require('express');
const router = express.Router();
const simuladoControll = require("../controllers/simulado-controllers")

router.post('/', simuladoControll.postSimulado);

router.post('/questao/', simuladoControll.postQuestao);

router.get('/lista/:id_usuario', simuladoControll.getLista);
    
router.get('/user/:id_usuario/:id_tipo_simulado', simuladoControll.getUserSimulado);

router.get('/buscar/:id_simulado', simuladoControll.getSimulado );

router.patch('/usuario/:id', simuladoControll.patchUsuario);

router.patch('/:id_simulado', simuladoControll.patchSimulado);

router.patch('/tempo/:id_simulado', simuladoControll.patchTempoSimulado);

router.get('/tempo/:id_simulado', simuladoControll.getTempoSimulado);

router.delete('/excluir/:id_simulado', simuladoControll.deleteSimulado); 

module.exports = router;
