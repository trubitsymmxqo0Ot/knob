import { cookiesObject } from "../lib/cookies";
import { signUpServices } from "./services";
import { Response } from "express";
import { Params } from "./type";

class SignUpController {
   async signUp(req: Params, res: Response): Promise<Response> {
     try {
       const { email, password, name } = req.body;
       const response = await signUpServices.signUp({ email, name, password });
 
       if (!response) throw new Error('Failed to create new user');
 
       cookiesObject.saveTokens(res, response.refreshToken, response.accessToken);
 
       const returnedData = {
         name: response.name,
         email: response.email,
         createdAt: response.createdAt
       }
 
       return res.json(returnedData);
 
     } catch (e) {
       res.status(500).json('An unknown error occurred while creating the user')
       throw e
     }
   }   
}

export const signUpController = new SignUpController();