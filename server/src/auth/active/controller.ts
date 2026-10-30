import { Request, Response } from "express";
import { cookiesObject } from "../lib/cookies";
import { activeServices } from "./services";

class ActiveController {
    async active(req: Request, res: Response) {
        try {
            const path = req.params.activate;
            const token = await cookiesObject.getRefreshToken(req);
            const response = await activeServices.active(path, token);
            if(!response) throw new Error('An unknown error, cannot active user account');
            res.status(200).json('user has been actived');
        } catch(e) {
            if(e instanceof Error) {
                throw new Error('Unknown error during activation', {cause: e})
            }
            throw e;
        }
    }
}

export const activeController = new ActiveController();