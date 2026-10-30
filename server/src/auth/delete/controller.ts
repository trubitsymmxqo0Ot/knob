import { NextFunction, Request, Response } from "express";
import { cookiesObject } from "../lib/cookies";
import { deleteServices } from "./services";
import { ApiError } from "../exceptions/api-error";

class DeleteController {
    async delete(req: Request, res: Response, next: NextFunction) {
        try {

            const token = await cookiesObject.getRefreshToken(req);
            const deleted = await deleteServices.delete(token);

            if (!deleted) throw ApiError.BadRequest('Ошибка при попытке удалить аккаунт');

            cookiesObject.deleteBothTokens(res);
            return res.status(200).json('Deleted success');

        } catch (e) {

            next(e);

        }
    }
}

export const deleteController = new DeleteController();