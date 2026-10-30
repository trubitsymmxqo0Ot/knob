import { pool } from "../../config/pool";
import { Database } from "../../config/database.type";

interface updateUserArgs {
    table: Database,
    field: string;
    fieldValue: string | boolean | number;
    where: string;
    whereValue: string;
}

class Update {
    async updateUser<T>({field, fieldValue, table, where, whereValue}: updateUserArgs): Promise<T> {
        try {
            const updateUser = await pool.query(`
                UPDATE ${table}
                SET ${field} = $1
                WHERE ${where} = $2
                RETURNING *;
                `,
            [fieldValue, whereValue]
            );
            if(!updateUser.rows[0]) throw new Error('Cannot find user');
            return updateUser.rows[0];
        } catch(e) {
            if(e instanceof Error) {
                throw new Error('An unknown error occured while updating the data')
            }
            throw e;
        }
    }
}

export const update = new Update();