/*
const { Pool } = require("pg");
const config = require('config');


const pool = new Pool({
  user: config.get('postgres.user'),
  host: config.get('postgres.host'),
  database: config.get('postgres.database'),
  password: config.get('postgres.password'),
  port: config.get('postgres.port'),
  ssl: true,
});

module.exports = pool;
*/

const config = require('config');

const { Client } = require('pg');
const pool = new Client({
  connectionString: process.env.DATABASE_URL||'postgres://ndptrmxuanndde:e31f08ecb325122973bf9ece13e08a8e8c36e13a70af842de526f952f1c2c6ae@ec2-52-205-61-60.compute-1.amazonaws.com:5432/d6us84sgfcucvs'
  ,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.connect();
module.exports = pool;