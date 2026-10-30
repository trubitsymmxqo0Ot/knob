import { NextFunction, Response } from 'express';
import { SignInParams } from './type';
import { signInService } from './services';
import { cookiesObject } from '../lib/cookies';
import { ApiError } from '../exceptions/api-error';

class SignInController {
  async signIn(req: SignInParams, res: Response, next: NextFunction): Promise<void> {
    try {

      const { email, password } = req.body;
      const response = await signInService.signIn({ email, password });

      if (!response) throw ApiError.BadRequest('Ошибка при попытке войти в аккаунт');

      cookiesObject.saveTokens(res, response.refreshToken, response.accessToken);
      const returnedData = {
        name: response.name,
        email: response.email,
        createdAt: response.createdAt,
      }

      res.json(returnedData);

    } catch (e) {

      next(e);
      
    }
  }
}

export const signIngController = new SignInController();