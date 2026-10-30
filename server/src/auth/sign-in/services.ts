import { UserDto } from "../dto/userDto";
import { ApiError } from "../exceptions/api-error";
import { find } from "../repository/find";
import { tokenService } from "../token/service";
import { ReturnedDBUserValue, ReturnedUserValue } from "../types/types";
import { RequestSignInBody } from "./type";
import bcrypt from 'bcrypt';


class SignInService {
  async signIn(body: RequestSignInBody): Promise<ReturnedUserValue> {
    try {

      const { email, password } = body;
      const data = await find.findOneData<ReturnedDBUserValue>(email, 'email', 'user_data');
      const isActualUser = await bcrypt.compare(password, data.password)

      if (!isActualUser) throw ApiError.BadRequest('Неправильный логин или пароль');

      const userDTO = new UserDto(data.name, data.email, data.createdAt, data.id);
      const tokens = tokenService.createTokens({ ...userDTO });
      const savedTokens = await tokenService.saveToken(userDTO.id, tokens.refreshToken);

      return {
        id: userDTO.id,
        name: userDTO.name,
        email: userDTO.email,
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
      throw ApiError.UnknownError(500, 'Неизвестная ошибка при попытке войти в аккаунт', e);

    }
  }
}

export const signInService = new SignInService();