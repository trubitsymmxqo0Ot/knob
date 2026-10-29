import { Database } from "../../config/database.type";
import { pool } from "../../config/pool";
import { find } from "./find";

class Remove {
    async removeData(id: string, uniqueKey: string, table: Database) {
        try {
            const hasData = await find.hasData(id, uniqueKey, table);
            if(!hasData) throw new Error('Data is not defined');
            const deleted = await pool.query(`DELETE FROM ${table} WHERE ${uniqueKey} = $1`, [id]);
            return (deleted.rowCount || 0) > 0; 
        } catch(e) {
            console.error(e);
            if(e instanceof Error) {
                throw new Error('An error occured while attempting to retrieve a token')
            }
            throw e;
        }
    }

}

export const remove = new Remove();