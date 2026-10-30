import { Request, Response } from "express";
import { metaServices } from "./services";
import { ApiError } from "../../auth/exceptions/api-error";

class MetaController {
    async clearDb(req: Request, res: Response) {
        try {
            const clear = metaServices.clearDb();

            if (!clear) throw ApiError.BadRequest('Ошибка при попытке удалить данные из бд');

            return res.status(200).json('All db was clear')

        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке удалить данные из бд', e);

        }
    }
}

export const metaController = new MetaController();