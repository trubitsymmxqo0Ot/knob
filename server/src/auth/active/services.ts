import { find } from "../repository/find";
import { update } from "../repository/update";
import { tokenService } from "../token/service";
import { ReturnedDBUserValue } from "../types/types";


class ActiveServices {
    async active(id: string | string[], token: string) {
        try {
            const decoding = tokenService.decodingRefreshToken(token);
            const findUser = await find.findOneData<ReturnedDBUserValue>(decoding?.id || '', 'id', 'user_data');
            if(findUser.isActive) throw new Error('User account already activated');
            console.log(id, findUser.id);
            if (id !== findUser.id) throw new Error('Link and password does not match');
            const updateField = await update.updateUser<ReturnedDBUserValue>({
                field: '"isActive"',
                fieldValue: true,
                table: 'user_data',
                where: 'id',
                whereValue: findUser.id,
            });
            return updateField.isActive;
        } catch (e) {
            if (e instanceof Error) {
                throw new Error('An unknown error occurred while activating the user', { cause: e });
            }
            throw e;
        }
    }
}

export const activeServices = new ActiveServices();