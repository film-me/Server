const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.idCheck = async function (identification) {
  const connection = await pool.getConnection(async (conn) => conn);
  const idCheckResult = await userDao.selectUserId(connection, identification);
  connection.release();

  return idCheckResult;
};

exports.accountCheck = async function (identification) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, identification);
  connection.release();

  return userAccountResult;
};

exports.retrieveUserHashedPassword = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userSecurityResult = await userDao.selectUserHashedPassword(connection, userIdx);
  connection.release();

  return userSecurityResult[0];

};
