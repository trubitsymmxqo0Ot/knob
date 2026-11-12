import express from 'express';
import {Env} from './config/env.config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import meta from './routes/meta';
import userRoutes from './routes/sign-routes';
import { errorMiddleware } from './auth/middlewares/error-middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
export const app = express();

const whitelist = [
    'http://localhost:5173',
    'http://10.8.1.54:5173',
    'http://192.168.10.63:5173',
    'http://172.30.112.1:5173'
];
const PORT = Env.VITE_BACKEND_PORT || 4000;
const corsOptions = {
    origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/meta', meta);
app.use('/user', userRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
