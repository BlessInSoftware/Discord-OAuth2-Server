import 'dotenv/config';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import { router } from './src/routes/main.routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

let port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

//trackers
app.use(morgan('dev'));

//statics

//routes
app.use(router);

const server = app.listen(port, async () => {
    //alerts
    console.log(`Discord OAuth2 app is running on port: ${port}`);
});