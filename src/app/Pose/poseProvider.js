const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const poseDao = require("./poseDao");

exports.getUserFromPose = async function (poseId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userId = await poseDao.selectUserFromPose(connection, poseId);
  connection.release();

  return userId;
};

exports.getLike = async function (poseId, userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const like = await poseDao.selectLike(connection, poseId, userId);
  connection.release();
  return like[0];
};
