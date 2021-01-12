const { Pool } = require("pg");
const config = require('config');

const pool = new Pool({
  user: config.get('postgres.user'),
  host: config.get('postgres.host'),
  database: config.get('postgres.database'),
  password: config.get('postgres.password'),
  port: config.get('postgres.port'),
});

module.exports = pool;