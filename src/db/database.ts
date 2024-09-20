import Pool from 'pg-pool';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_TEST_NAME,
  host: process.env.DB_TEST_HOST,
  database: process.env.DB_TEST_BASE,
  password: process.env.DB_TEST_PASSWORD,
  port: process.env.DB_TEST_PORT as any,
})
