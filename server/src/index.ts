import express from 'express';
import {Env} from './config/env.config';

const app = express();
const PORT = Env.BACKEND_PORT

app.get('/health', (req, res) => {
    res.status(200).send('ok');
})

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})