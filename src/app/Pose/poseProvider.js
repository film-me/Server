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

exports.getPoses = async function (filter) {
  const connection = await pool.getConnection(async (conn)=> conn);
  let order = 'createdAt';
  if(filter == 1) {
    order = 'createdAt';
  }
  else if(filter == 2) {
    order = 'likeCnt DESC';
  }

  const getPosesResult = await poseDao.getPoses(connection, order);
  connection.release();

  return getPosesResult;
}

exports.getOnePose = async function (poseIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getOnePoseResult = await poseDao.getOnePose(connection, poseIdx);
  connection.release();

  return getOnePoseResult;
};

exports.getLikeInfo = async function() {
  const connection = await pool.getConnection(async(conn) => conn);
  const result = await poseDao.getLikeInfo(connection);
  connection.release();

  return result;
}