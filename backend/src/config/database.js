// PostgreSQL Database Connection

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'tamtam_user',
  password: process.env.DB_PASSWORD || 'tamtam_secure_pass',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'tamtam_db'
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
