const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const poseProvider = require("./poseProvider");
const poseDao = require("./poseDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

exports.deletePose = async function (poseId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const pose = await poseDao.deletePose(connection, poseId);
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - deletePose Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.likePose = async function (poseId, userId) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    let status = "ACTIVATE";
    const getLike = await poseProvider.getLike(poseId, userId);
    if (getLike === undefined) {
      const like = await poseDao.likePose(connection, poseId, userId);
      connection.release();
      return response(baseResponse.SUCCESS);
    } else if (getLike.status === "ACTIVATE") {
      status = "DELETED";
      updateLike = await poseDao.updateLikeStatus(
        connection,
        poseId,
        userId,
        status
      );
    } else if (getLike.status === "DELETED") {
      status = "ACTIVATE";
      updateLike = await poseDao.updateLikeStatus(
        connection,
        poseId,
        userId,
        status
      );
    }
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - likePose Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.insertPose = async function (memberIdx, imageURL) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertPoseResult = await poseDao.insertPose(
      connection,
      memberIdx,
      imageURL
    );

    // 레벨 업
    const checkPoseCountResult = await poseDao.checkPoseCount(
      connection,
      memberIdx
    );
    if (checkPoseCountResult[0].poseCount % 9 == 0) {
      const level = parseInt(checkPoseCountResult[0].poseCount / 9) + 1;
      await poseDao.levelUp(connection, memberIdx, level);
    }

    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - insertPose Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
