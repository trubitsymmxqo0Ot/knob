import express from 'express';
import {Env} from './config/env.config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import health from './routes/health';
import user_routes from './routes/sign-routes';

export const app = express(); 
const PORT = Env.BACKEND_PORT
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/healts', health);
app.use('/user', user_routes);


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})