const mysql = require("mysql2/promise");
const { logger } = require("./winston");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "juy4556!@",
  database: "filmme",
  multipleStatements: true,
});

module.exports = {
  pool: pool,
};
