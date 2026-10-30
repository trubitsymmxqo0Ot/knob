import { Env } from "../../config/env.config";
import { UserDto } from "../dto/userDto";
import { ApiError } from "../exceptions/api-error";
import { find } from "../repository/find";
import { tokenService } from "../token/service";
import { ReturnedDBTokensValue, ReturnedDBUserValue, ReturnedUserValue } from "../types/types";

class RefreshServices {
    async refresh(token: string | undefined): Promise<ReturnedUserValue> {
        if (!token) throw ApiError.UnauthorizedError();

        const isVerifyToken = tokenService.validateTokens(token, Env.JWT_REFRESH_SCRET || '');
        if (!isVerifyToken) throw ApiError.UnauthorizedError();

        const findToken = await find.findOneData<ReturnedDBTokensValue>(token, '"refreshToken"', 'tokens');
        const findUser = await find.findOneData<ReturnedDBUserValue>(findToken.userId, 'id', 'user_data');

        const userDto = new UserDto(findUser.name, findUser.email, findUser.createdAt, findUser.id);
        const {refreshToken, accessToken} = tokenService.createTokens({
            createdAt: userDto.createdAt,
            email: userDto.email,
            id: userDto.id,
            name: userDto.name
        });
        const savedTokens = await tokenService.saveToken(userDto.id, refreshToken);
        return {
            id: userDto.id,
            name: userDto.name,
            email: userDto.email,
            createdAt: userDto.createdAt,
            refreshToken: savedTokens.refreshToken,
            accessToken
        }
    }
}

export const refreshServices = new RefreshServices();