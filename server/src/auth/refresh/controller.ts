import { NextFunction, Response, Request } from "express";
import { cookiesObject } from "../lib/cookies";
import { refreshServices } from "./services";
import { responseDto } from "../dto/responseDto";

class RefreshController {
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = await cookiesObject.getRefreshToken(req);
            const response = await refreshServices.refresh(refreshToken);
            cookiesObject.saveTokens(res, response.refreshToken, response.accessToken);
            const returnedData = new responseDto(response.name, response.email, response.createdAt);
            res.json(returnedData);
        }
        catch (e) {
            next(e);
        }
    }
}

export const refreshController = new RefreshController();