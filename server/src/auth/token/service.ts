import { Env } from "../../config/env.config";
import { UserDTOResponse } from "../dto/types/user-types";
import { find } from "../repository/find";
import { save } from "../repository/save";
import { ReturnedTokens, TokenServiceResponse } from "./types";
import jwt from 'jsonwebtoken';

class TokenService implements TokenServiceResponse {
    createTokens(payload: UserDTOResponse): ReturnedTokens {
        const accessSecret = Env.JWT_ACCESS_SECRET || '';
        const refreshSecret = Env.JWT_REFRESH_SCRET || '';
        const accessToken = jwt.sign(payload, accessSecret, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, refreshSecret, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        try {
            const findToken = await find.hasData(refreshToken, '"refreshToken"', 'tokens');
            if(findToken) throw new Error('Token already exist');
            const token = await save.saveToken(userId, refreshToken);
            return token;
        } catch(e) {
            console.error(e);
            if(e instanceof Error) {
                throw new Error('Something went wrong', {cause: e});
            }
            throw e;
        }
    }
}

export const tokenService = new TokenService();