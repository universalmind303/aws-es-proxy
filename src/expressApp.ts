import express from 'express';
import helmet from 'helmet';
import {expressLogger, expressErrorLogger} from './logger';
import {errorHandler} from './errorHandler';
import {proxyHandler} from './proxy';
import config from './config';
import auth from './auth';
const expressApp = express();

const authProvider = auth[config.auth.provider];
expressApp.use(helmet());
expressApp.use(expressLogger);
// expressApp.use(authProvider);

expressApp.get('/*', proxyHandler);
expressApp.post('/*', express.json(), proxyHandler);
expressApp.use(expressErrorLogger);
expressApp.use(errorHandler);

export const app = expressApp;
