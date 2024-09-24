import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

import auth_route from './routes/v1/auth.js'

app.use('/api/v1/auth', auth_route);


export default app;
