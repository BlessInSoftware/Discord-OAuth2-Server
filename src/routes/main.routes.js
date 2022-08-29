import dotenv from 'dotenv';
dotenv.config();
import { Router } from 'express';
import crypto from 'crypto';
import discordApi from '../clients/discordApi.js';

const scopes = process.env.CLIENT_SCOPES.split(',');

export const router = Router();

router.get('/', (req, res) => {
    res.send('If you want to learn more about this app, please visit: https://github.com/ClunkyTeam/Discord-OAuth2-Server');
});

router.get('*', (req, res) => {
    res.redirect('/');
});

router.get('/login', (req, res) => {
    let url = (discordApi.generateAuthUrl({
        scope: scopes,
        state: crypto.randomBytes(16).toString('hex'),
    }));
    res.redirect(url);
});

router.get('/callback', async (req, res) => {
    let credentials = await discordApi.tokenRequest({
        code: req.query.code,
        scope: scopes,
        grantType: 'authorization_code',
    });
    res.redirect(`${process.env.CLIENT_REDIRECT_URL}?access_token=${credentials.access_token}&refresh_token=${credentials.refresh_token}&expires_in=${credentials.expires_in}&scope=${credentials.scope}&token_type=${credentials.token_type}`);
});

router.post('/refresh_token', async (req, res) => {
    try {
        let credentials = await discordApi.tokenRequest({
            refreshToken: req.body.refresh_token,
            grantType: 'refresh_token',
            scope: scopes
        });
        res.send(credentials);
    } catch (err) {
        res.statusStatus(err.code).send(err.code);
    }
});