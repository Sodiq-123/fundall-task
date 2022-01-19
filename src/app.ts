import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv-safe';
import helmet from 'helmet';
import logger from 'morgan';
// import passport from 'passport';
import session from 'express-session';
import routerBase from './routes';

config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// define routes here
app.get(
  '/',
  async (req: Request, res: Response): Promise<Response> =>
    res.status(200).send({
      success: true,
      message: 'Welcome Here!, Please use the API endpoints "/api/v1"',
    })
);
app.use('/api/v1', routerBase);

// app.use(passport.initialize());
// app.use(passport.session());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(logger('dev'));
app.use(cors());
app.use(helmet());

export default app;
