import { pool } from "../../config/pool";
import { Database } from "../../config/database.type";
import { ApiError } from "../exceptions/api-error";

interface updateUserArgs {
    table: Database,
    field: string;
    fieldValue: string | boolean | number;
    where: string;
    whereValue: string;
}

class Update {
    async updateUser<T>({ field, fieldValue, table, where, whereValue }: updateUserArgs): Promise<T> {
        try {

            const updateUser = await pool.query(`
                UPDATE ${table}
                SET ${field} = $1
                WHERE ${where} = $2
                RETURNING *;
                `,
                [fieldValue, whereValue]
            );

            if (!updateUser.rows[0]) throw ApiError.UnauthorizedError();

            return updateUser.rows[0];

        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке обновить данные', e);

        }
    }
}

export const update = new Update();