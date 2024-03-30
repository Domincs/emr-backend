import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'emr',
  password: 'dominicd',
  port: 5432, // Default PostgreSQL port
});

export default pool;