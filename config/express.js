import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import config from './env';
import routes from '../server/routes';

const app = express();

if(config.env === 'development')
    app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../client')));
app.use('/scripts', express.static(path.join(__dirname, '../../bower_components/bootstrap/dist')));
app.use('/scripts', express.static(path.join(__dirname, '../../bower_components/jquery/dist')));
app.use('/scripts', express.static(path.join(__dirname, '../../bower_components/angular')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/', routes);

export default app;
