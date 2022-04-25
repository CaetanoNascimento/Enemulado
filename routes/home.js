const router = require('express').Router();
const login = require('../middleware/login_jwt');



router.get('/entrar', login,(req,res)=>{
    return res.status(200).send({Ebaa:"ebba"})
})

module.exports = router;