const { Pool } = require('pg');

const pool = new Pool({
  user: 'nba_admin',
  host: 'localhost',
  database: 'sports_api',
  password: 'password',
  port: 5432,
});
