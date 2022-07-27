const baseResponseStatus = require("../../../config/baseResponseStatus");
const { pool } = require("../../../config/database");
const { errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const storyDao = require("./storyDao");

exports.getStory = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getStoryResult = await storyDao.selectStory(connection, userId);
  connection.release();

  return getStoryResult[0];
};

exports.getFrame = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const getFrameResult = await storyDao.selectFrame(connection);
  connection.release();

  return getFrameResult[0];
};
