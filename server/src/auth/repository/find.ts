import { Database } from "../../config/database.type"
import { pool } from "../../config/pool"

class Find {
    async hasData(uniqueKey: string, key: string, table: Database): Promise<boolean> {
        try {
            const user = await pool.query(`SELECT 1 FROM ${table} WHERE ${key} = $1`, [uniqueKey])
            return !!user.rows[0];
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                throw new Error('Data is not has', { cause: e })
            }
            throw e;
        }
    };

    async findOneData<T>(uniqueKey: string, key: string, database: Database): Promise<T> {
        try {
            const data = await pool.query(`SELECT * FROM ${database} WHERE ${key} = $1`, [uniqueKey]);
            if(!data.rows[0]) throw new Error(`Data from ${database} does not exist`);
            return data.rows[0];
        } catch(e) {
            if(e instanceof Error) {
                throw new Error('Cannot find data', {cause: e})
            }
            throw e;
        }
    }
}

export const find = new Find();