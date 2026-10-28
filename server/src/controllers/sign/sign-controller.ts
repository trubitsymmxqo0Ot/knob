import { signService } from "../../services/sign/sign-service";
import {Response, Request} from 'express';
import { Params, SignControllerRequest } from "./types";

export class SignController implements SignControllerRequest {
  async signUp(req: Params, res: Response): Promise<Response> {
    try {
      const {email, password, name} = req.body;
      const response = await signService.signUp({email, name, password});
      if(!response) throw new Error('Failed to create new user');
      return res.json(response);
    } catch(e) {
      res.status(500).json('An unknown error occurred while creating the user')
      throw e
    }

  }
}

export const signController = new SignController();