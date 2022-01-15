import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv-safe'
import helmet from 'helmet';
import logger from 'morgan';

config();

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(logger('dev'));
app.use(cors());
app.use(helmet());

