import { cookiesObject } from "../lib/cookies";
import { signUpServices } from "./services";
import { NextFunction, Response } from "express";
import { Params } from "./type";
import { mailSend } from "../lib/mail-send";
import { ApiError } from "../exceptions/api-error";

class SignUpController {
  async signUp(req: Params, res: Response, next: NextFunction): Promise<void> {
    try {

      const { email, password, name } = req.body;
      const response = await signUpServices.signUp({ email, name, password });

      if (!response) throw ApiError.BadRequest('Неудалось создать пользователя');

      cookiesObject.saveTokens(res, response.refreshToken, response.accessToken);

      const returnedData = {
        name: response.name,
        email: response.email,
        createdAt: response.createdAt
      }

      mailSend.send(response.email, response.id);

      res.json(returnedData);

    } catch (e) {

      next(e);
      
    }
  }
}

export const signUpController = new SignUpController();