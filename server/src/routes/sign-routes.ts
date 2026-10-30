import { Router } from 'express';
import { signUpController } from '../auth/sign-up/controller';
import { signIngController } from '../auth/sign-in/controller';
import { logoutController } from '../auth/logout/controller';
import { deleteController } from '../auth/delete/controller';
import { activeController } from '../auth/active/controller';

const userRoutes = Router();
userRoutes.post('/sign-up', (req, res) => signUpController.signUp(req, res));
userRoutes.post('/sign-in', (req, res) => signIngController.signIn(req, res));
userRoutes.post('/logout', (req, res) => logoutController.logout(req, res));
userRoutes.post('/delete', (req, res) => deleteController.delete(req, res));
userRoutes.post('/activate/:activate', (req, res) => activeController.active(req, res));

export default userRoutes;