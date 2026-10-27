import { Pool } from "pg";
import { Env } from "./env.config";

export const pool = new Pool({
    host: 'db',
    port: Number(Env.POSTGRES_PORT) || 7000,
    user: Env.POSTGRES_USER,
    password: Env.POSTGRES_PASSWORD,
    database: Env.POSTGRES_DB
})

pool.on('error', (err) => {
    console.error('Udexpected error on idle client', err);
    process.exit(-1);
})