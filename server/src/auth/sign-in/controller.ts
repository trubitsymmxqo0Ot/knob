import {Response} from 'express';
import { SignInParams } from './type';
import { signInService } from './services';
import { cookiesObject } from '../lib/cookies';

class SignInController {
    async signIn(req: SignInParams, res: Response): Promise<Response> {
        try {
          const {email, password} = req.body;
          const response = await signInService.signIn({email, password});
          if(!response) throw new Error('Failed sign in account');

          cookiesObject.saveTokens(res, response.refreshToken, response.accessToken);
          const returnedData = {
            name: response.name,
            email: response.email,
            createdAt: response.createdAt,
          }
    
          return res.json(returnedData);
        } catch(e) {
            res.status(500).json('An unknown error occured while loggin into the account');
            throw e;
        }
      }
}

export const signIngController = new SignInController();