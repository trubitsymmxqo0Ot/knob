import { NextFunction, Request, Response } from "express";
import { cookiesObject } from "../lib/cookies";
import { activeServices } from "./services";
import { ApiError } from "../exceptions/api-error";

class ActiveController {
    async active(req: Request, res: Response, next: NextFunction) {
        try {

            const path = req.params.activate;
            const token = await cookiesObject.getRefreshToken(req);

            if(!token) throw ApiError.UnauthorizedError();

            const response = await activeServices.active(path, token);

            if(!response) throw ApiError.BadRequest('Неизвестная ошибка при попытке активировать аккаунт');

            res.status(200).json('user has been actived');

        } catch(e) {

            next(e);
            
        }
    }
}

export const activeController = new ActiveController();