const mysql = require("mysql2/promise");
const { logger } = require("./winston");

const pool = mysql.createPool({
  host: "filmmedb.crbggdzhqwd2.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  port: "3306",
  password: "filme123",
  database: "FilmmeDB",
});

module.exports = {
  pool: pool,
};
