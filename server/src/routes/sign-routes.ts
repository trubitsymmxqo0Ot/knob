import { Router } from 'express';
import { signUpController } from '../auth/sign-up/controller';
import { signIngController } from '../auth/sign-in/controller';
import { logoutController } from '../auth/logout/controller';
import { deleteController } from '../auth/delete/controller';
import { activeController } from '../auth/active/controller';
import { emailValidator, nameValidator, passwordValidator } from '../config/validator';
import { authMiddleware } from '../auth/middlewares/auth-middleware';

const userRoutes = Router();

userRoutes.post(
    '/sign-up',
    emailValidator(),
    nameValidator(),
    passwordValidator(),
    signUpController.signUp
);

userRoutes.post(
    '/sign-in',
    emailValidator(),
    nameValidator(),
    passwordValidator(),
    signIngController.signIn
);

userRoutes.post(
    '/logout',
    authMiddleware,
    logoutController.logout
);

userRoutes.post(
    '/delete',
    authMiddleware,
    deleteController.delete
);

userRoutes.post(
    '/activate/:activate',
    authMiddleware,
    activeController.active
);

export default userRoutes;