import { ApiError } from "../../auth/exceptions/api-error";
import { pool } from "../../config/pool";

class MetaServices {
    async clearDb() {
        try {
            const deletedTokensData = await pool.query(`DELETE FROM tokens`);
            const deletedUsersData = await pool.query(`DELETE FROM user_data`);
            return (deletedTokensData.rowCount || 0) > 0 || (deletedUsersData.rowCount || 0) > 0;
        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке удалить данные из бд', e);
        }
    }
}

export const metaServices = new MetaServices();