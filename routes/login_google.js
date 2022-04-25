const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.ID_CLIENT;
const client = new OAuth2Client(CLIENT_ID);




router
    .get('/', (req, res) => {
        res.sendFile(__basedir + '/public/pages/login.html');
    })
    .post('/', (req, res) => {
        let token = req.body.token;

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            client_email = payload.email;
        }

        verify()
            .then(() => {
                res.cookie('session-token', token);
                res.send('success')
            })

            .catch(err => {
                res.redirect('/login')
            })


    })



module.exports = router;