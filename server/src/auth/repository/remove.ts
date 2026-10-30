import { Database } from "../../config/database.type";
import { pool } from "../../config/pool";
import { ApiError } from "../exceptions/api-error";
import { find } from "./find";

class Remove {
    async removeData(id: string, uniqueKey: string, table: Database) {
        try {

            const hasData = await find.hasData(id, uniqueKey, table);

            if (!hasData) throw ApiError.UnauthorizedError();

            const deleted = await pool.query(`DELETE FROM ${table} WHERE ${uniqueKey} = $1`, [id]);
            return (deleted.rowCount || 0) > 0;

        } catch (e) {
            
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке удалить данные', e);

        }
    }

}

export const remove = new Remove();