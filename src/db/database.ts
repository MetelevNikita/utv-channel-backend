import Pool from 'pg-pool';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'channel',
  password: 'root',
  port: 5432,
})
