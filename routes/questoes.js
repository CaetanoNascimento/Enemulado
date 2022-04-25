const express = require('express');
const router = express.Router();
const questoesControll = require("../controllers/questoes-controllers")
const multer = require('multer');

const storeg = multer.diskStorage({

    destination: function (req, file, cb){
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})

const upload = multer({ 
    storage: storeg
});


router.get('/', questoesControll.getQuestoes);

router.get('/id/:id', questoesControll.getIdQuestoes);

router.get('/gabarito/:id', questoesControll.getConhecimentosGabarito);
   
router.get('/area_conhecimento/:id_areaConhecimento', questoesControll.getConhecimentos);

router.get('/id_conhecimento/:id_areaConhecimento', questoesControll.getApenasIdConhecimentos);

router.get('/dia1/:v1/:v2', questoesControll.getQuestaoMateria );

router.post('/cadastrar', upload.single('imagem_questoes'),questoesControll.postQuestao );

router.get('/materia/:materia', questoesControll.getMateria);

router.get('/instituicao/:instituicao', questoesControll.getInstituicao);

router.get('/id_instituicao/:id_instituicao', questoesControll.getIDInstituicao);

router.get('/resultado/:id_simulado', questoesControll.getResultadoQuestao);

router.get('/materia', questoesControll.getTodasMateria);

router.get('/instituicao', questoesControll.getTodasInstituicao);

module.exports = router;