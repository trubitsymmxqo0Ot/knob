import { Router } from 'express';

const health = Router().get('/health', (req, res) => {
    res.status(200).send('ok');
})

export default health;