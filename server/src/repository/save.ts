import { QueryResult } from "pg";
import { Database } from "../config/database.type";
import { pool } from "../config/pool";
import { DBUserResponse, RequestUserBody } from "../dto/types/user-types";

class Save {
    async saveOneUser(data: RequestUserBody, database: Database): Promise<DBUserResponse> {
        const { email, name, password } = data;
        try {
            const saveUser: QueryResult<DBUserResponse> = await pool.query(`
                INSERT INTO ${database} (email, name, password)
                VALUES ($1, $2, $3)
                RETURNING *
                `, 
            [email, name, password]
            )

            if (!saveUser.rows[0]) {
                throw new Error('Failed to save user');
            }

            return saveUser.rows[0];
        } catch (e) {
            throw new Error('Cant save a user')
        }
    }
}

export const save = new Save();