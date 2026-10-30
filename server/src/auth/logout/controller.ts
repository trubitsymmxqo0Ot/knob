import { NextFunction, Request, Response } from "express";
import { cookiesObject } from "../lib/cookies";
import { logoutServices } from "./services";
import { ApiError } from "../exceptions/api-error";

class LogoutController {
    async logout(req: Request, res: Response, next: NextFunction) {
        try {

            const token = await cookiesObject.getRefreshToken(req);

            if(!token) throw ApiError.UnauthorizedError();

            const deleteToken = await logoutServices.logout({ token });

            if (!deleteToken) throw ApiError.BadRequest('Не удалось удалить токен');

            cookiesObject.deleteBothTokens(res);
            return res.status(200).json('');

        } catch (e) {

            next(e);

        }

    }
}

export const logoutController = new LogoutController();