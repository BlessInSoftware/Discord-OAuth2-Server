import dotenv from 'dotenv';
dotenv.config();
import DiscordOAuth2 from 'discord-oauth2';

export default new DiscordOAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.CLLIENT_REDIRECT_URI,
});