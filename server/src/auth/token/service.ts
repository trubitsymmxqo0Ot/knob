import { Env } from "../../config/env.config";
import { UserDTOResponse } from "../dto/types/user-types";
import { ApiError } from "../exceptions/api-error";
import { find } from "../repository/find";
import { save } from "../repository/save";
import { DataFromRefToken, ReturnedTokens, TokenServiceResponse } from "./types";
import jwt from 'jsonwebtoken';

class TokenService implements TokenServiceResponse {
    createTokens(payload: UserDTOResponse): ReturnedTokens {
        const accessSecret = Env.JWT_ACCESS_SECRET || '';
        const refreshSecret = Env.JWT_REFRESH_SCRET || '';
        const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        try {
            const findToken = await find.hasData(refreshToken, '"refreshToken"', 'tokens');

            if (findToken) throw ApiError.BadRequest('Токен уще существует');

            const token = await save.saveToken(userId, refreshToken);
            return token;
        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке сохранить токен', e);
        }
    }

    decodingRefreshToken(refreshToken: string) {
        const decodingToken = jwt.decode(refreshToken);
        if (!decodingToken || typeof decodingToken === 'string') {
            return null;
        }
        return decodingToken as DataFromRefToken;
    }

    validateTokens(token: string, secret: string) {
        const validate = jwt.verify(token, secret);
        return validate;
    }
}

export const tokenService = new TokenService();