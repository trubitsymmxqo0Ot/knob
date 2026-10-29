import { Router } from 'express';
import { deleteController } from '../auth/delete/controller';
import { metaController } from '../meta/drop/controller';

const meta = Router()

meta.get('/health', (req, res) => {
    res.status(200).send('ok');
})
meta.post('/drop', (req, res) => metaController.clearDb(req, res))

export default meta;