require('dotenv').config();
const express = require('express');
const SpotifyWebAPI = require('spotify-web-api-node');

const app = express();
const port = 8888;

const spotifyAPI = new SpotifyWebAPI({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

const generateState = () => {
    let str = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 16; i++)
    {
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return str;
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/login", (req, res) => {
    const scopes = ['user-read-private', 'user-read-email'];
    const state = generateState();
    res.redirect(spotifyAPI.createAuthorizeURL(scopes, state));
});

app.get("/callback", (req, res) => {
    const error = req.query.error;
    const code = req.query.code || null;
    const state = req.query.state;

    if(error) {
        console.log("error!");
        return;
    }

    // Getting access and refresh tokens
    spotifyAPI.authorizationCodeGrant(code).then((data) =>{
        spotifyAPI.setAccessToken(data.body['access_token']);
        spotifyAPI.setRefreshToken(data.body['refresh_token']);
        const expiresIn = data.body['expires_in'];

        res.send("Success!");

        setInterval( async() => {
            const data = await spotifyAPI.refreshAccessToken();
            spotifyAPI.setAccessToken(data.body['access_token']);
        }, (expiresIn/2) * 1000);
    }).catch(error => {
        console.error("Error: " + error);
        res.send("Error Getting Access/Refresh Token: " + error);
    });

});

app.listen(port, () => {
    console.log(`Express app listening at port: ${port}...`);
});