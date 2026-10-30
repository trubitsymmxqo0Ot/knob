import { QueryResult } from "pg";
import { Database } from "../../config/database.type";
import { pool } from "../../config/pool";
import { DBUserResponse } from "./types/type";
import { DBTokenResponse, RequestUserBody } from "../types/types";
import { ApiError } from "../exceptions/api-error";

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

            if (!saveUser.rows[0]) throw ApiError.BadRequest('Неудалось сохранить пользователя');

            return saveUser.rows[0];

        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке сохранить данные', e);

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

            if (!saveToken.rows[0]) throw ApiError.BadRequest('Ошибка при попытке сохранить токен доступа');

            return saveToken.rows[0];
        } catch (e) {
            if (e instanceof ApiError) {
                throw e;
            }
            if (e instanceof Error) {
                throw ApiError.BadRequest(e.message, e);
            }
            throw ApiError.UnknownError(500, 'Произошла неизвестная ошибка при попытке сохранить токен доступа', e);
        }
    }
}

export const save = new Save();