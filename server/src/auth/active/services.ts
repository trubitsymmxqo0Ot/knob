import { ApiError } from "../exceptions/api-error";
import { find } from "../repository/find";
import { update } from "../repository/update";
import { tokenService } from "../token/service";
import { ReturnedDBUserValue } from "../types/types";


class ActiveServices {
    async active(id: string | string[], token: string) {
        try {

            const decoding = tokenService.decodingRefreshToken(token);
            const findUser = await find.findOneData<ReturnedDBUserValue>(decoding?.id || '', 'id', 'user_data');

            if (findUser.isActive) throw ApiError.AlreadyError('Аккаунт уже активирован');
            if (id !== findUser.id) throw ApiError.BadRequest('Неверная ссылка для активации');

            const updateField = await update.updateUser<ReturnedDBUserValue>({
                field: '"isActive"',
                fieldValue: true,
                table: 'user_data',
                where: 'id',
                whereValue: findUser.id,
            });
            return updateField.isActive;

        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'ПРоизошла неизвестная ошибка при попытке активировать аккаунт', e);

        }
    }
}

export const activeServices = new ActiveServices();