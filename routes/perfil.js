const route = require('express').Router();
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.ID_CLIENT;
const client = new OAuth2Client(CLIENT_ID);
 

// checkagem de rota por meio errado "google"


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
    .then(()=>{
        req.user = user;
        next();
    })
    .catch(err=>{
        res.redirect('/login')
    })

}

 route.get('/', checkAuthenticated, (req,res)=>{
     res.sendFile(__basedir + '/public/pages/perfil.html');
 
 })

module.exports = route;

