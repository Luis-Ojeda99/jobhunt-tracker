const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  database: 'jobhunt_tracker',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432
});

// connetion test
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Database connection error:', err);
  } else {
    console.log('Database connected');
  }
});

module.exports = pool;