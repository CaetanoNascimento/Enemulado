const route = require('express').Router();


route.get('/', (req, res)=>{
    
    res.clearCookie('session-token');
  
    return res.status(200).send({Ebaa:"ebba"})
  
})
module.exports = route;