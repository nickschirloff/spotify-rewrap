require('dotenv').config();
const express = require('express');
const SpotifyWebAPI = require('spotify-web-api-node');
const queryString = require('querystring');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = 8888;

// Testing variable for client port
const CLIENT_PORT = 5173;

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
    const scopes = ['user-read-private', 'user-read-email', 'playlist-read-collaborative'];
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
        console.log("Got: " + spotifyAPI.getRefreshToken());
        const expiresIn = data.body['expires_in'];

        const queryParams = queryString.stringify({
            access_token: data.body['access_token'],
            refresh_token: data.body['refresh_token'],
            expires_in: expiresIn
        });

        res.redirect(`http://localhost:${CLIENT_PORT}/?${queryParams}`);
    }).catch(error => {
        console.error("Error: " + error);
        res.redirect(`http://localhost:${CLIENT_PORT}/?${queryString.stringify({ error: 'invalid_token' })}`)
    });

});

app.get("/refresh_token", (req, res) => {

    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url:'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${spotifyAPI.getClientId()}:${spotifyAPI.getClientSecret()}`).toString('base64')}`
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error);
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening at port: ${PORT}...`);
});