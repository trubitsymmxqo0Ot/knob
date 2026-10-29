import { find } from "../repository/find";
import { remove } from "../repository/remove";
import { ReturnedDBTokensValue, ReturnedDBUserValue } from "../types/types";

class DeleteServices {
    async delete(token: string) {
        try {
            const data = await find.findOneData<ReturnedDBTokensValue>(token, '"refreshToken"', "tokens");
            const deletedTokens = await remove.removeData(data.userId, '"userId"', 'tokens');
            const deletedUser = await remove.removeData(data.userId, 'id', 'user_data');
            return deletedUser && deletedTokens;            
        } catch(e) {
            if(e instanceof Error) {
                throw new Error('Cannot find data', {cause: e})
            }
        }
    }
}

export const deleteServices = new DeleteServices();