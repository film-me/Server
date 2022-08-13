const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const poseDao = require("./poseDao");

exports.initViews = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  await poseDao.initViews(connection);
  connection.release();
};

exports.getUserFromPose = async function (poseId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userId = await poseDao.selectUserFromPose(connection, poseId);
  connection.release();
  return userId[0];
};

exports.getLike = async function (poseId, userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const like = await poseDao.selectLike(connection, poseId, userId);
  connection.release();
  return like[0];
};

exports.getPoses = async function (filter) {
  const connection = await pool.getConnection(async (conn) => conn);
  let order = "createdAt DESC";
  if (filter == 1) {
    order = "createdAt DESC";
  } else if (filter == 2) {
    order = "likeCnt DESC, createdAt DESC";
  }

  const getPosesResult = await poseDao.getPoses(connection, order);
  connection.release();

  return getPosesResult;
};

exports.getRecommendPoses = async function (poseList) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getPosesResult = await poseDao.getRecommendPoses(connection, poseList);
  connection.release();

  return getPosesResult;
};

exports.getOnePose = async function (userIdx, poseIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getOnePoseResult = await poseDao.getOnePose(
    connection,
    userIdx,
    poseIdx
  );
  connection.release();

  return getOnePoseResult;
};

exports.getLikeInfo = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await poseDao.getLikeInfo(connection);
  connection.release();

  return result;
};

exports.getStoryImageURL = async function (storyIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getImageURLResult = await poseDao.getStoryImageURL(
    connection,
    storyIdx
  );
  connection.release();

  if (getImageURLResult.length == 0) {
    return 0;
  }
  return getImageURLResult[0].imageURL;
};
