import Pool from 'pg-pool';
import dotenv from 'dotenv';

dotenv.config();


export const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_BASE,
  password: '123456Zz',
  port: process.env.DB_PORT as any,
})
