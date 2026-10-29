import { QueryResult } from "pg";
import { Database } from "../../config/database.type";
import { pool } from "../../config/pool";
import { DBUserResponse } from "./types/type";
import { DBTokenResponse, RequestUserBody } from "../types/types";

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
            if (e instanceof Error) {
                throw new Error('Cant save user', { cause: e })
            }
            throw e;
        }
    }
    async saveToken(userId: string, refreshToken: string): Promise<DBTokenResponse> {
        try {
            const saveToken: QueryResult<DBTokenResponse> = await pool.query(`
            INSERT INTO tokens ("userId", "refreshToken")
            VALUES ($1, $2)
            RETURNING *
            `,
                [userId, refreshToken]
            );

            if (!saveToken.rows[0]) {
                throw new Error('Failed to save token');
            }

            return saveToken.rows[0];
        } catch (e) {
            if (e instanceof Error) {
                throw new Error('Cant save token', { cause: e })
            }
            throw e;
        }
    }
}

export const save = new Save();