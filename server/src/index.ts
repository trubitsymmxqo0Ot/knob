import express from 'express';
import {Env} from './config/env.config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import meta from './routes/meta';
import userRoutes from './routes/sign-routes';
import { errorMiddleware } from './auth/middlewares/error-middleware';

export const app = express(); 

const PORT = Env.BACKEND_PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/meta', meta);
app.use('/user', userRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})