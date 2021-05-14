const Pool = require("pg").Pool;

const pool = (database_name) => {
  return new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: database_name,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });
};

module.exports = {
  pool,
};
