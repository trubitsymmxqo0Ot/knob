import { ApiError } from "../exceptions/api-error";
import { find } from "../repository/find";
import { remove } from "../repository/remove";
import { ReturnedDBTokensValue } from "../types/types";
import { RequestLogoutBody } from "./type";

export class LogoutServices {
  async logout(body: RequestLogoutBody): Promise<boolean | undefined> {
    try {

      const { token } = body;
      const data = await find.findOneData<ReturnedDBTokensValue>(token, '"refreshToken"', 'tokens');
      const removedToken = await remove.removeData(data.userId, '"userId"', 'tokens');
      return removedToken;

    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }
      if (e instanceof Error) {
        throw ApiError.BadRequest(e.message, e);
      }
      throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке выйти из аккаунта', e);
    }

  }
}

export const logoutServices = new LogoutServices();