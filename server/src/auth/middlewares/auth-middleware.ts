import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api-error";
import { tokenService } from "../token/service";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) throw ApiError.UnauthorizedError();

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) return next(ApiError.UnauthorizedError());

        const userData = tokenService.validateTokens(accessToken);
        if(!userData) throw ApiError.UnauthorizedError();

        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.UnauthorizedError());
    }
}