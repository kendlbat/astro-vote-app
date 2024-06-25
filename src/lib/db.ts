import pg from "pg";

export const prerender = false;

const db = new pg.Client({
    host: import.meta.env.POSTGRES_HOST,
    user: import.meta.env.POSTGRES_USER,
    password: import.meta.env.POSTGRES_PASSWORD,
    database: import.meta.env.POSTGRES_DB,
    port: parseInt(import.meta.env.POSTGRES_PORT),
});

await db.connect();

export { db };
