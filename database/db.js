const mysql = require("mysql2/promise");

const pool = (database_name) => {
  return mysql.createPool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: database_name,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    waitForConnections: true,
    connectionLimit: 10,
  });
};

module.exports = {
  pool,
};
