import { find } from "../repository/find";
import { remove } from "../repository/remove";
import { ReturnedDBTokensValue } from "../types/types";
import { RequestLogoutBody } from "./type";

export class LogoutServices {
     async logout(body: RequestLogoutBody): Promise<boolean> {
      try {
        const {token} = body;
        const data = await find.findOneData<ReturnedDBTokensValue>(token, '"refreshToken"', 'tokens');
        const removedToken = await remove.removeData(data.userId, '"userId"', 'tokens');
        return removedToken;
      } catch(e) {
        if(e instanceof Error) {
          throw new Error('An unknown error occurred while attempting to sign out of the account', {cause: e})
        }
        throw e;
      }
      }
}

export const logoutServices = new LogoutServices();