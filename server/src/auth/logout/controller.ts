import { Request, Response } from "express";
import { cookiesObject } from "../lib/cookies";
import { logoutServices } from "./services";

class LogoutController {
    async logout(req: Request, res: Response) {
        try {
            const token = await cookiesObject.getRefreshToken(req);
            const deleteToken = await logoutServices.logout({ token });
            if (!deleteToken) throw new Error('Token does not deleted');
            cookiesObject.deleteBothTokens(res);
            return res.status(200).json('');
        } catch (e) {
            res.status(500).json('An unknown error occured while logout from account');
            throw e;
        }

    }
}

export const logoutController = new LogoutController();