import { UserDto } from "../dto/userDto";
import { ApiError } from "../exceptions/api-error";
import { find } from "../repository/find";
import { save } from "../repository/save";
import { tokenService } from "../token/service";
import { RequestUserBody, ReturnedUserValue } from "../types/types";
import bcrypt from 'bcrypt';

class SignUpServices {
    async signUp(body: RequestUserBody): Promise<ReturnedUserValue> {
        try {

            const { email, name, password } = body;
            const findUser = await find.hasData(email, 'email', 'user_data');

            if (findUser) throw ApiError.BadRequest('Пользователь уже существует');

            const hashPassword = await bcrypt.hash(password, 5);
            const saveUser = await save.saveOneUser({ email, name, password: hashPassword }, 'user_data')
            const userDTO = new UserDto(saveUser.name, saveUser.email, saveUser.createdAt, saveUser.id);
            const tokens = tokenService.createTokens({ ...userDTO });
            const savedTokens = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

            return {
                id: userDTO.id,
                email: userDTO.email,
                name: userDTO.name,
                createdAt: userDTO.createdAt,
                refreshToken: savedTokens.refreshToken,
                accessToken: tokens.accessToken,
            }

        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке регистрации', e)
        }

    }
}

export const signUpServices = new SignUpServices();