const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  database: 'jobhunt_tracker',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  port: 5432
});

module.exports = pool;