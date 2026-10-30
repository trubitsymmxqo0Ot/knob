import { Database } from "../../config/database.type"
import { pool } from "../../config/pool"
import { ApiError } from "../exceptions/api-error";

class Find {
    async hasData(uniqueKey: string, key: string, table: Database): Promise<boolean> {
        try {

            const data = await pool.query(`SELECT 1 FROM ${table} WHERE ${key} = $1`, [uniqueKey])
            return !!data.rows[0];

        } catch (e) {
            
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e)
            }
            throw ApiError.UnknownError(500, 'Не удалось проверить данные', e)

        }
    };

    async findOneData<T>(uniqueKey: string, key: string, database: Database): Promise<T> {
        try {
            const data = await pool.query(`SELECT * FROM ${database} WHERE ${key} = $1`, [uniqueKey]);

            if (!data.rows[0]) throw ApiError.UnauthorizedError();

            return data.rows[0];
        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Не удалось найти данные', e);
        }
    }
}

export const find = new Find();