import { ApiError } from "../exceptions/api-error";
import { find } from "../repository/find";
import { remove } from "../repository/remove";
import { ReturnedDBTokensValue } from "../types/types";

class DeleteServices {
    async delete(token: string) {
        try {

            const data = await find.findOneData<ReturnedDBTokensValue>(token, '"refreshToken"', "tokens");
            const deletedTokens = await remove.removeData(data.userId, '"userId"', 'tokens');
            const deletedUser = await remove.removeData(data.userId, 'id', 'user_data');
            return deletedUser && deletedTokens;

        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Неизвестная ошибка при попытке удалить аккаунт', e);

        }
    }
}

export const deleteServices = new DeleteServices();