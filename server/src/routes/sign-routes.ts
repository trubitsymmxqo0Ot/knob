import { Router } from 'express';
import { signController } from '../controllers/sign/sign-controller';

const user_routes = Router();
user_routes.post('/sign-up', (req, res) => signController.signUp(req, res));
// user_routes.post('/sign-in');
// user_routes.post('/login');
// user_routes.post('/logout');

export default user_routes;