import Pool from 'pg-pool';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_BASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
})


