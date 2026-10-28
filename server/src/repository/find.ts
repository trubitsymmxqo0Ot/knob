import { Database } from "../config/database.type"
import { pool } from "../config/pool"

class Find {
    async hasUser(uniqueKey: string, database: Database): Promise<boolean>  {
        try {
            const user = await pool.query(`SELECT 1 FROM ${database} WHERE email = $1`, [uniqueKey])
            return !!user.rows[0];
        } catch(e) {
            if(e instanceof Error) {
                throw new Error('Cannot find user', {cause: e})
            }
            throw e;
        }
    }
}

export const find = new Find();